import { motion } from 'motion/react';
import { ArrowRight, ShieldCheck, Heart, PlaneTakeoff, Star, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 lg:py-32">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/seed/flight/1920/1080?blur=4" 
            alt="Hero Background" 
            className="h-full w-full object-cover opacity-20"
            referrerPolicy="no-referrer"
          />
        </div>
        
        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="font-serif text-5xl leading-tight font-light sm:text-6xl lg:text-7xl text-slate-900">
                讓每一段旅程都有人陪伴，<br />
                <span className="italic text-primary font-normal">讓每一份擔心都能放下</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg text-slate-600 leading-relaxed">
                全台首個專為飛行旅途打造的陪伴媒合平台。不論是孩子獨自搭機探親，還是長輩出國探望子女，我們為您媒合同班機的可靠陪伴者。
              </p>
              
              <div className="mt-10 flex flex-wrap gap-4">
                <Link 
                  to="/create-trip"
                  className="flex items-center gap-2 rounded-full bg-secondary px-8 py-4 text-lg font-bold text-white transition-all hover:bg-orange-600 hover:scale-105 active:scale-95 shadow-lg shadow-orange-200"
                >
                  發布陪伴需求 <ArrowRight className="h-5 w-5" />
                </Link>
                <Link 
                  to="/find-trips"
                  className="flex items-center gap-2 rounded-full glass px-8 py-4 text-lg font-bold text-slate-700 transition-all hover:bg-white/60"
                >
                  成為陪伴者
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Trust Stats */}
        <div className="container relative z-10 mx-auto mt-20 px-4">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { label: '成功媒合', value: '1,200+' },
              { label: '專業陪伴者', value: '850+' },
              { label: '滿意度', value: '4.9/5' },
              { label: '合作機場', value: '45+' },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * i }}
                className="flex flex-col"
              >
                <span className="text-3xl font-bold text-teal-700">{stat.value}</span>
                <span className="text-xs text-slate-400 uppercase tracking-widest font-bold">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions / Pain Points */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="font-serif text-4xl font-light text-slate-900">服務適用對象</h2>
            <p className="mt-4 text-slate-500 font-medium tracking-wide flex justify-center items-center gap-2">
              <span className="w-12 h-px bg-slate-200"></span> 解決飛行中的照顧難題 <span className="w-12 h-px bg-slate-200"></span>
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                icon: <Users className="h-8 w-8 text-primary" />,
                title: "獨自搭機的青少年",
                desc: "航空公司 UM 服務有限？為孩子媒合一位溫暖的陪伴者，全程照護更安心。"
              },
              {
                icon: <Heart className="h-8 w-8 text-primary" />,
                title: "出國探親的長輩",
                desc: "語言不通、不熟悉轉機？讓經驗豐富的常飛旅客帶領您的父母順利抵達目的地。"
              },
              {
                icon: <PlaneTakeoff className="h-8 w-8 text-primary" />,
                title: "需要支援的家庭",
                desc: "帶多個幼兒感到手忙腳亂？額外的一雙手讓旅途壓力減半。"
              }
            ].map((item, i) => (
              <div key={i} className="group glass rounded-3xl p-8 transition-all hover:bg-white/80 hover:shadow-xl hover:-translate-y-1">
                <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white/60 shadow-sm border border-white/40 group-hover:bg-primary group-hover:text-white transition-colors">
                  {item.icon}
                </div>
                <h3 className="mb-4 text-xl font-bold text-slate-800">{item.title}</h3>
                <p className="text-slate-500 leading-relaxed text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features / Trust */}
      <section className="py-24 overflow-hidden relative">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center gap-16 lg:flex-row">
            <div className="lg:w-1/2">
              <div className="mb-8 inline-block rounded-full bg-teal-100 px-4 py-1.5 text-[10px] font-bold text-teal-700 uppercase tracking-widest">
                安全與信任
              </div>
              <h2 className="font-serif text-4xl font-light leading-tight text-slate-900 sm:text-5xl">
                我們建立了一套<br />
                <span className="italic">最嚴謹的信任體系</span>
              </h2>
              
              <div className="mt-10 space-y-6">
                {[
                  { title: "KYC 完整實名驗證", desc: "所有用戶需經過護照 OCR 比對與 Liveness 活體人臉檢測。" },
                  { title: "Escrow 資金代管", desc: "配對成後撥款，確保雙方權益，旅程結束確認無誤才撥款給陪伴者。" },
                  { title: "雙向評分系統", desc: "詳細的過往旅程評價與星級，協助您篩選最合適的夥伴。" },
                  { title: "即時交接打卡", desc: "機場 QR Code 交接紀錄 GPS 與時間，系統即時推播狀態給委託方。" }
                ].map((feature, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-teal-200">
                      <ShieldCheck className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 tracking-tight">{feature.title}</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative lg:w-1/2">
              <div className="relative z-10 glass-dark p-3 rounded-[2.5rem]">
                <img 
                  src="https://picsum.photos/seed/care/800/1000" 
                  alt="Feature Visual" 
                  className="aspect-[4/5] w-full object-cover rounded-[2rem]"
                  referrerPolicy="no-referrer"
                />
              </div>
              {/* Floating review card */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-8 -left-8 z-20 w-72 glass p-6 rounded-2xl"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-slate-200 border border-white" />
                  <div>
                    <div className="font-bold text-slate-800 text-sm">王小姐</div>
                    <div className="flex gap-0.5">
                      {[1,2,3,4,5].map(s => <Star key={s} className="h-3 w-3 fill-yellow-400 text-yellow-400" />)}
                    </div>
                  </div>
                </div>
                <p className="mt-3 text-[13px] text-slate-500 italic leading-relaxed">
                  "非常感謝陪伴者林先生。他非常細心地照顧我 75 歲的母親從台北飛往倫敦，甚至在轉機時全程協助。"
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-24">
        <div className="container mx-auto px-4 text-center">
          <div className="mx-auto max-w-3xl glass-dark p-12 text-slate-800">
            <h2 className="font-serif text-3xl leading-tight sm:text-4xl">準備好開始您的下一段安心旅程嗎？</h2>
            <p className="mt-6 text-slate-500 font-medium">現在加入，建立專屬的陪伴請求，或成為他人旅途中的溫柔力量。</p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link to="/auth" className="rounded-full bg-primary px-8 py-4 font-bold text-white transition-all hover:bg-teal-600 shadow-lg shadow-teal-200">
                立即註冊帳號
              </Link>
              <Link to="/faq" className="rounded-full glass px-8 py-4 font-bold text-slate-700 transition-all hover:bg-white/60">
                查看常見問題
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
