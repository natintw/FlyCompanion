import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plane, 
  User, 
  Calendar, 
  MapPin, 
  ArrowRight, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft, 
  Wallet, 
  ClipboardCheck, 
  MessageSquare 
} from 'lucide-react';
import { cn, formatCurrency } from '../lib/utils';

type Step = 'caretaker' | 'flight' | 'requirements' | 'budget' | 'confirm';

const STEPS: { id: Step; label: string }[] = [
  { id: 'caretaker', label: '對象選擇' },
  { id: 'flight', label: '旅程資訊' },
  { id: 'requirements', label: '照護需求' },
  { id: 'budget', label: '費用設定' },
  { id: 'confirm', label: '完成發布' },
];

export function CreateTrip() {
  const [currentStep, setCurrentStep] = useState<Step>('caretaker');
  const [formData, setFormData] = useState({
    caretakerName: '',
    relation: '',
    origin: '',
    destination: '',
    date: '',
    flightNum: '',
    requirements: {
      sideBySide: false,
      assistMeal: false,
      assistToilet: false,
      assistImmigration: false,
      handoff: false,
    },
    budgetOption: 'range' as 'range' | 'open',
    budgetMin: 5000,
    budgetMax: 10000,
    memo: '',
  });

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
                      <h2 className="text-2xl font-serif text-slate-900 font-light italic">誰需要陪伴？</h2>
                      <p className="text-slate-500 text-sm font-medium">請選擇或建立新的被照護者資料，以便陪伴者了解情況。</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-8 rounded-[2rem] glass border border-white/50 hover:bg-white/60 transition-all cursor-pointer group">
                        <div className="h-14 w-14 rounded-2xl glass flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors shadow-sm">
                          <User className="h-7 w-7" />
                        </div>
                        <div className="font-bold text-slate-800 text-xl tracking-tight">李小華</div>
                        <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1">兒子 · 2018/05/20 生</div>
                      </div>
                      <button className="flex flex-col items-center justify-center p-8 rounded-[2rem] border-2 border-dashed border-white/40 glass hover:border-primary/50 hover:bg-primary/5 transition-all text-slate-400 hover:text-primary">
                        <div className="h-12 w-12 rounded-full glass flex items-center justify-center mb-3">
                          <span className="text-3xl font-light">+</span>
                        </div>
                        <span className="text-sm font-bold tracking-tight">建立新對象</span>
                      </button>
                    </div>
                  </div>
                )}

                {currentStep === 'flight' && (
                  <div className="space-y-10">
                    <div className="space-y-4">
                      <h2 className="text-2xl font-serif text-slate-900 font-light italic">旅程細節</h2>
                      <p className="text-slate-500 text-sm font-medium">輸入航班資訊，我們將優先為您匹配同班機的陪伴者。</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-xs font-bold uppercase tracking-widest text-slate-400 px-1">出發機場 (IATA)</label>
                        <input 
                          type="text" 
                          placeholder="例如 TPE" 
                          className="w-full p-4 glass border border-white/40 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none font-medium"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-xs font-bold uppercase tracking-widest text-slate-400 px-1">目的地機場 (IATA)</label>
                        <input 
                          type="text" 
                          placeholder="例如 LAX" 
                          className="w-full p-4 glass border border-white/40 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none font-medium"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-xs font-bold uppercase tracking-widest text-slate-400 px-1">飛行日期</label>
                        <div className="relative">
                          <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                          <input 
                            type="date" 
                            className="w-full pl-12 pr-4 py-4 glass border border-white/40 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none font-medium"
                          />
                        </div>
                      </div>
                      <div className="space-y-3">
                        <label className="text-xs font-bold uppercase tracking-widest text-slate-400 px-1">航班號碼 (選填)</label>
                        <input 
                          type="text" 
                          placeholder="例如 CI008" 
                          className="w-full p-4 glass border border-white/40 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none font-medium"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 'requirements' && (
                  <div className="space-y-10">
                    <div className="space-y-4">
                      <h2 className="text-2xl font-serif text-slate-900 font-light italic">您需要什麼樣的支援？</h2>
                      <p className="text-slate-500 text-sm font-medium">這些需求將作為陪伴者評估是否能勝任的標準。</p>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-6">
                      {[
                        { id: 'sideBySide', label: '需坐在被照護者旁邊', icon: <Plane className="h-5 w-5" /> },
                        { id: 'assistMeal', label: '協助進餐與處理飛機餐', icon: <ClipboardCheck className="h-5 w-5" /> },
                        { id: 'assistToilet', label: '協助如廁或清理', icon: <ChevronRight className="h-5 w-5" /> },
                        { id: 'assistImmigration', label: '協助通關與提領行李', icon: <MapPin className="h-5 w-5" /> },
                        { id: 'handoff', label: '目的地轉交給接機人', icon: <ArrowRight className="h-5 w-5" /> },
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
                          <input type="checkbox" className="h-6 w-6 rounded-lg border-slate-300 text-primary focus:ring-primary bg-white/40" />
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {currentStep === 'budget' && (
                  <div className="space-y-10">
                    <div className="space-y-4">
                      <h2 className="text-2xl font-serif text-slate-900 font-light italic">設定媒合預算</h2>
                      <p className="text-slate-500 text-sm font-medium">陪伴費用通常與航程長短及任務困難度有關。</p>
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
                          指定預算區間
                        </button>
                        <button 
                          onClick={() => setFormData({...formData, budgetOption: 'open'})}
                          className={cn(
                            "flex-1 py-2.5 text-[10px] font-bold rounded-xl transition-all uppercase tracking-widest",
                            formData.budgetOption === 'open' ? "bg-white text-teal-800 shadow-lg" : "text-slate-400 hover:text-slate-300"
                          )}
                        >
                          開放報價
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
                      
                      <div className="rounded-[2rem] glass p-8 border border-white/20 flex gap-6">
                        <div className="h-12 w-12 shrink-0 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-600 shadow-sm">
                          <Wallet className="h-6 w-6" />
                        </div>
                        <div className="space-y-1">
                          <p className="font-bold text-slate-800 text-lg tracking-tight">貼心提示</p>
                          <p className="text-[13px] text-slate-500 leading-relaxed font-medium">
                            對於長途航線（例如美加、歐洲），參考預算通常在 NT$8,000 - NT$15,000 之間。設定合理的預算能大幅提升媒合成功率。
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 'confirm' && (
                  <div className="space-y-10 text-center flex flex-col items-center">
                    <div className="h-24 w-24 rounded-full bg-teal-100 flex items-center justify-center text-primary mb-2 shadow-lg shadow-teal-200">
                      <CheckCircle2 className="h-12 w-12" />
                    </div>
                    <div className="space-y-4">
                      <h2 className="text-3xl font-serif text-slate-900 font-light italic">一切就緒！</h2>
                      <p className="text-slate-500 max-w-sm mx-auto font-medium leading-relaxed">
                        您的需求將被展示在平台，通過 KYC 驗證的陪伴者可以對您的旅程發起申請。
                      </p>
                    </div>
                    
                    <div className="w-full max-w-md glass rounded-[2.5rem] p-10 border border-white/40 text-left space-y-6 relative overflow-hidden backdrop-blur-3xl shadow-xl">
                       <div className="absolute top-0 right-0 p-6 opacity-5">
                          <Plane className="h-32 w-32" />
                       </div>
                       <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">旅程摘要</h4>
                       <div className="flex justify-between items-end border-b border-white/20 pb-8">
                          <div className="space-y-1">
                            <div className="text-3xl font-black text-slate-800 tracking-tighter">TPE → LAX</div>
                            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">2026/05/15 · CI008</div>
                          </div>
                       </div>
                       <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                             <div className="h-10 w-10 rounded-full glass border border-white/50" />
                             <div>
                               <div className="text-sm font-bold text-slate-800">李小華</div>
                               <div className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">被照護者</div>
                             </div>
                          </div>
                          <div className="text-right">
                             <div className="text-xl font-black text-teal-700 tracking-tight">{formatCurrency(formData.budgetMin)} - {formatCurrency(formData.budgetMax)}</div>
                             <div className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">預計費用</div>
                          </div>
                       </div>
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
                上一步
              </button>
              
              {currentStep !== 'confirm' ? (
                <button 
                  onClick={next}
                  className="flex items-center gap-2 px-10 py-4 bg-slate-900 text-white rounded-[1.25rem] font-bold hover:shadow-2xl hover:translate-x-1 transition-all text-sm uppercase tracking-widest"
                >
                  下一步
                  <ChevronRight className="h-5 w-5" />
                </button>
              ) : (
                <button 
                  className="px-14 py-5 bg-primary text-white rounded-[1.5rem] font-bold hover:shadow-2xl hover:scale-105 transition-all text-base uppercase tracking-widest shadow-teal-200"
                >
                  發布陪伴請求
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
