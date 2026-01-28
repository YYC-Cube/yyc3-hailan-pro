import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import { Button } from "@/app/components/design-system/Button";
import { ArrowRight, Sparkles, Heart, Activity, Smartphone } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/app/components/design-system/utils";

export function HeroSection({ mode = 'default' }: { mode?: 'default' | 'bento' }) {
  const navigate = useNavigate();
  const [emblaRef] = useEmblaCarousel({ loop: true, duration: 60 }, [
    Autoplay({ delay: 5000, stopOnInteraction: false }),
    Fade(),
  ]);

  const slides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1602583576787-f869dc4be00c?q=80&w=1600&auto=format&fit=crop",
      title: "亲密连接",
      subtitle: "用智能、私密的产品重新发现生活激情。",
      theme: "双人时光",
      link: "/category"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1754211568488-f8481375d6fb?q=80&w=1600&auto=format&fit=crop",
      title: "自我悦纳",
      subtitle: "为您的个人旅程提供高端健康探索工具。",
      theme: "自我关爱",
      link: "/category"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1758599879693-9e06f55a4ded?q=80&w=1600&auto=format&fit=crop",
      title: "智能科技",
      subtitle: "监测并改善您的亲密健康与生活质量。",
      theme: "健康监测",
      link: "/ai-assistant"
    }
  ];

  return (
    <section className={cn("relative w-full overflow-hidden bg-brand-light-grey", mode === 'bento' ? "h-full rounded-3xl" : "")}>
      <div className={cn("relative", mode === 'bento' ? "h-full min-h-[400px]" : "h-[500px] md:h-[600px] lg:h-[700px]")}>
        <div className="overflow-hidden h-full" ref={emblaRef}>
          <div className="flex h-full touch-pan-y">
            {slides.map((slide) => (
              <div key={slide.id} className="relative flex-[0_0_100%] min-w-0 h-full">
                <div 
                   className="absolute inset-0 bg-cover bg-center"
                   style={{ backgroundImage: `url(${slide.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-neutral-900/80 via-neutral-900/40 to-transparent" />
                
                <div className={cn("absolute inset-0 flex items-center", mode === 'bento' ? "p-8" : "container mx-auto px-4")}>
                   <div className={cn("text-white space-y-6", mode === 'bento' ? "max-w-lg" : "max-w-xl pl-4 md:pl-0")}>
                      <motion.div 
                         initial={{ opacity: 0, y: 20 }}
                         whileInView={{ opacity: 1, y: 0 }}
                         transition={{ duration: 0.6 }}
                      >
                         <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-sm font-medium mb-4 border border-white/20">
                            {slide.theme}
                         </span>
                         <h1 className={cn("font-bold leading-tight mb-4", mode === 'bento' ? "text-3xl lg:text-5xl" : "text-4xl md:text-6xl")}>
                            {slide.title}
                         </h1>
                         <p className={cn("text-neutral-200 mb-8 font-light", mode === 'bento' ? "text-lg" : "text-lg md:text-xl")}>
                            {slide.subtitle}
                         </p>
                         <div className="flex flex-wrap gap-4">
                            <Link to={slide.link}>
                                <Button size={mode === 'bento' ? "default" : "lg"} className="bg-brand-coral hover:bg-brand-coral/90 border-none text-white min-w-[140px] rounded-xl shadow-lg shadow-brand-coral/20">
                                   立即探索
                                </Button>
                            </Link>
                            <Link to="/ar-start">
                                <Button size={mode === 'bento' ? "default" : "lg"} variant="outline" className="border-white/50 text-white hover:bg-white/10 backdrop-blur-sm min-w-[140px] rounded-xl">
                                   <Smartphone className="w-4 h-4 mr-2" />
                                   AR 体验
                                </Button>
                            </Link>
                         </div>
                      </motion.div>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Smart Scenario Selector */}
      {mode === 'default' && (
      <div className="relative -mt-16 z-10 container mx-auto px-4 mb-16">
         <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-level-3 p-4 md:p-6 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0 border border-white/20">
            <ScenarioCard 
                icon={Heart} 
                title="双人时光" 
                desc="增进亲密互动" 
                active 
                onClick={() => navigate('/category')} 
            />
            <div className="hidden md:block w-px h-12 bg-neutral-100" />
            <ScenarioCard 
                icon={Sparkles} 
                title="自我关爱" 
                desc="探索个人愉悦" 
                onClick={() => navigate('/category')}
            />
            <div className="hidden md:block w-px h-12 bg-neutral-100" />
            <ScenarioCard 
                icon={Activity} 
                title="健康监测" 
                desc="追踪生理数据" 
                onClick={() => navigate('/ai-assistant')}
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
    onClick 
}: { 
    icon: React.ElementType, 
    title: string, 
    desc: string, 
    active?: boolean, 
    onClick?: () => void 
}) {
   return (
      <div 
        onClick={onClick}
        className={cn(
         "flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all w-full md:w-auto hover:bg-white hover:shadow-sm",
         active ? "bg-brand-deep-blue/5 border border-brand-deep-blue/10" : "border border-transparent"
      )}>
         <div className={cn(
            "p-3 rounded-full",
            active ? "bg-brand-deep-blue text-white shadow-lg shadow-brand-deep-blue/20" : "bg-neutral-100 text-neutral-500"
         )}>
            <Icon className="w-5 h-5" />
         </div>
         <div>
            <h3 className={cn("font-bold text-sm", active ? "text-brand-deep-blue" : "text-neutral-900")}>{title}</h3>
            <p className="text-xs text-neutral-500">{desc}</p>
         </div>
      </div>
   )
}
