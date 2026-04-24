import { Link } from 'react-router-dom';
import { Plane, User, Bell, Menu } from 'lucide-react';
import { cn } from '../../lib/utils';

export function Navbar() {
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
            尋找旅程
          </Link>
          <Link to="/create-trip" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">
            發布需求
          </Link>
          <Link to="/how-it-works" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">
            服務流程
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <button className="relative rounded-full p-2 text-slate-600 hover:bg-slate-100 transition-colors">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-secondary" />
          </button>
          
          <Link 
            to="/dashboard"
            className="flex items-center gap-2 rounded-full bg-slate-50 border border-slate-200 px-3 py-1.5 hover:border-primary/30 transition-all"
          >
            <div className="h-7 w-7 rounded-full bg-slate-200 flex items-center justify-center overflow-hidden">
              <User className="h-4 w-4 text-slate-500" />
            </div>
            <span className="hidden text-sm font-medium text-slate-700 sm:block">我的帳戶</span>
          </Link>
          
          <button className="md:hidden">
            <Menu className="h-6 w-6 text-slate-600" />
          </button>
        </div>
      </div>
    </nav>
  );
}
