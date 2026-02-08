import React from "react";
import { Button } from "@/app/components/design-system/Button";
import { Badge } from "@/app/components/design-system/Badge";
import { ArrowRight, MessageCircle, User } from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { Link } from "@/app/components/router";
import Slider from "react-slick";

// Carousel images
const coverImg1 = '/placeholder.svg?height=600&width=900';
const coverImg2 = '/placeholder.svg?height=600&width=900';
const coverImg3 = '/placeholder.svg?height=600&width=900';
const coverImg4 = '/placeholder.svg?height=600&width=900';

// Custom Minimal Slick Styles
const SlickStyles = () => (
  <style>{`
    .slick-slider { position: relative; display: block; box-sizing: border-box; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; -webkit-touch-callout: none; -khtml-user-select: none; -ms-touch-action: pan-y; touch-action: pan-y; -webkit-tap-highlight-color: transparent; }
    .slick-list { position: relative; display: block; overflow: hidden; margin: 0; padding: 0; }
    .slick-list:focus { outline: none; }
    .slick-list.dragging { cursor: pointer; cursor: hand; }
    .slick-slider .slick-track, .slick-slider .slick-list { -webkit-transform: translate3d(0, 0, 0); -moz-transform: translate3d(0, 0, 0); -ms-transform: translate3d(0, 0, 0); -o-transform: translate3d(0, 0, 0); transform: translate3d(0, 0, 0); }
    .slick-track { position: relative; top: 0; left: 0; display: block; margin-left: auto; margin-right: auto; }
    .slick-track:before, .slick-track:after { display: table; content: ''; }
    .slick-track:after { clear: both; }
    .slick-loading .slick-track { visibility: hidden; }
    .slick-slide { display: none; float: left; height: 100%; min-height: 1px; }
    [dir='rtl'] .slick-slide { float: right; }
    .slick-slide img { display: block; }
    .slick-slide.slick-loading img { display: none; }
    .slick-slide.dragging img { pointer-events: none; }
    .slick-initialized .slick-slide { display: block; }
    .slick-loading .slick-slide { visibility: hidden; }
    .slick-vertical .slick-slide { display: block; height: auto; border: 1px solid transparent; }
    .slick-arrow.slick-hidden { display: none; }
    
    /* Dots Styling - Adjusted for bottom right placement */
    .slick-dots { position: absolute; bottom: 20px; right: 24px; display: block !important; width: auto; padding: 0; margin: 0; list-style: none; text-align: right; z-index: 30; }
    .slick-dots li { position: relative; display: inline-block; width: 8px; height: 8px; margin: 0 4px; padding: 0; cursor: pointer; }
    .slick-dots li button { font-size: 0; line-height: 0; display: block; width: 8px; height: 8px; padding: 5px; cursor: pointer; color: transparent; border: 0; outline: none; background: transparent; }
    .slick-dots li button:before { position: absolute; top: 0; left: 0; width: 8px; height: 8px; content: ''; background: white; opacity: 0.4; border-radius: 50%; transition: all 0.3s ease; box-shadow: 0 1px 3px rgba(0,0,0,0.2); }
    .slick-dots li.slick-active button:before { opacity: 1; transform: scale(1.25); background: #ffffff; }
  `}</style>
);

const CAROUSEL_ITEMS = [
  {
    id: "1",
    image: coverImg1,
    category: "专家建议",
    title: "亲密科学：了解您的真实需求",
    description: "探索现代心理学和生物节律如何影响您的亲密健康。陈莎拉博士为您深度解析身心连接。"
  },
  {
    id: "2",
    image: coverImg2,
    category: "职场健康",
    title: "职场健康：在压力中寻找平衡",
    description: "如何在快节奏的工作环境中保持身心愉悦？了解高效能人士的健康管理秘诀。"
  },
  {
    id: "3",
    image: coverImg3,
    category: "护眼指南",
    title: "视力与专注：数字时代的护眼指南",
    description: "长时间面对屏幕？专家教您五分钟眼部放松操，即刻缓解视疲劳，提升专注力。"
  },
  {
    id: "4",
    image: coverImg4,
    category: "心理能量",
    title: "自信穿搭：提升心理能量的秘诀",
    description: "外在形象如何影响内在状态？心理学家揭示服装色彩与心理能量的微妙关系。"
  }
];

