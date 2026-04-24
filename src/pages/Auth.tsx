import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Plane, ShieldCheck, Mail, Lock, Facebook, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';

export function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard');
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
                加入 FlyCompanion，<br />
                <span className="italic">啟程安心之旅</span>
              </h1>
              <p className="text-slate-500 font-medium leading-relaxed max-w-sm">
                不論是作為委託方，還是想成為陪伴者，您都可以在這裡找到最值得信賴的飛行夥伴。
              </p>
            </div>
            
            <div className="glass p-8 rounded-3xl border border-white/40">
               <div className="flex gap-4 items-start">
                  <div className="h-10 w-10 flex items-center justify-center shrink-0 bg-teal-100 rounded-xl text-primary">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">100% 實名認證</h4>
                    <p className="text-xs text-slate-500 mt-1 font-medium leading-relaxed">
                      我們採用最先進的護照 OCR 與活體驗證技術，確保平台上的每一位夥伴都是真實且可信賴的。
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
                isLogin ? "bg-white text-teal-800 shadow-xl" : "text-slate-400 hover:text-slate-300"
              )}
            >
              登入
            </button>
            <button 
              onClick={() => setIsLogin(false)}
              className={cn(
                "px-8 py-2.5 text-xs font-bold rounded-xl transition-all uppercase tracking-widest",
                !isLogin ? "bg-white text-teal-800 shadow-xl" : "text-slate-400 hover:text-slate-300"
              )}
            >
              註冊
            </button>
          </div>

          <div className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-slate-800 tracking-tight">
                {isLogin ? '歡迎回來' : '建立您的帳號'}
              </h2>
              <p className="text-sm text-slate-500 font-medium">
                {isLogin ? '請使用您的帳號資訊登入平台' : '只需幾分鐘，即可開啟您的陪伴旅程'}
              </p>
            </div>

            <form onSubmit={handleAuth} className="space-y-8">
              <div className="space-y-5">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">電子郵件</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input type="email" required placeholder="example@email.com" className="w-full pl-12 pr-5 py-4 glass border border-white/40 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none font-medium" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">密碼</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input type="password" required placeholder="••••••••" className="w-full pl-12 pr-5 py-4 glass border border-white/40 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none font-medium" />
                  </div>
                </div>
                
                {isLogin && (
                  <div className="flex justify-end">
                    <button className="text-xs font-bold text-teal-600 hover:underline">忘記密碼？</button>
                  </div>
                )}
              </div>

              <button type="submit" className="w-full py-4.5 bg-slate-900 text-white font-bold rounded-2xl hover:bg-primary transition-all shadow-xl hover:shadow-teal-100 flex items-center justify-center gap-2 group">
                {isLogin ? '登入帳號' : '註冊帳號'}
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
              <div className="relative flex justify-center text-[10px] uppercase tracking-widest font-bold"><span className="bg-white/40 backdrop-blur-md px-4 text-slate-400">或使用社交帳號</span></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-2 py-3.5 glass border border-white/40 rounded-2xl font-bold text-slate-600 hover:bg-white/60 transition-all text-sm">
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
                註冊即代表您同意我們的 <span className="text-teal-600 underline">服務條款</span> 與 <span className="text-teal-600 underline">隱私權政策</span>。<br />
                所有個人資料均受到系統最高等級加密保護。
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}
