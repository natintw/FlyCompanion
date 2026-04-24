import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plane, 
  ShieldCheck, 
  History, 
  Settings, 
  MapPin, 
  Calendar, 
  ArrowRight, 
  User, 
  Star,
  QrCode,
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { cn, formatCurrency, formatDate } from '../lib/utils';
import type { User as UserType, Trip, Match } from '../types';

// Mock data
const MOCK_USER: UserType = {
  id: 'u1',
  phone: '0912-345-678',
  fullName: '林曉平',
  email: 'xiaoping@example.com',
  role: 'requester',
  kycStatus: 'verified',
  ratingAvg: 4.9,
  ratingCount: 12,
  createdAt: '2026-01-01',
};

const MOCK_UPCOMING_MATCHES: (Match & { trip: Trip, companion: UserType })[] = [
  {
    id: 'm1',
    tripId: 't1',
    companionId: 'u5',
    agreedFee: 12000,
    status: 'confirmed',
    depositPaidAt: '2026-04-18',
    createdAt: '2026-04-15',
    trip: {
      id: 't1',
      requesterId: 'u1',
      caretakingProfileId: 'c1',
      originAirport: 'TPE',
      destinationAirport: 'LAX',
      flightDate: '2026-05-15',
      flightNumber: 'CI008',
      careRequirements: { sideBySide: true, assistMeal: true, assistToilet: false, assistImmigration: true, handoffAtDestination: true },
      budgetMin: 10000,
      budgetMax: 15000,
      status: 'matched',
      createdAt: '2026-04-10',
    },
    companion: {
      id: 'u5',
      fullName: '張志強',
      phone: '0988-111-222',
      email: 'strong@example.com',
      role: 'companion',
      kycStatus: 'verified',
      ratingAvg: 4.8,
      ratingCount: 25,
      createdAt: '2025-05-01',
    }
  }
];

