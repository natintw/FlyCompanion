import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plane, 
  User, 
  Calendar, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft, 
  ClipboardCheck, 
  MapPin,
  ArrowRight,
  Settings
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { cn } from '../lib/utils';
import { useAuth } from '../context/AuthContext';
import { dbService } from '../services/db';

import { where } from 'firebase/firestore';
import { CaretakingProfile } from '../types';

type Step = 'caretaker' | 'flight' | 'requirements' | 'budget' | 'confirm';

export function CreateTrip() {
  const { t } = useTranslation();
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<Step>('caretaker');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const STEPS: { id: Step; label: string }[] = [
    { id: 'caretaker', label: t('trips.createTitle') },
    { id: 'flight', label: t('trips.date') },
    { id: 'requirements', label: t('trips.requirements') },
    { id: 'budget', label: t('trips.budget') },
    { id: 'confirm', label: t('common.confirm') },
  ];
  
  useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

  const [formData, setFormData] = useState({
    caretakingProfileId: '',
    caretakerName: '',
    origin: '',
    destination: '',
    date: '',
    dateEnd: '',
    isRange: false,
    flightNum: '',
    requirements: {
      sideBySide: false,
      assistMeal: false,
      assistToilet: false,
      assistImmigration: false,
      handoffAtDestination: false,
    },
    budgetOption: 'range' as 'range' | 'open',
    budgetMin: 5000,
    budgetMax: 10000,
    memo: '',
  });

  const [caretakers, setCaretakers] = useState<CaretakingProfile[]>([]);
  const [isCaretakerModalOpen, setIsCaretakerModalOpen] = useState(false);
  const [editingCaretaker, setEditingCaretaker] = useState<CaretakingProfile | null>(null);
  const [caretakerForm, setCaretakerForm] = useState({
    fullName: '',
    relationship: '',
    birthDate: '',
  });

  useEffect(() => {
    if (!user) return;
    const unsubscribe = dbService.subscribeToCollection<CaretakingProfile>(
      'caretakers',
      [where('requesterId', '==', user.uid)],
      (data) => setCaretakers(data)
    );
    return () => unsubscribe();
  }, [user]);

  const handleCaretakerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    const caretakerData = {
      ...caretakerForm,
      requesterId: user.uid,
      emergencyContact: { name: '', phone: '' }, // Simplified for now
    };

    try {
      if (editingCaretaker) {
        await dbService.updateDocument('caretakers', editingCaretaker.id, caretakerData);
      } else {
        await dbService.createDocument('caretakers', caretakerData);
      }
      setIsCaretakerModalOpen(false);
      setEditingCaretaker(null);
      setCaretakerForm({ fullName: '', relationship: '', birthDate: '' });
    } catch (error) {
      console.error('Failed to save caretaker:', error);
    }
  };

  const openEditCaretaker = (e: React.MouseEvent, c: CaretakingProfile) => {
    e.stopPropagation();
    setEditingCaretaker(c);
    setCaretakerForm({
      fullName: c.fullName,
      relationship: c.relationship,
      birthDate: c.birthDate,
    });
    setIsCaretakerModalOpen(true);
  };

  const handlePublish = async () => {
    if (!user) return;
    if (!formData.caretakingProfileId) {
      alert('請先選擇陪伴對象');
      return;
    }
    setIsSubmitting(true);
    try {
      let instructions = formData.memo;
      if (profile?.kycStatus !== 'verified') {
        const warning = "⚠️ [系統提示] 此發布者尚未完成實名驗證 (KYC)，請自行評估交易安全性。";
        instructions = instructions ? `${warning}\n\n${instructions}` : warning;
      }

      const tripData = {
        requesterId: user.uid,
        caretakingProfileId: formData.caretakingProfileId,
        originAirport: formData.origin.toUpperCase(),
        destinationAirport: formData.destination.toUpperCase(),
        flightDate: formData.date,
        flightDateEnd: formData.isRange ? formData.dateEnd : null,
        isDateRange: formData.isRange,
        flightNumber: formData.flightNum.toUpperCase(),
        careRequirements: formData.requirements,
        budgetMin: formData.budgetMin,
        budgetMax: formData.budgetMax,
        budgetOption: formData.budgetOption,
        specialInstructions: instructions,
        status: 'open',
      };
      const tripId = await dbService.createDocument('trips', tripData);
      if (tripId) {
        alert(t('common.saveSuccess') || '發布成功！');
        navigate('/find-trips');
      }
    } catch (error) {
      const err = error as Error;
      console.error('Failed to publish trip:', err);
      alert('發布失敗: ' + (err.message || '未知錯誤'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const stepIndex = STEPS.findIndex(s => s.id === currentStep);

  const next = () => {
    const nextIdx = stepIndex + 1;
    if (nextIdx < STEPS.length) setCurrentStep(STEPS[nextIdx].id);
  };

  const prev = () => {
    const prevIdx = stepIndex - 1;
    if (prevIdx >= 0) setCurrentStep(STEPS[prevIdx].id);
  };

  return (
    <div className="min-h-screen pb-20">
      <div className="container mx-auto px-4 max-w-4xl py-12 md:py-20">
        {/* Progress Stepper */}
        <div className="mb-12">
          <div className="flex items-center justify-between">
            {STEPS.map((step, i) => (
              <div key={step.id} className="flex-1 relative">
                <div className="flex flex-col items-center">
                  <div 
                    className={cn(
                      "z-10 h-10 w-10 md:h-12 md:w-12 rounded-2xl flex items-center justify-center text-xs font-bold transition-all duration-300 shadow-sm",
                      i <= stepIndex ? "bg-primary text-white scale-110 shadow-teal-200" : "glass text-slate-400"
                    )}
                  >
                    {i < stepIndex ? <CheckCircle2 className="h-5 w-5" /> : i + 1}
                  </div>
                  <span className={cn(
                    "mt-3 text-[10px] font-bold uppercase tracking-widest",
                    i <= stepIndex ? "text-teal-700" : "text-slate-400"
                  )}>
                    {step.label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={cn(
                    "absolute top-5 md:top-6 left-1/2 w-full h-[2px] -z-0",
                    i < stepIndex ? "bg-primary shadow-teal-200 shadow-sm" : "bg-white/30"
                  )} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Container */}
        <div className="glass rounded-[3rem] shadow-2xl overflow-hidden backdrop-blur-3xl border border-white/40">
          <div className="p-8 lg:p-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
               <Plane className="h-64 w-64" />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="relative z-10"
              >
                {currentStep === 'caretaker' && (
                  <div className="space-y-10">
                    <div className="space-y-4">
                      <h2 className="text-2xl font-serif text-slate-900 font-light italic">{t('trips.create.who')}</h2>
                      <p className="text-slate-500 text-sm font-medium">{t('trips.create.whoDesc')}</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {caretakers.map(c => (
                        <div 
                          key={c.id}
                          onClick={() => setFormData({...formData, caretakingProfileId: c.id, caretakerName: c.fullName})}
                          className={cn(
                            "relative p-8 rounded-[2rem] glass border transition-all cursor-pointer group",
                            formData.caretakingProfileId === c.id ? "border-primary bg-primary/5 shadow-lg" : "border-white/50 hover:bg-white/60"
                          )}
                        >
                          <div className={cn(
                            "h-14 w-14 rounded-2xl flex items-center justify-center mb-6 transition-colors shadow-sm",
                            formData.caretakingProfileId === c.id ? "bg-primary text-white" : "glass group-hover:bg-primary group-hover:text-white"
                          )}>
                            <User className="h-7 w-7" />
                          </div>
                          <div className="font-bold text-slate-800 text-xl tracking-tight">{c.fullName}</div>
                          <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1">
                            {c.relationship} · {c.birthDate}
                          </div>
                          
                          <button 
                            onClick={(e) => openEditCaretaker(e, c)}
                            className="absolute top-6 right-6 p-2 text-slate-300 hover:text-slate-600 transition-colors"
                          >
                            <Settings className="h-4 w-4" />
                          </button>

                          {formData.caretakingProfileId === c.id && (
                            <div className="absolute -top-2 -right-2 bg-primary text-white p-1 rounded-full shadow-lg">
                              <CheckCircle2 className="h-4 w-4" />
                            </div>
                          )}
                        </div>
                      ))}
                      
                      <button 
                        onClick={() => {
                          setEditingCaretaker(null);
                          setCaretakerForm({ fullName: '', relationship: '', birthDate: '' });
                          setIsCaretakerModalOpen(true);
                        }}
                        className="flex flex-col items-center justify-center p-8 rounded-[2rem] border-2 border-dashed border-white/40 glass hover:border-primary/50 hover:bg-primary/5 transition-all text-slate-400 hover:text-primary min-h-[160px]"
                      >
                        <div className="h-12 w-12 rounded-full glass flex items-center justify-center mb-3">
                          <span className="text-3xl font-light">+</span>
                        </div>
                        <span className="text-sm font-bold tracking-tight">{t('trips.create.addNew')}</span>
                      </button>
                    </div>
                  </div>
                )}

                {currentStep === 'flight' && (
                  <div className="space-y-10">
                    <div className="space-y-4">
                      <h2 className="text-2xl font-serif text-slate-900 font-light italic">{t('trips.date')}</h2>
                      <p className="text-slate-500 text-sm font-medium">{t('trips.create.flightDesc')}</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <div className="space-y-3">
                        <label className="text-xs font-bold uppercase tracking-widest text-slate-400 px-1">{t('trips.origin')} (IATA)</label>
                        <input 
                          type="text" 
                          placeholder={`${t('trips.placeholderAirport')}`} 
                          value={formData.origin}
                          onChange={e => setFormData({...formData, origin: e.target.value})}
                          maxLength={3}
                          className="w-full p-4 glass border border-white/40 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none font-medium text-center uppercase"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-xs font-bold uppercase tracking-widest text-slate-400 px-1">{t('trips.destination')} (IATA)</label>
                        <input 
                          type="text" 
                          placeholder={`${t('trips.placeholderAirport')}`} 
                          value={formData.destination}
                          onChange={e => setFormData({...formData, destination: e.target.value})}
                          maxLength={3}
                          className="w-full p-4 glass border border-white/40 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none font-medium text-center uppercase"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-xs font-bold uppercase tracking-widest text-slate-400 px-1">{t('trips.date')} ({t('trips.dateRange')})</label>
                        <div className="flex items-center gap-4 mb-2 ml-1">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input 
                              type="radio" 
                              checked={!formData.isRange} 
                              onChange={() => setFormData({...formData, isRange: false})}
                              className="text-primary focus:ring-primary"
                            />
                            <span className="text-xs font-bold text-slate-600">{t('trips.fixedDate')}</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input 
                              type="radio" 
                              checked={formData.isRange} 
                              onChange={() => setFormData({...formData, isRange: true})}
                              className="text-primary focus:ring-primary"
                            />
                            <span className="text-xs font-bold text-slate-600">{t('trips.dateRange')}</span>
                          </label>
                        </div>
                        <div className="flex gap-2">
                           <div className="relative flex-1">
                            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                            <input 
                              type="date" 
                              value={formData.date}
                              onChange={e => setFormData({...formData, date: e.target.value})}
                              className="w-full pl-12 pr-4 py-4 glass border border-white/40 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none font-medium text-sm"
                            />
                          </div>
                          {formData.isRange && (
                            <>
                              <span className="flex items-center text-slate-400">—</span>
                              <div className="relative flex-1">
                                <input 
                                  type="date" 
                                  value={formData.dateEnd}
                                  onChange={e => setFormData({...formData, dateEnd: e.target.value})}
                                  className="w-full pl-6 pr-4 py-4 glass border border-white/40 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none font-medium text-sm"
                                />
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="space-y-3">
                        <label className="text-xs font-bold uppercase tracking-widest text-slate-400 px-1">{t('trips.flightNum')}</label>
                        <input 
                          type="text" 
                          placeholder="e.g. CI008" 
                          value={formData.flightNum}
                          onChange={e => setFormData({...formData, flightNum: e.target.value})}
                          className="w-full p-4 glass border border-white/40 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none font-medium"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 'requirements' && (
                  <div className="space-y-10">
                    <div className="space-y-4">
                      <h2 className="text-2xl font-serif text-slate-900 font-light italic">{t('trips.requirements')}</h2>
                      <p className="text-slate-500 text-sm font-medium">{t('trips.create.reqDesc')}</p>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-6">
                      {[
                        { id: 'sideBySide', label: t('trips.labels.sideBySide'), icon: <Plane className="h-5 w-5" /> },
                        { id: 'assistMeal', label: t('trips.labels.assistMeal'), icon: <ClipboardCheck className="h-5 w-5" /> },
                        { id: 'assistToilet', label: t('trips.labels.assistToilet'), icon: <ChevronRight className="h-5 w-5" /> },
                        { id: 'assistImmigration', label: t('trips.labels.assistImmigration'), icon: <MapPin className="h-5 w-5" /> },
                        { id: 'handoffAtDestination', label: t('trips.labels.handoff'), icon: <ArrowRight className="h-5 w-5" /> },
                      ].map((item) => (
                        <label 
                          key={item.id} 
                          className="flex items-center justify-between p-5 rounded-2xl glass border border-white/20 hover:bg-white/60 transition-all cursor-pointer group"
                        >
                          <div className="flex items-center gap-5">
                            <div className="h-12 w-12 rounded-xl glass flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white shadow-sm border border-white/40 transition-colors">
                              {item.icon}
                            </div>
                            <span className="font-bold text-slate-700 tracking-tight">{item.label}</span>
                          </div>
                          <input 
                            type="checkbox" 
                            checked={formData.requirements[item.id as keyof typeof formData.requirements]}
                            onChange={e => setFormData({
                              ...formData, 
                              requirements: {
                                ...formData.requirements,
                                [item.id]: e.target.checked
                              }
                            })}
                            className="h-6 w-6 rounded-lg border-slate-300 text-primary focus:ring-primary bg-white/40" 
                          />
                        </label>
                      ))}

                      <div className="space-y-4 pt-6">
                        <div className="flex items-center gap-2 px-1">
                          <Settings className="h-4 w-4 text-slate-400" />
                          <label className="text-xs font-bold uppercase tracking-widest text-slate-400">{t('trips.create.memo')}</label>
                        </div>
                        <textarea 
                          placeholder={t('trips.create.memoPlaceholder')}
                          value={formData.memo}
                          onChange={e => setFormData({...formData, memo: e.target.value})}
                          className="w-full p-5 glass border border-white/40 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none font-medium h-32 resize-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 'budget' && (
                  <div className="space-y-10">
                    <div className="space-y-4">
                      <h2 className="text-2xl font-serif text-slate-900 font-light italic">{t('trips.budget')}</h2>
                      <p className="text-slate-500 text-sm font-medium">{t('trips.create.budgetDesc')}</p>
                    </div>
                    
                    <div className="space-y-8">
                       <div className="flex gap-2 p-1.5 glass-dark rounded-2xl max-w-sm">
                        <button 
                          onClick={() => setFormData({...formData, budgetOption: 'range'})}
                          className={cn(
                            "flex-1 py-2.5 text-[10px] font-bold rounded-xl transition-all uppercase tracking-widest",
                            formData.budgetOption === 'range' ? "bg-white text-teal-800 shadow-lg" : "text-slate-400 hover:text-slate-300"
                          )}
                        >
                          {t('trips.create.specifyBudget')}
                        </button>
                        <button 
                          onClick={() => setFormData({...formData, budgetOption: 'open'})}
                          className={cn(
                            "flex-1 py-2.5 text-[10px] font-bold rounded-xl transition-all uppercase tracking-widest",
                            formData.budgetOption === 'open' ? "bg-white text-teal-800 shadow-lg" : "text-slate-400 hover:text-slate-300"
                          )}
                        >
                          {t('trips.create.openBudget')}
                        </button>
                      </div>

                      {formData.budgetOption === 'range' && (
                        <div className="flex items-center gap-6">
                           <div className="flex-1 space-y-2">
                             <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Min (TWD)</label>
                             <input 
                              type="number" 
                              value={formData.budgetMin}
                              onChange={e => setFormData({...formData, budgetMin: parseInt(e.target.value)})}
                              className="w-full p-5 glass border border-white/40 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none text-2xl font-black text-slate-800 tracking-tighter" 
                            />
                          </div>
                          <span className="text-slate-300 mt-6">—</span>
                          <div className="flex-1 space-y-2">
                             <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Max (TWD)</label>
                             <input 
                              type="number" 
                              value={formData.budgetMax}
                              onChange={e => setFormData({...formData, budgetMax: parseInt(e.target.value)})}
                              className="w-full p-5 glass border border-white/40 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none text-2xl font-black text-slate-800 tracking-tighter" 
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {currentStep === 'confirm' && (
                  <div className="space-y-10 text-center flex flex-col items-center">
                    <div className="h-24 w-24 rounded-full bg-teal-100 flex items-center justify-center text-primary mb-2 shadow-lg shadow-teal-200">
                      <CheckCircle2 className="h-12 w-12" />
                    </div>
                    <div className="space-y-4">
                      <h2 className="text-3xl font-serif text-slate-900 font-light italic">{t('common.confirm')}</h2>
                      <p className="text-slate-500 max-w-sm mx-auto font-medium leading-relaxed">
                        {t('trips.create.confirmDesc')}
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
            
            {/* Footer Buttons */}
            <div className="mt-20 flex items-center justify-between relative z-10 border-t border-white/20 pt-10">
              <button 
                onClick={prev}
                disabled={stepIndex === 0}
                className={cn(
                  "flex items-center gap-2 px-8 py-3.5 rounded-2xl font-bold transition-all text-sm uppercase tracking-widest",
                  stepIndex === 0 ? "opacity-0 invisible" : "text-slate-400 hover:text-slate-800"
                )}
              >
                <ChevronLeft className="h-5 w-5" />
                {t('common.back')}
              </button>
              
              {currentStep !== 'confirm' ? (
                <button 
                  onClick={next}
                  className="flex items-center gap-2 px-10 py-4 bg-slate-900 text-white rounded-[1.25rem] font-bold hover:shadow-2xl hover:translate-x-1 transition-all text-sm uppercase tracking-widest"
                >
                  {t('common.next')}
                  <ChevronRight className="h-5 w-5" />
                </button>
              ) : (
                <button 
                  onClick={handlePublish}
                  disabled={isSubmitting}
                  className="px-14 py-5 bg-primary text-white rounded-[1.5rem] font-bold hover:shadow-2xl hover:scale-105 transition-all text-base uppercase tracking-widest shadow-teal-200 disabled:opacity-50"
                >
                  {isSubmitting ? t('common.processing') : t('trips.publish')}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Caretaker Modal */}
      <AnimatePresence>
        {isCaretakerModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md"
            onClick={() => {
              setIsCaretakerModalOpen(false);
              setEditingCaretaker(null);
            }}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white/95 backdrop-blur-2xl rounded-[2.5rem] p-10 max-w-md w-full shadow-2xl border border-white/50"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold text-slate-800">
                  {editingCaretaker ? t('trips.create.editCaretaker') : t('trips.create.addNew')}
                </h3>
                <button 
                  onClick={() => {
                    setIsCaretakerModalOpen(false);
                    setEditingCaretaker(null);
                  }} 
                  className="text-slate-400 p-2 hover:text-slate-900 transition-colors"
                >✕</button>
              </div>
              
              <form onSubmit={handleCaretakerSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">{t('trips.create.caretakerName')}</label>
                  <input 
                    type="text" 
                    required 
                    value={caretakerForm.fullName}
                    onChange={e => setCaretakerForm({...caretakerForm, fullName: e.target.value})}
                    className="w-full px-5 py-4 glass border border-white/40 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none font-medium text-sm" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">{t('trips.create.relationship')}</label>
                  <input 
                    type="text" 
                    required 
                    placeholder={t('trips.create.relationshipPlaceholder')}
                    value={caretakerForm.relationship}
                    onChange={e => setCaretakerForm({...caretakerForm, relationship: e.target.value})}
                    className="w-full px-5 py-4 glass border border-white/40 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none font-medium text-sm" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">{t('trips.create.birthDate')}</label>
                  <input 
                    type="date" 
                    required 
                    value={caretakerForm.birthDate}
                    onChange={e => setCaretakerForm({...caretakerForm, birthDate: e.target.value})}
                    className="w-full px-5 py-4 glass border border-white/40 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none font-medium text-sm" 
                  />
                </div>
                
                <button 
                  type="submit"
                  className="w-full py-4.5 bg-slate-900 text-white font-bold rounded-2xl hover:bg-primary transition-all shadow-xl"
                >
                  {t('common.save')}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
