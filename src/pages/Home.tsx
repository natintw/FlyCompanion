import { motion } from 'motion/react';
import { ArrowRight, ShieldCheck, Heart, PlaneTakeoff, Star, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export function Home() {
  const { t } = useTranslation();

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
                {t('home.hero.title1')}<br />
                <span className="italic text-primary font-normal">{t('home.hero.title2')}</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg text-slate-600 leading-relaxed">
                {t('home.hero.subtitle')}
              </p>
              
              <div className="mt-10 flex flex-wrap gap-4">
                <Link 
                  to="/create-trip"
                  className="flex items-center gap-2 rounded-full bg-secondary px-8 py-4 text-lg font-bold text-white transition-all hover:bg-orange-600 hover:scale-105 active:scale-95 shadow-lg shadow-orange-200"
                >
                   {t('home.hero.postTrip')} <ArrowRight className="h-5 w-5" />
                </Link>
                <Link 
                  to="/find-trips"
                  className="flex items-center gap-2 rounded-full glass px-8 py-4 text-lg font-bold text-slate-700 transition-all hover:bg-white/60"
                >
                  {t('home.hero.becomeEscort')}
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Trust Stats */}
        <div className="container relative z-10 mx-auto mt-20 px-4">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { label: t('home.stats.matches'), value: '1,200+' },
              { label: t('home.stats.escorts'), value: '850+' },
              { label: t('home.stats.satisfaction'), value: '4.9/5' },
              { label: t('home.stats.airports'), value: '45+' },
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
            <h2 className="font-serif text-4xl font-light text-slate-900">{t('home.solutions.title')}</h2>
            <p className="mt-4 text-slate-500 font-medium tracking-wide flex justify-center items-center gap-2">
              <span className="w-12 h-px bg-slate-200"></span> {t('home.solutions.subtitle')} <span className="w-12 h-px bg-slate-200"></span>
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
             {[
              {
                icon: <Users className="h-8 w-8 text-primary" />,
                title: t('home.solutions.teens.title'),
                desc: t('home.solutions.teens.desc')
              },
              {
                icon: <Heart className="h-8 w-8 text-primary" />,
                title: t('home.solutions.seniors.title'),
                desc: t('home.solutions.seniors.desc')
              },
              {
                icon: <PlaneTakeoff className="h-8 w-8 text-primary" />,
                title: t('home.solutions.families.title'),
                desc: t('home.solutions.families.desc')
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
                {t('home.trust.badge')}
              </div>
              <h2 className="font-serif text-4xl font-light leading-tight text-slate-900 sm:text-5xl">
                {t('home.trust.title1')}<br />
                <span className="italic">{t('home.trust.title2')}</span>
              </h2>
              
              <div className="mt-10 space-y-6">
                {[
                  { title: t('home.trust.kyc.title'), desc: t('home.trust.kyc.desc') },
                  { title: t('home.trust.escrow.title'), desc: t('home.trust.escrow.desc') },
                  { title: t('home.trust.rating.title'), desc: t('home.trust.rating.desc') },
                  { title: t('home.trust.handoff.title'), desc: t('home.trust.handoff.desc') }
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
                    <div className="font-bold text-slate-800 text-sm">{t('home.reviews.clientName')}</div>
                    <div className="flex gap-0.5">
                      {[1,2,3,4,5].map(s => <Star key={s} className="h-3 w-3 fill-yellow-400 text-yellow-400" />)}
                    </div>
                  </div>
                </div>
                <p className="mt-3 text-[13px] text-slate-500 italic leading-relaxed">
                  {t('home.reviews.content')}
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
            <h2 className="font-serif text-3xl leading-tight sm:text-4xl">{t('home.cta.title')}</h2>
            <p className="mt-6 text-slate-500 font-medium">{t('home.cta.subtitle')}</p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link to="/auth" className="rounded-full bg-primary px-8 py-4 font-bold text-white transition-all hover:bg-teal-600 shadow-lg shadow-teal-200">
                {t('home.cta.register')}
              </Link>
              <Link to="/faq" className="rounded-full glass px-8 py-4 font-bold text-slate-700 transition-all hover:bg-white/60">
                {t('home.cta.faq')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