export function Dashboard() {
  const [showQR, setShowQR] = useState(false);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past' | 'requests'>('upcoming');

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
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{MOCK_USER.fullName}</h1>
                <div className="flex items-center gap-3 mt-1">
                  <div className="flex items-center gap-1 text-[10px] font-bold text-teal-700 bg-teal-100/50 px-2 py-0.5 rounded uppercase tracking-wider">
                    <ShieldCheck className="h-3 w-3" />
                    {MOCK_USER.kycStatus === 'verified' ? '已實名認證' : '認證待補'}
                  </div>
                  <div className="flex items-center gap-1 text-[10px] font-bold text-orange-700 bg-orange-100/50 px-2 py-0.5 rounded uppercase tracking-wider">
                    <Star className="h-3 w-3 fill-orange-500 text-orange-500" />
                    {MOCK_USER.ratingAvg} ({MOCK_USER.ratingCount})
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex gap-2">
               <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/40 glass text-sm font-bold text-slate-600 hover:bg-white/60 transition-all">
                  <Settings className="h-4 w-4" />
                  帳號設定
               </button>
               <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-bold hover:shadow-lg transition-all shadow-teal-200">
                  <Plane className="h-4 w-4" />
                  發布新旅程
               </button>
            </div>
          </div>
          
          <div className="flex gap-8 mt-10">
            {['upcoming', 'past', 'requests'].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={cn(
                  "pb-4 text-sm font-bold transition-all relative",
                  activeTab === tab ? "text-teal-700" : "text-slate-400 hover:text-slate-600"
                )}
              >
                {tab === 'upcoming' ? '即將到來' : tab === 'past' ? '過往旅程' : '我的發布'}
                {activeTab === tab && (
                  <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-[2px] bg-teal-600 rounded-t-full" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <AnimatePresence mode="wait">
              {activeTab === 'upcoming' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  {MOCK_UPCOMING_MATCHES.length > 0 ? (
                    MOCK_UPCOMING_MATCHES.map((match) => (
                      <div key={match.id} className="glass rounded-3xl overflow-hidden shadow-xl">
                        <div className="p-6 md:p-8">
                          <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-2 p-1.5 px-3 bg-orange-100/50 text-orange-600 text-[10px] font-bold rounded uppercase tracking-wider">
                              <Clock className="h-3 w-3" />
                              Escrow 代管中
                            </div>
                            <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest leading-none">Match ID: {match.id.toUpperCase()}</div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div className="space-y-6">
                              <div className="flex items-center gap-8 px-2">
                                <div>
                                  <div className="text-3xl font-bold text-slate-900 tracking-tighter">{match.trip.originAirport}</div>
                                  <div className="text-[10px] text-slate-400 font-mono tracking-widest uppercase">Origin</div>
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
                                  <div className="text-[10px] text-slate-400 font-mono tracking-widest uppercase">Dest</div>
                                </div>
                              </div>
                              
                              <div className="space-y-2 p-4 rounded-2xl bg-white/40 border border-white/20">
                                <div className="flex items-center gap-2 text-[13px] text-slate-600 font-medium">
                                  <Calendar className="h-4 w-4 text-slate-400" />
                                  出發日期：{formatDate(match.trip.flightDate)}
                                </div>
                                <div className="flex items-center gap-2 text-[13px] text-slate-600 font-medium">
                                  <User className="h-4 w-4 text-slate-400" />
                                  陪伴對象：李小華（子）
                                </div>
                              </div>
                            </div>

                            <div className="flex flex-col justify-between p-6 rounded-3xl glass text-slate-800 relative overflow-hidden">
                              <div className="absolute top-0 right-0 p-4 opacity-5">
                                <ShieldCheck className="h-24 w-24" />
                              </div>
                              
                              <div>
                                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">陪伴者</div>
                                <div className="text-xl font-bold tracking-tight">{match.companion.fullName}</div>
                                <div className="flex items-center gap-2 mt-1">
                                  <div className="flex gap-0.5">
                                    {[1,2,3,4,5].map(s => <Star key={s} className="h-3 w-3 fill-orange-500 text-orange-500" />)}
                                  </div>
                                  <span className="text-[11px] font-bold text-teal-700">{match.companion.ratingAvg} 評分</span>
                                </div>
                              </div>

                              <div className="mt-6 flex items-center justify-between">
                                 <div>
                                    <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">約定費用</div>
                                    <div className="text-2xl font-black text-slate-800">{formatCurrency(match.agreedFee)}</div>
                                 </div>
                                 <button 
                                  onClick={() => setShowQR(true)}
                                  className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-primary transition-all shadow-lg"
                                 >
                                    <QrCode className="h-4 w-4" />
                                    機場交接碼
                                 </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-white/30 px-8 py-4 border-t border-white/20 flex items-center justify-between">
                           <div className="flex gap-6">
                              <div className="flex flex-col">
                                <span className="text-[10px] font-bold text-slate-400">已付訂金 (20%)</span>
                                <span className="text-xs font-bold text-teal-600">{formatCurrency(match.agreedFee * 0.2)}</span>
                              </div>
                              <div className="flex flex-col">
                                <span className="text-[10px] font-bold text-slate-400">尾款於目的地支付</span>
                                <span className="text-xs font-bold text-slate-600">{formatCurrency(match.agreedFee * 0.8)}</span>
                              </div>
                           </div>
                           <button className="text-sm font-bold text-primary hover:underline">聯繫陪伴者</button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="glass rounded-3xl border-dashed p-12 text-center">
                       <p className="text-slate-400">目前沒有即將到來的旅程</p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar Area */}
          <div className="space-y-6">
            <div className="glass rounded-3xl p-8">
               <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">安全與合規</h3>
               <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="h-8 w-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 shrink-0">
                      <CheckCircle2 className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-800">手機號碼驗證</div>
                      <div className="text-xs text-slate-500">已完成 0912-***-678</div>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="h-8 w-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 shrink-0">
                      <CheckCircle2 className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-800">KYC 實名認證</div>
                      <div className="text-xs text-slate-500">護照與人臉比對已通過</div>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="h-8 w-8 rounded-full bg-orange-100/50 flex items-center justify-center text-orange-600 shrink-0 border border-orange-100">
                      <AlertCircle className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-800">信用卡綁定</div>
                      <div className="text-xs text-slate-500">建議綁定以加速支付流程</div>
                      <button className="mt-2 text-xs font-bold text-teal-600 hover:underline">立即綁定</button>
                    </div>
                  </div>
               </div>
            </div>

            <div className="glass rounded-3xl p-8 relative overflow-hidden">
               <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">需要協助？</h3>
               <p className="text-[13px] text-slate-600 leading-relaxed font-medium">
                  如果您在旅程中遇到任何問題，或需要更改媒合資訊，請隨時聯繫線上客服。
               </p>
               <button className="mt-6 w-full py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all shadow-lg">
                  聯繫 24/7 線上客服
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
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">交接驗證碼</h3>
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
                <p className="text-lg font-bold text-slate-800 tracking-tight">請讓陪伴者掃描此碼</p>
                <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                  交接時，陪伴者會掃描此 QR Code 確認接管被照護者，系統會自動紀錄當下的地理位置與時間。
                </p>
              </div>
              
              <button 
                onClick={() => setShowQR(false)}
                className="w-full py-4 bg-teal-600 text-white font-bold rounded-2xl hover:bg-teal-700 transition-all shadow-xl shadow-teal-200"
              >
                我知道了
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
