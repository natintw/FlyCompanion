import React, { useState } from 'react';
import { Plane, ShieldCheck, Mail, Lock, Facebook, ArrowRight, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { cn } from '../lib/utils';
import { useAuth } from '../context/AuthContext';

export function Auth() {
  const { t } = useTranslation();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { signInWithGoogle, signInWithEmail, signUpWithEmail, user } = useAuth();

  React.useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Login failed');
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      if (isLogin) {
        await signInWithEmail(email, password);
      } else {
        await signUpWithEmail(email, password, fullName);
      }
      navigate('/dashboard');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Auth failed');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center py-20 px-4">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 glass rounded-[3rem] overflow-hidden shadow-2xl backdrop-blur-3xl border border-white/40">
        {/* Left Side - Visual */}
        <div className="hidden lg:block relative p-12 bg-slate-900/5 overflow-hidden">
           <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
             <Plane className="h-64 w-64" />
          </div>
          
            <div className="relative z-10 h-full flex flex-col justify-between">
            <div className="space-y-6">
              <Link to="/" className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white shadow-lg shadow-teal-200">
                <Plane className="h-6 w-6" />
              </Link>
              <h1 className="text-4xl font-serif font-light text-slate-800 leading-tight">
                {isLogin ? t('auth.loginTitle') : t('auth.registerTitle')} <br />
                <span className="italic">{t('auth.subtitle')}</span>
              </h1>
              <p className="text-slate-500 font-medium leading-relaxed max-w-sm">
                {t('auth.desc')}
              </p>
            </div>
            
            <div className="glass p-8 rounded-3xl border border-white/40">
               <div className="flex gap-4 items-start">
                  <div className="h-10 w-10 flex items-center justify-center shrink-0 bg-teal-100 rounded-xl text-primary">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">{t('auth.kycTitle')}</h4>
                    <p className="text-xs text-slate-500 mt-1 font-medium leading-relaxed">
                      {t('auth.kycDesc')}
                    </p>
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="p-8 md:p-16 flex flex-col justify-center">
          <div className="mb-10 flex gap-4 p-1.5 glass-dark rounded-2xl w-fit">
            <button 
              onClick={() => setIsLogin(true)}
              className={cn(
                "px-8 py-2.5 text-xs font-bold rounded-xl transition-all uppercase tracking-widest",
                isLogin ? "bg-white text-teal-800 shadow-xl" : "text-slate-400 hover:text-slate-400"
              )}
            >
              {t('auth.login')}
            </button>
            <button 
              onClick={() => setIsLogin(false)}
              className={cn(
                "px-8 py-2.5 text-xs font-bold rounded-xl transition-all uppercase tracking-widest",
                !isLogin ? "bg-white text-teal-800 shadow-xl" : "text-slate-400 hover:text-slate-400"
              )}
            >
              {t('auth.register')}
            </button>
          </div>

          <div className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-slate-800 tracking-tight">
                {isLogin ? t('auth.login') : t('auth.register')}
              </h2>
              <p className="text-sm text-slate-500 font-medium">
                {isLogin ? t('auth.loginDesc') : t('auth.registerDesc')}
              </p>
            </div>

            {error && <div className="p-4 bg-red-50 text-red-600 rounded-2xl text-xs font-bold border border-red-100">{error}</div>}

            <form onSubmit={handleAuth} className="space-y-8">
              <div className="space-y-5">
                {!isLogin && (
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">{t('auth.name')}</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <input 
                        type="text" 
                        required 
                        placeholder={t('auth.namePlaceholder')}
                        value={fullName}
                        onChange={e => setFullName(e.target.value)}
                        className="w-full pl-12 pr-5 py-4 glass border border-white/40 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none font-medium text-sm" 
                      />
                    </div>
                  </div>
                )}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">{t('auth.email')}</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input 
                      type="email" 
                      required 
                      placeholder="example@email.com" 
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full pl-12 pr-5 py-4 glass border border-white/40 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none font-medium text-sm" 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">{t('auth.password')}</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input 
                      type="password" 
                      required 
                      placeholder="••••••••" 
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      className="w-full pl-12 pr-5 py-4 glass border border-white/40 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none font-medium text-sm" 
                    />
                  </div>
                </div>
                
                {isLogin && (
                  <div className="flex justify-end">
                    <button type="button" className="text-xs font-bold text-teal-600 hover:underline">{t('auth.forgotPassword')}</button>
                  </div>
                )}
              </div>

              <button type="submit" className="w-full py-4.5 bg-slate-900 text-white font-bold rounded-2xl hover:bg-primary transition-all shadow-xl hover:shadow-teal-100 flex items-center justify-center gap-2 group">
                {isLogin ? t('auth.loginAction') : t('auth.registerAction')}
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
              <div className="relative flex justify-center text-[10px] uppercase tracking-widest font-bold"><span className="bg-white/40 backdrop-blur-md px-4 text-slate-400">{t('auth.socialLabel')}</span></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={handleGoogleSignIn}
                className="flex items-center justify-center gap-2 py-3.5 glass border border-white/40 rounded-2xl font-bold text-slate-600 hover:bg-white/60 transition-all text-sm"
              >
                 <img src="https://www.google.com/favicon.ico" className="h-4 w-4" alt="Google" />
                 Google
              </button>
              <button className="flex items-center justify-center gap-2 py-3.5 glass border border-white/40 rounded-2xl font-bold text-slate-600 hover:bg-white/60 transition-all text-sm">
                 <Facebook className="h-4 w-4 text-blue-600 fill-blue-600" />
                 Facebook
              </button>
            </div>
          </div>
          
          <div className="mt-12 p-6 rounded-2xl bg-slate-900/5 border border-slate-900/5">
             <p className="text-[10px] text-slate-400 font-medium leading-relaxed text-center">
                {t('auth.terms1')} <span className="text-teal-600 underline">{t('auth.termsLink')}</span> {t('auth.terms2')} <span className="text-teal-600 underline">{t('auth.privacyLink')}</span>。<br />
                {t('auth.dataProtection')}
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}
