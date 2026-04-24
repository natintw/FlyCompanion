import { Search, Filter, Calendar, MapPin, Plane, ArrowRight, ShieldCheck, User } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { formatCurrency, formatDate } from '../lib/utils';
import type { Trip } from '../types';

// Mock Data
const MOCK_TRIPS: Trip[] = [
  {
    id: '1',
    requesterId: 'u1',
    caretakingProfileId: 'c1',
    originAirport: 'TPE',
    destinationAirport: 'LAX',
    flightDate: '2026-05-15',
    flightNumber: 'CI008',
    careRequirements: {
      sideBySide: true,
      assistMeal: true,
      assistToilet: false,
      assistImmigration: true,
      handoffAtDestination: true,
    },
    budgetMin: 8000,
    budgetMax: 12000,
    status: 'open',
    createdAt: '2026-04-10',
  },
  {
    id: '2',
    requesterId: 'u2',
    caretakingProfileId: 'c2',
    originAirport: 'TPE',
    destinationAirport: 'NRT',
    flightDate: '2026-06-02',
    careRequirements: {
      sideBySide: false,
      assistMeal: false,
      assistToilet: false,
      assistImmigration: true,
      handoffAtDestination: true,
    },
    budgetMin: 3000,
    budgetMax: 5000,
    status: 'open',
    createdAt: '2026-04-12',
  },
  {
    id: '3',
    requesterId: 'u3',
    caretakingProfileId: 'c3',
    originAirport: 'KUL',
    destinationAirport: 'TPE',
    flightDate: '2026-05-20',
    flightNumber: 'BR228',
    careRequirements: {
      sideBySide: true,
      assistMeal: true,
      assistToilet: true,
      assistImmigration: true,
      handoffAtDestination: true,
    },
    budgetMin: 10000,
    budgetMax: 15000,
    status: 'open',
    createdAt: '2026-04-15',
  }
];

export function FindTrips() {
  return (
    <div className="min-h-screen pb-20">
      {/* Header Area */}
      <div className="glass-nav px-4 py-12">
        <div className="container mx-auto">
          <h1 className="text-3xl font-serif font-light text-slate-800 mb-6">尋找需要陪伴的旅程</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input 
                type="text" 
                placeholder="搜尋機場 (如 TPE, LAX)..." 
                className="w-full pl-10 pr-4 py-3 rounded-xl glass border border-white/40 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
              />
            </div>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input 
                type="date" 
                className="w-full pl-10 pr-4 py-3 rounded-xl glass border border-white/40 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
              />
            </div>
            <button className="bg-slate-900 text-white font-bold py-3 px-6 rounded-xl hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 shadow-lg">
              <Filter className="h-5 w-5" />
              進階篩選
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar / Filters (Hidden on small) */}
          <aside className="hidden lg:block w-64 shrink-0 space-y-8 p-6 glass rounded-2xl h-fit">
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">陪伴對象</h3>
              <div className="space-y-3">
                {['青少年 (12-18)', '長輩 (65+)', '幼兒家庭', '一般成人'].map(label => (
                  <label key={label} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary bg-white/40" />
                    <span className="text-[13px] font-medium text-slate-600 group-hover:text-slate-900 transition-colors">{label}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div className="pt-4 border-t border-white/20">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">照護需求</h3>
              <div className="space-y-3">
                {['需坐鄰座', '協助用餐', '協助轉機', '目的地交付'].map(label => (
                  <label key={label} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary bg-white/40" />
                    <span className="text-[13px] font-medium text-slate-600 group-hover:text-slate-900 transition-colors">{label}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Trip List */}
          <div className="flex-1 space-y-6">
            <div className="flex items-center justify-between px-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">找到 {MOCK_TRIPS.length} 個行程</span>
              <select className="text-[13px] border-none bg-transparent font-bold text-teal-700 outline-none cursor-pointer">
                <option>排序：日期由近到遠</option>
                <option>排序：預算由高到低</option>
              </select>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {MOCK_TRIPS.map((trip, i) => (
                <motion.div 
                  key={trip.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="group glass rounded-3xl overflow-hidden hover:shadow-xl hover:bg-white/60 transition-all"
                >
                  <div className="p-6 md:p-8">
                    <div className="flex flex-col md:flex-row justify-between gap-8">
                      <div className="space-y-5">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1.5 p-1 px-3 bg-teal-100 text-teal-700 text-[10px] font-bold rounded uppercase tracking-wider">
                            <Plane className="h-3 w-3" />
                            {trip.flightNumber || '航班未定'}
                          </div>
                          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">發布於 {formatDate(trip.createdAt)}</div>
                        </div>

                        <div className="flex items-center gap-12">
                          <div>
                            <div className="text-3xl font-bold text-slate-800 tracking-tighter">{trip.originAirport}</div>
                            <div className="text-[10px] text-slate-400 font-mono tracking-widest uppercase">Origin</div>
                          </div>
                          <div className="flex flex-col items-center flex-1 min-w-[60px]">
                            <ArrowRight className="h-5 w-5 text-teal-600" />
                            <div className="text-[10px] text-slate-500 font-bold mt-2 uppercase tracking-wide whitespace-nowrap">{formatDate(trip.flightDate)}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-3xl font-bold text-slate-800 tracking-tighter">{trip.destinationAirport}</div>
                            <div className="text-[10px] text-slate-400 font-mono tracking-widest uppercase">Dest</div>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 pt-2">
                          {trip.careRequirements.sideBySide && <Tag label="坐鄰座" />}
                          {trip.careRequirements.assistMeal && <Tag label="協助用餐" />}
                          {trip.careRequirements.assistImmigration && <Tag label="協助通關" />}
                        </div>
                      </div>

                      <div className="flex flex-col justify-between items-end gap-6 min-w-[220px] bg-slate-900/5 p-6 rounded-2xl border border-slate-900/5">
                        <div className="text-right">
                          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">預算範圍</div>
                          <div className="text-2xl font-black text-slate-800 tracking-tighter leading-none">
                            {formatCurrency(trip.budgetMin)} - {formatCurrency(trip.budgetMax)}
                          </div>
                        </div>

                        <Link 
                          to={`/trips/${trip.id}`} 
                          className="w-full text-center bg-slate-900 text-white text-sm font-bold py-3.5 px-8 rounded-xl hover:bg-primary transition-all shadow-lg"
                        >
                          我想接案
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Tag({ label }: { label: string }) {
  return (
    <span className="flex items-center gap-1 text-[9px] font-bold text-teal-700 bg-teal-50 px-2 py-1 rounded-md border border-teal-100 uppercase tracking-wider leading-none">
      {label}
    </span>
  );
}
