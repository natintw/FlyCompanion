import { Link } from 'react-router-dom';
import { Plane, Facebook, Instagram, Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="glass-footer text-slate-600">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Plane className="h-5 w-5 text-white" />
              </div>
              <span className="font-sans text-lg font-bold tracking-tight text-teal-900">
                FlyCompanion <span className="font-normal text-teal-600/80 italic">{t('nav.howItWorks')}</span>
              </span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-slate-500">
              {t('footer.tagline')}
            </p>
            <div className="flex gap-4">
              <Facebook className="h-5 w-5 cursor-pointer hover:text-primary transition-colors text-slate-400" />
              <Instagram className="h-5 w-5 cursor-pointer hover:text-primary transition-colors text-slate-400" />
              <Mail className="h-5 w-5 cursor-pointer hover:text-primary transition-colors text-slate-400" />
            </div>
          </div>
          
          <div>
            <h3 className="mb-4 font-bold text-slate-800">{t('footer.services.title')}</h3>
            <ul className="flex flex-col gap-2 text-sm text-slate-500">
              <li className="hover:text-primary transition-colors cursor-pointer">{t('footer.services.teen')}</li>
              <li className="hover:text-primary transition-colors cursor-pointer">{t('footer.services.senior')}</li>
              <li className="hover:text-primary transition-colors cursor-pointer">{t('footer.services.family')}</li>
              <li className="hover:text-primary transition-colors cursor-pointer">{t('footer.services.handoff')}</li>
            </ul>
          </div>
          
          <div>
            <h3 className="mb-4 font-bold text-slate-800">{t('footer.platform.title')}</h3>
            <ul className="flex flex-col gap-2 text-sm text-slate-500">
              <li className="hover:text-primary transition-colors cursor-pointer">{t('footer.platform.terms')}</li>
              <li className="hover:text-primary transition-colors cursor-pointer">{t('footer.platform.privacy')}</li>
              <li className="hover:text-primary transition-colors cursor-pointer">{t('footer.platform.kyc')}</li>
              <li className="hover:text-primary transition-colors cursor-pointer">{t('footer.platform.refunds')}</li>
            </ul>
          </div>
          
          <div>
            <h3 className="mb-4 font-bold text-slate-800">{t('footer.contact.title')}</h3>
            <p className="text-sm text-slate-500">
              {t('footer.contact.desc')}
            </p>
            <div className="mt-4 rounded-lg bg-white/40 p-4 border border-white/20">
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">{t('footer.contact.hours')}</p>
              <p className="text-sm font-semibold text-slate-700">{t('footer.contact.hoursVal')}</p>
            </div>
          </div>
        </div>
        
        <div className="mt-16 border-t border-slate-200 pt-8 text-center text-xs text-slate-400">
          <p>© 2026 FlyCompanion {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
}
