import { Link } from 'react-router-dom';
import { Plane, Facebook, Instagram, Mail } from 'lucide-react';

export function Footer() {
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
                FlyCompanion <span className="font-normal text-teal-600/80 italic">飛行陪伴</span>
              </span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-slate-500">
              讓每一段旅程都有人陪伴，讓每一份擔心都能放下。專業的飛行陪伴媒合平台。
            </p>
            <div className="flex gap-4">
              <Facebook className="h-5 w-5 cursor-pointer hover:text-primary transition-colors text-slate-400" />
              <Instagram className="h-5 w-5 cursor-pointer hover:text-primary transition-colors text-slate-400" />
              <Mail className="h-5 w-5 cursor-pointer hover:text-primary transition-colors text-slate-400" />
            </div>
          </div>
          
          <div>
            <h3 className="mb-4 font-bold text-slate-800">服務內容</h3>
            <ul className="flex flex-col gap-2 text-sm text-slate-500">
              <li className="hover:text-primary transition-colors cursor-pointer">陪同青少年飛行</li>
              <li className="hover:text-primary transition-colors cursor-pointer">長輩旅途照護</li>
              <li className="hover:text-primary transition-colors cursor-pointer">家庭飛行支援</li>
              <li className="hover:text-primary transition-colors cursor-pointer">跨國接機交接</li>
            </ul>
          </div>
          
          <div>
            <h3 className="mb-4 font-bold text-slate-800">平台規範</h3>
            <ul className="flex flex-col gap-2 text-sm text-slate-500">
              <li className="hover:text-primary transition-colors cursor-pointer">服務條款</li>
              <li className="hover:text-primary transition-colors cursor-pointer">隱私權政策</li>
              <li className="hover:text-primary transition-colors cursor-pointer">KYC 認證流程</li>
              <li className="hover:text-primary transition-colors cursor-pointer">退款政策</li>
            </ul>
          </div>
          
          <div>
            <h3 className="mb-4 font-bold text-slate-800">聯絡我們</h3>
            <p className="text-sm text-slate-500">
              有任何問題或建議？<br />
              歡迎通過電子郵件與我們聯繫。
            </p>
            <div className="mt-4 rounded-lg bg-white/40 p-4 border border-white/20">
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">客服時段</p>
              <p className="text-sm font-semibold text-slate-700">週一至週五 09:00 - 18:00</p>
            </div>
          </div>
        </div>
        
        <div className="mt-16 border-t border-slate-200 pt-8 text-center text-xs text-slate-400">
          <p>© 2026 FlyCompanion 飛行陪伴平台. All rights reserved. 繁體中文 v1.0</p>
        </div>
      </div>
    </footer>
  );
}
