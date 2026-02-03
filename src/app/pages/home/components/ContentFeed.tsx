import React from "react";
import { Button } from "@/app/components/design-system/Button";
import { Badge } from "@/app/components/design-system/Badge";
import { ArrowRight, MessageCircle, User } from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { Link } from "@/app/components/router";
import healthJournalCover from "figma:asset/dc7a582554e92e0a825af0c5353f663cac1892ad.png";

export function ContentFeed() {
  return (
    <section className="container mx-auto px-4 py-12 mb-12">
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
        {/* Main Featured Article */}
        <Link to="/community/post/1" className="lg:col-span-2 group cursor-pointer">
           <div className="relative rounded-2xl overflow-hidden aspect-[16/9] mb-4">
              <ImageWithFallback 
                 src={healthJournalCover}
                 alt="健康生活方式"
                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 via-transparent to-transparent flex flex-col justify-end p-6 md:p-8">
                 <Badge variant="secondary" className="self-start mb-3 bg-brand-gold text-neutral-900 border-none">专家建议</Badge>
                 <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">亲密科学：了解您的真实需求</h3>
                 <p className="text-neutral-200 line-clamp-2 md:line-clamp-none">
                    探索现代心理学和生物节律如何影响您的亲密健康。陈莎拉博士为您深度解析身心连接。
                 </p>
              </div>
           </div>
        </Link>

        {/* Sidebar Feed */}
        <div className="space-y-6">
           <ArticleCard 
              id="2"
              category="社区"
              title="向伴侣介绍智能器具的 5 种温馨方法"
              meta="2千阅读 • 15条评论"
              imageUrl="https://images.unsplash.com/photo-1516307362420-332053641f6e?q=80&w=400&auto=format&fit=crop"
           />
           <ArticleCard 
              id="3"
              category="健康"
              title="盆底健康：适合所有人的日常锻炼指南"
              meta="5分钟阅读 • A. Smith博士"
              imageUrl="https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=400&auto=format&fit=crop"
           />
           <ArticleCard 
              id="4"
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