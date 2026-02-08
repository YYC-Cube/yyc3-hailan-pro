import React from "react";
import { useNavigate } from "react-router";
import { Link } from "@/app/components/router";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import { Button } from "@/app/components/design-system/Button";
import { ArrowRight, Sparkles, HeartPulse, Rocket, Brain, Smartphone } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/app/components/design-system/utils";

// Import new carousel images
import heroImage1 from "figma:asset/70409da34b464d402098af51d5fab5e6a9b62aa7.png";
import heroImage2 from "figma:asset/fb622a139e37bc3f5ee05674f9961e914f56bcea.png";
import heroImage3 from "figma:asset/829f2e79b33973d02644b738c9257498e6083d55.png";
import heroImage4 from "figma:asset/dc7a582554e92e0a825af0c5353f663cac1892ad.png";

export function HeroSection({ mode = 'default' }: { mode?: 'default' | 'bento' }) {
  const navigate = useNavigate();
  const [emblaRef] = useEmblaCarousel({ loop: true, duration: 60 }, [
    Autoplay({ delay: 5000, stopOnInteraction: false }),
    Fade(),
  ]);

  const slides = [
    {
      id: 1,
      image: heroImage1,
      title: "身心关爱 · CARE",
      subtitle: "从身体护理到盆底健康，为您提供多维度的专业关爱。",
      theme: "CARE 系列",
      link: "/category?main=CARE",
      accent: "from-emerald-500/80 to-transparent"
    },
    {
      id: 2,
      image: heroImage2,
      title: "愉悦探索 · PLAY",
      subtitle: "激发灵感，建立深度连接，开启私密生活的无限可能。",
      theme: "PLAY 系列",
      link: "/category?main=PLAY",
      accent: "from-rose-500/80 to-transparent"
    },
    {
      id: 3,
      image: heroImage3,
      title: "智感科技 · SMART",
      subtitle: "AI 智能推荐与实时生物反馈，让每一刻都更加精准懂你。",
      theme: "SMART 系列",
      link: "/category?main=SMART",
      accent: "from-blue-500/80 to-transparent"
    },
    {
      id: 4,
      image: heroImage4,
      title: "海蓝之谜 · 探索",
      subtitle: "专业品质与隐私保护，开启您的健康管理新体验。",
      theme: "精选系列",
      link: "/category",
      accent: "from-brand-hailan-blue/80 to-transparent"
    }
  ];

  return (
    <section className={cn("relative w-full overflow-hidden bg-brand-navy", mode === 'bento' ? "h-full rounded-[2.5rem]" : "")}>
      <div className={cn("relative", mode === 'bento' ? "h-full min-h-[500px]" : "h-[600px] md:h-[700px] lg:h-[800px]")}>
        <div className="overflow-hidden h-full" ref={emblaRef}>
          <div className="flex h-full touch-pan-y">
            {slides.map((slide) => (
              <div key={slide.id} className="relative flex-[0_0_100%] min-w-0 h-full">
                <div 
                   className="absolute inset-0 bg-cover bg-center"
                   style={{ backgroundImage: `url(${slide.image})` }}
                />
                <div className={`absolute inset-0 bg-gradient-to-r ${slide.accent} via-brand-navy/40 to-transparent opacity-80`} />
                <div className="absolute inset-0 bg-brand-navy/20" />
                
                <div className={cn("absolute inset-0 flex items-center", mode === 'bento' ? "p-12" : "container mx-auto px-6")}>
                   <div className={cn("text-white space-y-8", mode === 'bento' ? "max-w-xl" : "max-w-2xl pl-4 md:pl-0")}>
                       <div className="animate-fadeIn">
                         <div className="flex items-center gap-3 mb-6">
                            <span className="inline-block px-4 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-black tracking-widest uppercase border border-white/20">
                                {slide.theme}
                            </span>
                         </div>
                         <h1 className={cn("font-bold leading-[1.2] mb-6 tracking-tight", mode === 'bento' ? "text-4xl lg:text-6xl" : "text-5xl md:text-7xl lg:text-8xl")}>
                            {slide.title.split(' · ').map((part, i) => (
                              <span key={i} className="inline-block">
                                {i > 0 && <span className="mx-2 opacity-50">·</span>}
                                <span className={cn(i > 0 && "text-white/40 font-light block md:inline mt-2 md:mt-0")}>{part}</span>
                              </span>
                            ))}
                         </h1>
                         <p className={cn("text-white/80 mb-10 font-medium leading-relaxed", mode === 'bento' ? "text-lg" : "text-xl md:text-2xl")}>
                            {slide.subtitle}
                         </p>
                         <div className="flex flex-wrap gap-5">
                            <Link to={slide.link}>
                                <Button size="lg" className="bg-white text-brand-hailan-blue hover:bg-neutral-100 border-none min-w-[180px] rounded-2xl shadow-2xl font-bold h-14">
                                   立即探索
                                </Button>
                            </Link>
                            <Link to="/ar-start">
                                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 backdrop-blur-md min-w-[180px] rounded-2xl h-14 font-bold">
                                   <Smartphone className="w-5 h-4 mr-2" />
                                   AR 沉浸体验
                                </Button>
                            </Link>
                         </div>
                       </div>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Logic Selector - CARE, PLAY, SMART */}
      {mode === 'default' && (
      <div className="relative -mt-24 z-10 container mx-auto px-6 mb-24">
         <div className="bg-white/80 backdrop-blur-2xl rounded-[2rem] shadow-2xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-stretch gap-6 border border-white/30">
            <ScenarioCard 
                icon={HeartPulse} 
                title="CARE 身心关爱" 
                desc="专注长期健康与恢复" 
                active 
                onClick={() => navigate('/category?main=CARE')} 
                activeColor="text-emerald-500"
                activeBg="bg-emerald-50"
            />
            <div className="hidden md:block w-px h-16 bg-neutral-100" />
            <ScenarioCard 
                icon={Rocket} 
                title="PLAY 愉悦探索" 
                desc="释放灵感与深度连接" 
                onClick={() => navigate('/category?main=PLAY')}
                activeColor="text-rose-500"
                activeBg="bg-rose-50"
            />
            <div className="hidden md:block w-px h-16 bg-neutral-100" />
            <ScenarioCard 
                icon={Brain} 
                title="SMART 智感科技" 
                desc="实时数据与 AI 指导" 
                onClick={() => navigate('/category?main=SMART')}
                activeColor="text-blue-500"
                activeBg="bg-blue-50"
            />
         </div>
      </div>
      )}
    </section>
  );
}

function ScenarioCard({ 
    icon: Icon, 
    title, 
    desc, 
    active, 
    onClick,
    activeColor = "text-brand-hailan-blue",
    activeBg = "bg-brand-hailan-blue/5"
}: { 
    icon: React.ElementType, 
    title: string, 
    desc: string, 
    active?: boolean, 
    onClick?: () => void,
    activeColor?: string,
    activeBg?: string
}) {
   return (
      <div 
        onClick={onClick}
        className={cn(
         "flex items-center gap-5 p-5 rounded-2xl cursor-pointer transition-all flex-1 hover:scale-[1.02] hover:-translate-y-1 active:scale-[0.98]",
         active ? `${activeBg} border border-white shadow-sm` : "border border-transparent hover:bg-neutral-50"
      )}>
         <div className={cn(
            "w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500",
            active ? `bg-white shadow-lg ${activeColor}` : "bg-neutral-100 text-neutral-400"
         )}>
            <Icon className="w-7 h-7" strokeWidth={1.5} />
         </div>
         <div>
            <h3 className={cn("font-bold text-base mb-1", active ? "text-neutral-900" : "text-neutral-500")}>{title}</h3>
            <p className="text-sm text-neutral-400 font-medium">{desc}</p>
         </div>
         <ArrowRight className={cn("ml-auto w-5 h-5 transition-transform group-hover:translate-x-1", active ? activeColor : "text-neutral-200")} />
      </div>
   )
}