export function ContentFeed() {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    fade: true, // Use fade effect for smoother transitions on hero images
  };

  return (
    <section className="container mx-auto px-4 py-12 mb-12">
      <SlickStyles />
      <div className="flex justify-between items-end mb-8">
        <div>
           <h2 className="text-2xl md:text-3xl font-bold text-neutral-900">健康日志</h2>
           <p className="text-neutral-500 mt-1">专家见解与社区故事，探索身心健康。</p>
        </div>
        <Link to="/community">
            <Button variant="ghost" className="hidden md:flex items-center gap-2 group">
               查看更多 <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Featured Carousel */}
        <div className="lg:col-span-2 relative rounded-2xl overflow-hidden shadow-sm aspect-[16/9] md:aspect-[16/9]">
           <Slider {...sliderSettings} className="h-full">
             {CAROUSEL_ITEMS.map((item) => (
               <Link key={item.id} to={`/community/post/${item.id}`} className="block h-full relative outline-none cursor-pointer group">
                  <div className="relative w-full h-full">
                    <ImageWithFallback 
                       src={item.image}
                       alt={item.title}
                       className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-transparent to-transparent opacity-90" />
                    
                    {/* Content Overlay */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                       <Badge variant="secondary" className="self-start mb-3 bg-brand-gold text-neutral-900 border-none">
                         {item.category}
                       </Badge>
                       <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight">
                         {item.title}
                       </h3>
                       <p className="text-neutral-200 line-clamp-2 md:line-clamp-none max-w-2xl">
                          {item.description}
                       </p>
                    </div>
                  </div>
               </Link>
             ))}
           </Slider>
        </div>

        {/* Sidebar Feed */}
        <div className="space-y-6">
           <ArticleCard 
              id="sidebar-1"
              category="社区"
              title="向伴侣介绍智能器具的 5 种温馨方法"
              meta="2千阅读 • 15条评论"
              imageUrl="https://images.unsplash.com/photo-1516307362420-332053641f6e?q=80&w=400&auto=format&fit=crop"
           />
           <ArticleCard 
              id="sidebar-2"
              category="健康"
              title="盆底健康：适合所有人的日常锻炼指南"
              meta="5分钟阅读 • A. Smith博士"
              imageUrl="https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=400&auto=format&fit=crop"
           />
           <ArticleCard 
              id="sidebar-3"
              category="指南"
              title="选择您的第一个智能设备：全面隐私保护指南"
              meta="昨日更新"
              imageUrl="https://images.unsplash.com/photo-1555664424-778a1e5e1b48?q=80&w=400&auto=format&fit=crop"
           />

           <div className="bg-brand-deep-blue/5 rounded-xl p-6 border border-brand-deep-blue/10">
              <h4 className="font-bold text-brand-deep-blue mb-2">加入讨论</h4>
              <p className="text-sm text-neutral-600 mb-4">匿名、专业且支持性的社区讨论空间。</p>
              <Link to="/community">
                <Button className="w-full bg-brand-deep-blue text-white hover:bg-brand-deep-blue/90">访问论坛</Button>
              </Link>
           </div>
        </div>
      </div>
      
      <Link to="/community" className="md:hidden">
        <Button variant="ghost" className="w-full mt-6 flex items-center justify-center gap-2">
           查看更多 <ArrowRight className="w-4 h-4" />
        </Button>
      </Link>
    </section>
  );
}

function ArticleCard({ id, category, title, meta, imageUrl }: { id: string, category: string, title: string, meta: string, imageUrl?: string }) {
   return (
      <Link to={`/community/post/${id}`} className="flex gap-4 group cursor-pointer">
         <div className="w-24 h-24 rounded-lg bg-neutral-100 overflow-hidden flex-shrink-0 border border-neutral-100">
             {imageUrl ? (
                <ImageWithFallback 
                    src={imageUrl} 
                    alt={title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
             ) : (
                <div className="w-full h-full bg-neutral-200 group-hover:bg-neutral-300 transition-colors flex items-center justify-center text-neutral-500">
                   <MessageCircle className="w-6 h-6" />
                </div>
             )}
         </div>
         <div className="flex-1 flex flex-col justify-center">
            <span className="text-xs font-bold text-brand-coral uppercase tracking-wide mb-1">{category}</span>
            <h4 className="font-bold text-neutral-900 leading-tight mb-2 group-hover:text-brand-deep-blue transition-colors line-clamp-2">{title}</h4>
            <span className="text-xs text-neutral-500">{meta}</span>
         </div>
      </Link>
   )
}
