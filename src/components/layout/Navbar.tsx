import { Link } from 'react-router-dom';
import { Plane, User, Bell, Menu, Languages } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function Navbar() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <nav className="sticky top-0 z-50 w-full glass-nav">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white">
            <Plane className="h-6 w-6" />
          </div>
          <span className="font-sans text-xl font-bold tracking-tight text-slate-900">
            FlyCompanion
          </span>
        </Link>
        
        <div className="hidden items-center gap-8 md:flex">
          <Link to="/find-trips" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">
            {t('nav.findTrips')}
          </Link>
          <Link to="/create-trip" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">
            {t('nav.createTrip')}
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 glass rounded-lg px-2 py-1">
             <Languages className="h-4 w-4 text-slate-400" />
             <select 
               onChange={(e) => changeLanguage(e.target.value)}
               value={i18n.language}
               className="text-[11px] font-bold bg-transparent outline-none cursor-pointer text-slate-600"
             >
               <option value="zh">繁中</option>
               <option value="en">EN</option>
               <option value="ja">日本語</option>
             </select>
          </div>

          <button className="relative rounded-full p-2 text-slate-600 hover:bg-slate-100 transition-colors">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-secondary" />
          </button>
          
          <Link 
            to="/dashboard"
            className="flex items-center gap-2 rounded-full bg-slate-50 border border-slate-200 px-3 py-1.5 hover:border-primary/30 transition-all font-bold"
          >
            <div className="h-7 w-7 rounded-full bg-slate-200 flex items-center justify-center overflow-hidden">
              <User className="h-4 w-4 text-slate-500" />
            </div>
            <span className="hidden text-[12px] text-slate-700 sm:block">{t('nav.account')}</span>
          </Link>
          
          <button className="md:hidden">
            <Menu className="h-6 w-6 text-slate-600" />
          </button>
        </div>
      </div>
    </nav>
  );
}
