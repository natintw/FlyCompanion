import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Plane, 
  ShieldCheck, 
  Settings, 
  Calendar, 
  User, 
  Star,
  QrCode,
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { cn, formatCurrency, formatDate } from '../lib/utils';
import { useAuth } from '../context/AuthContext';
import { dbService } from '../services/db';
import { where, orderBy } from 'firebase/firestore';
import type { Trip, Match, CaretakingProfile } from '../types';

export function Dashboard() {
  const { t } = useTranslation();
  const { user, profile } = useAuth();
  const [showQR, setShowQR] = useState(false);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past' | 'requests'>('upcoming');
  const [matches, setMatches] = useState<(Match & { trip: Trip })[]>([]);
  const [trips, setTrips] = useState<Trip[]>([]);
  
  // Trip editing state
  const [isEditingTrip, setIsEditingTrip] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [tripFormData, setTripFormData] = useState<Partial<Trip>>({});
  const [caretakers, setCaretakers] = useState<CaretakingProfile[]>([]);

  // Profile editing state
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editName, setEditName] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (profile) {
      setEditName(profile.fullName || '');
      setEditPhone(profile.phone || '');
    }
  }, [profile]);

  const handleUpdateProfile = async (e: import('react').FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setUpdating(true);
    try {
      await dbService.setDocument('users', user.uid, {
        fullName: editName,
        phone: editPhone,
        phoneVerified: true 
      });
      setIsEditingProfile(false);
    } catch (error) {
      console.error('Update profile failed:', error);
    } finally {
      setUpdating(false);
    }
  };

  useEffect(() => {
    if (!user) return;

    const qTrips = [
      where('requesterId', '==', user.uid),
      orderBy('createdAt', 'desc')
    ];
    const unsubscribeTrips = dbService.subscribeToCollection<Trip>('trips', qTrips, (data) => {
      setTrips(data);
    });

    const unsubscribeCaretakers = dbService.subscribeToCollection<CaretakingProfile>(
      'caretakers',
      [where('requesterId', '==', user.uid)],
      (data) => setCaretakers(data)
    );

    const qMatches = [
      where('requesterId', '==', user.uid),
      orderBy('createdAt', 'desc')
    ];
    const unsubscribeMatches = dbService.subscribeToCollection<Match>('matches', qMatches, (data) => {
      setMatches(data as (Match & { trip: Trip })[]);
    });

    return () => {
      unsubscribeTrips();
      unsubscribeCaretakers();
      unsubscribeMatches();
    };
  }, [user]);

  const handleEditTrip = (trip: Trip) => {
    setSelectedTrip(trip);
    setTripFormData({ ...trip });
    setIsEditingTrip(true);
  };

  const handleUpdateTrip = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTrip || !user) return;
    setUpdating(true);
    try {
      await dbService.updateDocument('trips', selectedTrip.id, {
        ...tripFormData,
        originAirport: tripFormData.originAirport?.toUpperCase(),
        destinationAirport: tripFormData.destinationAirport?.toUpperCase(),
      });
      setIsEditingTrip(false);
    } catch (error) {
      console.error('Update trip failed:', error);
    } finally {
      setUpdating(false);
    }
  };

  const handleDeleteTrip = async (id: string) => {
    if (!confirm(t('common.confirmDelete'))) return;
    try {
      await dbService.deleteDocument('trips', id);
    } catch (error) {
      console.error('Delete trip failed:', error);
    }
  };

  const upcomingMatches = matches.filter(m => ['pending', 'confirmed', 'in-progress'].includes(m.status));

  const handleTabChange = (tab: 'upcoming' | 'past' | 'requests') => {
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen">
      {/* Dashboard Top Area */}
      <div className="glass-nav">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-5">
                <div className="h-16 w-16 rounded-2xl glass flex items-center justify-center overflow-hidden">
                  <User className="h-8 w-8 text-slate-400" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{profile?.fullName}</h1>
                  <div className="flex items-center gap-3 mt-1">
                    <div className="flex items-center gap-1 text-[10px] font-bold text-teal-700 bg-teal-100/50 px-2 py-0.5 rounded uppercase tracking-wider">
                      <ShieldCheck className="h-3 w-3" />
                      {profile?.kycStatus === 'verified' ? t('common.verified') : t('common.unverified')}
                    </div>
                    <div className="flex items-center gap-1 text-[10px] font-bold text-orange-700 bg-orange-100/50 px-2 py-0.5 rounded uppercase tracking-wider">
                      <Star className="h-3 w-3 fill-orange-500 text-orange-500" />
                      {profile?.ratingAvg || 0} ({profile?.ratingCount || 0})
                    </div>
                  </div>
                </div>
              </div>
            
            <div className="flex gap-2">
               <button 
                onClick={() => setIsEditingProfile(true)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/40 glass text-sm font-bold text-slate-600 hover:bg-white/60 transition-all"
               >
                  <Settings className="h-4 w-4" />
                  {t('dashboard.settings')}
               </button>
               <Link 
                to="/create-trip"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-bold hover:shadow-lg transition-all shadow-teal-200"
               >
                  <Plane className="h-4 w-4" />
                  {t('dashboard.postTrip')}
               </Link>
            </div>
          </div>
          
          <div className="flex gap-8 mt-10">
            {(['upcoming', 'past', 'requests'] as const).map((tab) => (
              <button 
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={cn(
                  "pb-4 text-sm font-bold transition-all relative",
                  activeTab === tab ? "text-teal-700" : "text-slate-400 hover:text-slate-600"
                )}
              >
                {t(`dashboard.tabs.${tab}`)}
                {activeTab === tab && (
                  <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-[2px] bg-teal-600 rounded-t-full" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Edit Trip Modal */}
      <AnimatePresence>
        {isEditingTrip && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[75] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md"
            onClick={() => setIsEditingTrip(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white/95 backdrop-blur-2xl rounded-[2.5rem] p-10 max-w-2xl w-full shadow-2xl border border-white/50 max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold text-slate-800">{t('dashboard.editTrip')}</h3>
                <button onClick={() => setIsEditingTrip(false)} className="text-slate-400 p-2 hover:text-slate-900 transition-colors">✕</button>
              </div>
              
              <form onSubmit={handleUpdateTrip} className="space-y-8">
                {/* Caretaker Selector */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">{t('dashboard.labels.careObject')}</label>
                  <select 
                    value={tripFormData.caretakingProfileId}
                    onChange={e => setTripFormData({...tripFormData, caretakingProfileId: e.target.value})}
                    className="w-full px-5 py-4 glass border border-white/40 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none font-medium text-sm"
                  >
                    <option value="">{t('trips.create.whoDesc')}</option>
                    {caretakers.map(c => (
                      <option key={c.id} value={c.id}>{c.fullName} ({c.relationship})</option>
                    ))}
                  </select>
                </div>

                {/* Basic Flight Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">{t('trips.origin')}</label>
                    <input 
                      type="text" 
                      required 
                      value={tripFormData.originAirport}
                      onChange={e => setTripFormData({...tripFormData, originAirport: e.target.value})}
                      className="w-full px-5 py-4 glass border border-white/40 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none font-medium text-sm" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">{t('trips.destination')}</label>
                    <input 
                      type="text" 
                      required 
                      value={tripFormData.destinationAirport}
                      onChange={e => setTripFormData({...tripFormData, destinationAirport: e.target.value})}
                      className="w-full px-5 py-4 glass border border-white/40 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none font-medium text-sm" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">{t('trips.date')}</label>
                    <input 
                      type="date" 
                      required 
                      value={tripFormData.flightDate}
                      onChange={e => setTripFormData({...tripFormData, flightDate: e.target.value})}
                      className="w-full px-5 py-4 glass border border-white/40 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none font-medium text-sm" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">{t('trips.flightNum')}</label>
                    <input 
                      type="text" 
                      value={tripFormData.flightNumber || ''}
                      onChange={e => setTripFormData({...tripFormData, flightNumber: e.target.value})}
                      className="w-full px-5 py-4 glass border border-white/40 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none font-medium text-sm" 
                    />
                  </div>
                </div>

                {/* Requirements */}
                <div className="space-y-4">
                   <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">{t('trips.requirements')}</label>
                   <div className="grid grid-cols-2 gap-3">
                      {[
                        { id: 'sideBySide', label: t('trips.labels.sideBySide') },
                        { id: 'assistMeal', label: t('trips.labels.assistMeal') },
                        { id: 'assistToilet', label: t('trips.labels.assistToilet') },
                        { id: 'assistImmigration', label: t('trips.labels.assistImmigration') },
                        { id: 'handoffAtDestination', label: t('trips.labels.handoff') },
                      ].map((item) => (
                        <label key={item.id} className="flex items-center gap-3 p-3 rounded-xl glass border border-white/20 cursor-pointer">
                          <input 
                            type="checkbox"
                            checked={tripFormData.careRequirements?.[item.id as keyof typeof tripFormData.careRequirements]}
                            onChange={e => setTripFormData({
                              ...tripFormData,
                              careRequirements: {
                                ...tripFormData.careRequirements!,
                                [item.id]: e.target.checked
                              }
                            })}
                            className="h-4 w-4 rounded border-slate-300 text-primary"
                          />
                          <span className="text-[11px] font-bold text-slate-600">{item.label}</span>
                        </label>
                      ))}
                   </div>
                </div>

                {/* Special Instructions */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">{t('trips.create.memo')}</label>
                  <textarea 
                    value={tripFormData.specialInstructions || ''}
                    onChange={e => setTripFormData({...tripFormData, specialInstructions: e.target.value})}
                    className="w-full px-5 py-4 glass border border-white/40 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none font-medium text-sm h-24 resize-none" 
                  />
                </div>
                
                <button 
                  type="submit"
                  disabled={updating}
                  className="w-full py-4.5 bg-slate-900 text-white font-bold rounded-2xl hover:bg-primary transition-all shadow-xl disabled:opacity-50"
                >
                  {updating ? t('common.processing') : t('common.save')}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Profile Modal */}
      <AnimatePresence>
        {isEditingProfile && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md"
            onClick={() => setIsEditingProfile(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white/95 backdrop-blur-2xl rounded-[2.5rem] p-10 max-w-md w-full shadow-2xl border border-white/50"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold text-slate-800">{t('dashboard.profile.title')}</h3>
                <button onClick={() => setIsEditingProfile(false)} className="text-slate-400 p-2 hover:text-slate-900 transition-colors">✕</button>
              </div>
              
              <form onSubmit={handleUpdateProfile} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">{t('auth.name')}</label>
                  <input 
                    type="text" 
                    required 
                    value={editName}
                    onChange={e => setEditName(e.target.value)}
                    className="w-full px-5 py-4 glass border border-white/40 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none font-medium text-sm" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">{t('dashboard.profile.phone')}</label>
                  <div className="flex gap-2">
                    <input 
                      type="tel" 
                      required 
                      value={editPhone}
                      onChange={e => setEditPhone(e.target.value)}
                      placeholder="0912-345-678"
                      className="flex-1 px-5 py-4 glass border border-white/40 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none font-medium text-sm" 
                    />
                    <button type="button" className="px-4 py-2 bg-teal-100 text-teal-700 text-xs font-bold rounded-xl whitespace-nowrap">{t('dashboard.profile.verifyPhone')}</button>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">{t('dashboard.profile.phoneRecall')}</p>
                </div>
                
                <button 
                  type="submit"
                  disabled={updating}
                  className="w-full py-4.5 bg-slate-900 text-white font-bold rounded-2xl hover:bg-primary transition-all shadow-xl disabled:opacity-50"
                >
                  {updating ? t('common.processing') : t('common.save')}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <AnimatePresence mode="wait">
              {activeTab === 'requests' && (
                <motion.div
                  key="requests"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  {trips.length > 0 ? (
                    trips.map((trip) => (
                      <div key={trip.id} className="glass rounded-3xl overflow-hidden shadow-xl p-6 md:p-8">
                         <div className="flex justify-between items-center mb-6">
                            <div className="text-xl font-bold text-slate-800">{trip.originAirport} → {trip.destinationAirport}</div>
                            <div className={cn(
                              "text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest",
                              trip.status === 'open' ? "bg-teal-100 text-teal-700" : "bg-slate-100 text-slate-500"
                            )}>
                              {trip.status === 'open' ? t('dashboard.status.open') : trip.status}
                            </div>
                         </div>
                         <div className="text-sm text-slate-500 mb-4">{t('trips.date')}：{formatDate(trip.flightDate)}</div>
                         <div className="flex justify-end gap-3">
                            <button 
                              onClick={() => handleEditTrip(trip)}
                              className="text-xs font-bold text-slate-400 hover:text-slate-600"
                            >
                              {t('common.edit')}
                            </button>
                            <button 
                              onClick={() => handleDeleteTrip(trip.id)}
                              className="text-xs font-bold text-red-400 hover:text-red-600"
                            >
                              {t('common.delete')}
                            </button>
                         </div>
                      </div>
                    ))
                  ) : (
                    <div className="glass rounded-3xl border-dashed p-12 text-center text-slate-400">
                      {t('dashboard.empty')}
                    </div>
                  )}
                </motion.div>
              )}
              {activeTab === 'upcoming' && (
                <motion.div
                  key="upcoming"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  {upcomingMatches.length > 0 ? (
                    upcomingMatches.map((match) => (
                      <div key={match.id} className="glass rounded-3xl overflow-hidden shadow-xl">
                        <div className="p-6 md:p-8">
                          <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-2 p-1.5 px-3 bg-orange-100/50 text-orange-600 text-[10px] font-bold rounded uppercase tracking-wider">
                              <Clock className="h-3 w-3" />
                              {t('dashboard.status.escrow')}
                            </div>
                            <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest leading-none">Match ID: {match.id.toUpperCase()}</div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div className="space-y-6">
                              <div className="flex items-center gap-8 px-2">
                                <div>
                                  <div className="text-3xl font-bold text-slate-900 tracking-tighter">{match.trip.originAirport}</div>
                                  <div className="text-[10px] text-slate-400 font-mono tracking-widest uppercase">{t('trips.origin')}</div>
                                </div>
                                <div className="flex flex-col items-center flex-1">
                                  <div className="h-[2px] w-full bg-slate-200 relative">
                                    <Plane className="h-4 w-4 text-teal-600 absolute left-1/2 top-1/2 -track-1/2 -translate-x-1/2 -translate-y-1/2" />
                                  </div>
                                  <div className="text-[10px] text-slate-400 font-bold mt-2 uppercase tracking-wide">
                                    {match.trip.flightNumber}
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="text-3xl font-bold text-slate-900 tracking-tighter">{match.trip.destinationAirport}</div>
                                  <div className="text-[10px] text-slate-400 font-mono tracking-widest uppercase">{t('trips.destination')}</div>
                                </div>
                              </div>
                              
                              <div className="space-y-2 p-4 rounded-2xl bg-white/40 border border-white/20">
                                <div className="flex items-center gap-2 text-[13px] text-slate-600 font-medium">
                                  <Calendar className="h-4 w-4 text-slate-400" />
                                  {t('trips.date')}：{formatDate(match.trip.flightDate)}
                                </div>
                                <div className="flex items-center gap-2 text-[13px] text-slate-600 font-medium">
                                  <User className="h-4 w-4 text-slate-400" />
                                  {t('dashboard.labels.careObject')}：李小華（子）
                                </div>
                              </div>
                            </div>

                            <div className="flex flex-col justify-between p-6 rounded-3xl glass text-slate-800 relative overflow-hidden">
                              <div className="absolute top-0 right-0 p-4 opacity-5">
                                <ShieldCheck className="h-24 w-24" />
                              </div>
                              
                              <div>
                                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{t('dashboard.labels.careObject')}</div>
                                <div className="text-xl font-bold tracking-tight">{match.companion.fullName}</div>
                                <div className="flex items-center gap-2 mt-1">
                                  <div className="flex gap-0.5">
                                    {[1,2,3,4,5].map(s => <Star key={s} className="h-3 w-3 fill-orange-500 text-orange-500" />)}
                                  </div>
                                  <span className="text-[11px] font-bold text-teal-700">{match.companion.ratingAvg} {t('dashboard.labels.ratings')}</span>
                                </div>
                              </div>

                              <div className="mt-6 flex items-center justify-between">
                                 <div>
                                    <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">{t('dashboard.labels.agreedFee')}</div>
                                    <div className="text-2xl font-black text-slate-800">{formatCurrency(match.agreedFee)}</div>
                                 </div>
                                 <button 
                                  onClick={() => setShowQR(true)}
                                  className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-primary transition-all shadow-lg"
                                 >
                                    <QrCode className="h-4 w-4" />
                                    {t('dashboard.labels.handoffCode')}
                                 </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-white/30 px-8 py-4 border-t border-white/20 flex items-center justify-between">
                           <div className="flex gap-6">
                              <div className="flex flex-col">
                                <span className="text-[10px] font-bold text-slate-400">{t('dashboard.labels.deposit')}</span>
                                <span className="text-xs font-bold text-teal-600">{formatCurrency(match.agreedFee * 0.2)}</span>
                              </div>
                              <div className="flex flex-col">
                                <span className="text-[10px] font-bold text-slate-400">{t('dashboard.labels.balance')}</span>
                                <span className="text-xs font-bold text-slate-600">{formatCurrency(match.agreedFee * 0.8)}</span>
                              </div>
                           </div>
                           <button className="text-sm font-bold text-primary hover:underline">{t('dashboard.labels.contact')}</button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="glass rounded-3xl border-dashed p-12 text-center text-slate-400">
                       {t('dashboard.emptyUpcoming')}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar Area */}
          <div className="space-y-6">
            <div className="glass rounded-3xl p-8">
               <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">{t('dashboard.labels.safety')}</h3>
               <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="h-8 w-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 shrink-0">
                      <CheckCircle2 className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-800">{t('dashboard.labels.phoneVerify')}</div>
                      <div className="text-xs text-slate-500">{t('dashboard.labels.completed')} 0912-***-678</div>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="h-8 w-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 shrink-0">
                      <CheckCircle2 className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-800">{t('dashboard.labels.kycVerify')}</div>
                      <div className="text-xs text-slate-500">{t('dashboard.labels.kycPass')}</div>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="h-8 w-8 rounded-full bg-orange-100/50 flex items-center justify-center text-orange-600 shrink-0 border border-orange-100">
                      <AlertCircle className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-800">{t('dashboard.labels.creditCard')}</div>
                      <div className="text-xs text-slate-500">{t('dashboard.labels.cardDesc')}</div>
                      <button className="mt-2 text-xs font-bold text-teal-600 hover:underline">{t('dashboard.labels.bindNow')}</button>
                    </div>
                  </div>
               </div>
            </div>

            <div className="glass rounded-3xl p-8 relative overflow-hidden">
               <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">{t('dashboard.labels.needHelp')}</h3>
               <p className="text-[13px] text-slate-600 leading-relaxed font-medium">
                  {t('dashboard.labels.helpDesc')}
               </p>
               <button className="mt-6 w-full py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all shadow-lg">
                  {t('dashboard.labels.contactSupport')}
               </button>
               <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-teal-500/5 rounded-full blur-2xl"></div>
            </div>
          </div>
        </div>
      </div>

      {/* QR Code Modal Overlay */}
      <AnimatePresence>
        {showQR && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md"
            onClick={() => setShowQR(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white/90 backdrop-blur-2xl rounded-[2.5rem] p-10 max-w-sm w-full text-center space-y-8 shadow-2xl border border-white/50"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">{t('dashboard.labels.handoffTitle')}</h3>
                <button onClick={() => setShowQR(false)} className="text-slate-400 p-2 hover:text-slate-900 transition-colors">✕</button>
              </div>
              
              <div className="bg-white p-4 rounded-3xl shadow-inner border border-slate-100 flex justify-center">
                 <QRCodeSVG 
                  value="match-m1-handoff-token-123456" 
                  size={200}
                  fgColor="#0d9488"
                />
              </div>
              
              <div className="space-y-3">
                <p className="text-lg font-bold text-slate-800 tracking-tight">{t('dashboard.labels.handoffScan')}</p>
                <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                  {t('dashboard.labels.handoffDesc')}
                </p>
              </div>
              
              <button 
                onClick={() => setShowQR(false)}
                className="w-full py-4 bg-teal-600 text-white font-bold rounded-2xl hover:bg-teal-700 transition-all shadow-xl shadow-teal-200"
              >
                {t('dashboard.labels.gotIt')}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
