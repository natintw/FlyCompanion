import { useState, useEffect } from 'react';
import { Search, Plane, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { formatCurrency, formatDate } from '../lib/utils';
import { dbService } from '../services/db';
import { where, orderBy } from 'firebase/firestore';
import type { Trip } from '../types';

export function FindTrips() {
  const { t } = useTranslation();
  const [trips, setTrips] = useState<Trip[]>([]);
  const [filteredTrips, setFilteredTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [searchParams, setSearchParams] = useState({
    origin: '',
    destination: '',
    date: '',
    flightNum: ''
  });

  useEffect(() => {
    const q = [
      where('status', '==', 'open'),
      orderBy('createdAt', 'desc')
    ];
    
    const unsubscribe = dbService.subscribeToCollection<Trip>('trips', q, (data) => {
      setTrips(data);
      setFilteredTrips(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSearch = () => {
    let filtered = [...trips];
    if (searchParams.origin) {
      filtered = filtered.filter(t => t.originAirport.toLowerCase().includes(searchParams.origin.toLowerCase()));
    }
    if (searchParams.destination) {
      filtered = filtered.filter(t => t.destinationAirport.toLowerCase().includes(searchParams.destination.toLowerCase()));
    }
    if (searchParams.date) {
      filtered = filtered.filter(t => t.flightDate === searchParams.date);
    }
    if (searchParams.flightNum) {
      filtered = filtered.filter(t => t.flightNumber?.toLowerCase().includes(searchParams.flightNum.toLowerCase()));
    }
    setFilteredTrips(filtered);
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header Area */}
      <div className="glass-nav px-4 py-12">
        <div className="container mx-auto">
          <h1 className="text-3xl font-serif font-light text-slate-800 mb-6 font-bold tracking-tight">{t('trips.findTitle')}</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="relative">
              <input 
                type="text" 
                placeholder={`${t('trips.origin')} (${t('trips.placeholderAirport')})`}
                value={searchParams.origin}
                onChange={e => setSearchParams({...searchParams, origin: e.target.value})}
                className="w-full pl-4 pr-4 py-3 rounded-xl glass border border-white/40 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium text-sm"
              />
            </div>
            <div className="relative">
              <input 
                type="text" 
                placeholder={`${t('trips.destination')} (${t('trips.placeholderAirport')})`}
                value={searchParams.destination}
                onChange={e => setSearchParams({...searchParams, destination: e.target.value})}
                className="w-full pl-4 pr-4 py-3 rounded-xl glass border border-white/40 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium text-sm"
              />
            </div>
            <div className="relative">
              <input 
                type="date" 
                value={searchParams.date}
                onChange={e => setSearchParams({...searchParams, date: e.target.value})}
                className="w-full pl-4 pr-4 py-3 rounded-xl glass border border-white/40 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium text-sm"
              />
            </div>
            <div className="relative">
              <input 
                type="text" 
                placeholder={t('trips.flightNum')} 
                value={searchParams.flightNum}
                onChange={e => setSearchParams({...searchParams, flightNum: e.target.value})}
                className="w-full pl-4 pr-4 py-3 rounded-xl glass border border-white/40 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium text-sm"
              />
            </div>
            <button 
              onClick={handleSearch}
              className="bg-slate-900 text-white font-bold py-3 px-6 rounded-xl hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 shadow-lg"
            >
              <Search className="h-5 w-5" />
              {t('trips.search')}
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Area */}
          <aside className="hidden lg:block w-64 shrink-0 space-y-8 p-6 glass rounded-2xl h-fit">
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">{t('trips.searchLabels.careObject')}</h3>
              <div className="space-y-3">
                {['Teen (12-18)', 'Senior (65+)', 'Family', 'Adult'].map(label => (
                  <label key={label} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary bg-white/40" />
                    <span className="text-[13px] font-medium text-slate-600 group-hover:text-slate-900 transition-colors">{label}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div className="pt-4 border-t border-white/20">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">{t('trips.requirements')}</h3>
              <div className="space-y-3">
                {Object.keys(t('trips.labels', { returnObjects: true })).map(key => (
                  <label key={key} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary bg-white/40" />
                    <span className="text-[13px] font-medium text-slate-600 group-hover:text-slate-900 transition-colors">{t(`trips.labels.${key}`)}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Trip List */}
          <div className="flex-1 space-y-6">
            <div className="flex items-center justify-between px-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                {t('trips.foundCount', { count: filteredTrips.length })}
              </span>
              <select className="text-[13px] border-none bg-transparent font-bold text-teal-700 outline-none cursor-pointer">
                <option>{t('trips.searchLabels.sort.label')}: {t('trips.searchLabels.sort.newest')}</option>
                <option>{t('trips.searchLabels.sort.label')}: {t('trips.searchLabels.sort.price')}</option>
              </select>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {loading ? (
                <div className="p-20 text-center glass rounded-3xl">
                   <div className="animate-pulse flex flex-col items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-slate-200" />
                      <div className="h-4 w-48 bg-slate-200 rounded" />
                   </div>
                </div>
              ) : filteredTrips.length === 0 ? (
                <div className="p-20 text-center glass rounded-3xl">
                   <p className="text-slate-400 font-medium italic">{t('trips.noResults')}</p>
                </div>
              ) : (
                filteredTrips.map((trip, i) => (
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
                              {trip.flightNumber || 'TBD'}
                            </div>
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">{t('common.status')}: {formatDate(trip.createdAt)}</div>
                          </div>

                          <div className="flex items-center gap-12">
                            <div>
                              <div className="text-3xl font-bold text-slate-800 tracking-tighter">{trip.originAirport}</div>
                              <div className="text-[10px] text-slate-400 font-mono tracking-widest uppercase">{t('trips.origin')}</div>
                            </div>
                            <div className="flex flex-col items-center flex-1 min-w-[60px]">
                              <ArrowRight className="h-5 w-5 text-teal-600" />
                              <div className="text-[10px] text-slate-500 font-bold mt-2 uppercase tracking-wide whitespace-nowrap">
                                {formatDate(trip.flightDate)}
                                {trip.isDateRange && trip.flightDateEnd && ` - ${formatDate(trip.flightDateEnd)}`}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-3xl font-bold text-slate-800 tracking-tighter">{trip.destinationAirport}</div>
                              <div className="text-[10px] text-slate-400 font-mono tracking-widest uppercase">{t('trips.destination')}</div>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2 pt-2">
                            {trip.careRequirements?.sideBySide && <Tag label={t('trips.labels.sideBySide')} />}
                            {trip.careRequirements?.assistMeal && <Tag label={t('trips.labels.assistMeal')} />}
                            {trip.careRequirements?.assistImmigration && <Tag label={t('trips.labels.assistImmigration')} />}
                          </div>

                          {trip.specialInstructions && (
                            <div className="text-[11px] text-orange-600 bg-orange-50/50 p-2 px-3 rounded-lg border border-orange-100/50 max-w-md font-medium">
                              {trip.specialInstructions}
                            </div>
                          )}
                        </div>

                        <div className="flex flex-col justify-between items-end gap-6 min-w-[220px] bg-slate-900/5 p-6 rounded-2xl border border-slate-900/5">
                           <div className="text-right">
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{t('trips.budget')}</div>
                            <div className="text-2xl font-black text-slate-800 tracking-tighter leading-none">
                              {formatCurrency(trip.budgetMin)} - {formatCurrency(trip.budgetMax)}
                            </div>
                          </div>

                          <Link 
                            to={`/trips/${trip.id}`} 
                            className="w-full text-center bg-slate-900 text-white text-sm font-bold py-3.5 px-8 rounded-xl hover:bg-primary transition-all shadow-lg"
                          >
                            {t('trips.apply')}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
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
