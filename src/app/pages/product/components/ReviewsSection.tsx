import React, { useState } from "react";
import { MOCK_REVIEWS } from "@/app/data/mockData";
import { Star, MessageCircle, HelpCircle, Shield, Image as ImageIcon, Send } from "lucide-react";
import { Button } from "@/app/components/design-system/Button";
import { Progress } from "@/app/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { Badge } from "@/app/components/ui/badge";
import { Textarea } from "@/app/components/ui/textarea";
import { toast } from "sonner";
import { GlassCard, InteractiveListItem } from "@/app/components/design-system/GlassCard";
import { cn } from "@/app/components/design-system/utils";

interface ReviewsSectionProps {
  productId: string;
}

export function ReviewsSection({ productId }: ReviewsSectionProps) {
  // In a real app, we would filter reviews by productId
  const reviews = MOCK_REVIEWS; 
  const [activeTab, setActiveTab] = useState("reviews");
  const [question, setQuestion] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
        setIsSubmitting(false);
        setQuestion("");
        toast.success("问题已匿名提交。如有回复，我们将通知您。");
    }, 1500);
  };

  const getDimensionLabel = (key: string) => {
    switch (key) {
      case 'comfort': return '舒适度';
      case 'quality': return '质量';
      case 'privacy': return '隐私';
      case 'effect': return '效果';
      default: return key;
    }
  };

  return (
    <GlassCard className="p-6 md:p-8" id="reviews" hoverEffect={false}>
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl font-bold text-neutral-900">用户评价</h3>
        <div className="flex gap-2">
            <Badge variant="outline" className="gap-1 border-emerald-200 text-emerald-700 bg-emerald-50">
                <Shield className="w-3 h-3" /> 认证买家
            </Badge>
        </div>
      </div>

      <Tabs defaultValue="reviews" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-sm mb-8 bg-neutral-100/80 p-1 rounded-xl">
          <TabsTrigger value="reviews" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-brand-deep-blue data-[state=active]:shadow-sm">评价 ({reviews.length})</TabsTrigger>
          <TabsTrigger value="qa" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-brand-deep-blue data-[state=active]:shadow-sm">问答 (0)</TabsTrigger>
        </TabsList>

        <TabsContent value="reviews" className="space-y-8">
          {/* Summary */}
          <div className="bg-neutral-50/50 rounded-2xl p-6 grid md:grid-cols-2 gap-8 border border-neutral-100">
             <div className="flex flex-col items-center justify-center border-r border-neutral-200 pr-8">
                <div className="text-6xl font-bold text-neutral-900 tracking-tighter">4.8</div>
                <div className="flex items-center gap-1 my-3">
                    {[1,2,3,4,5].map(s => <Star key={s} className="w-5 h-5 fill-brand-gold text-brand-gold" />)}
                </div>
                <p className="text-sm text-neutral-500">基于 {reviews.length} 条评价</p>
             </div>
             <div className="space-y-4">
                {[
                  { label: '舒适度', val: 95, score: 4.9 },
                  { label: '质量', val: 98, score: 5.0 },
                  { label: '效果', val: 88, score: 4.6 },
                  { label: '隐私', val: 100, score: 5.0 },
                ].map((item) => (
                   <div key={item.label} className="grid grid-cols-[80px_1fr_40px] items-center gap-4 text-sm">
                      <span className="text-neutral-600 font-medium">{item.label}</span>
                      <Progress value={item.val} className="h-2 bg-neutral-200" />
                      <span className="text-right font-bold text-neutral-900">{item.score}</span>
                   </div>
                ))}
             </div>
          </div>

          {/* List */}
          <div className="space-y-4">
            {reviews.map((review) => (
               <InteractiveListItem key={review.id} className="flex-col items-start gap-4 p-6 bg-white border-neutral-100 shadow-sm cursor-default hover:bg-white">
                  <div className="w-full flex items-center justify-between">
                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-500 font-bold text-sm">
                            {review.author.charAt(0)}
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="font-bold text-neutral-900">{review.author}</span>
                                <Badge variant="secondary" className="text-[10px] h-5 px-1.5 bg-green-50 text-green-700 border-green-100">
                                   <Shield className="w-2.5 h-2.5 mr-0.5" /> Verified
                                </Badge>
                            </div>
                            <div className="text-xs text-neutral-400">{review.date}</div>
                        </div>
                     </div>
                     <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                           <Star key={i} className={cn("w-4 h-4", i < review.rating ? "fill-brand-gold text-brand-gold" : "text-neutral-200")} />
                        ))}
                     </div>
                  </div>
                  
                  <p className="text-neutral-600 text-sm leading-relaxed">{review.content}</p>
                  
                  {/* Mock Rating Dimensions per review */}
                  {review.dimensions && (
                     <div className="flex flex-wrap gap-2">
                        {Object.entries(review.dimensions).map(([key, val]) => (
                           <div key={key} className="inline-flex items-center gap-1 px-2 py-1 bg-neutral-50 rounded text-[10px] text-neutral-500 border border-neutral-100 uppercase tracking-wide">
                              <span className="font-semibold">{getDimensionLabel(key)}</span>
                              <span className="text-neutral-900">{val}/5</span>
                           </div>
                        ))}
                     </div>
                  )}

                  <div className="flex gap-2 pt-2">
                     <Button variant="ghost" size="sm" className="h-8 text-xs text-neutral-400 hover:text-neutral-900 px-2">
                        <HelpCircle className="w-3.5 h-3.5 mr-1.5" /> Helpful
                     </Button>
                  </div>
               </InteractiveListItem>
            ))}
          </div>

          <div className="text-center pt-4">
             <Button variant="outline" className="w-full md:w-auto">加载更多评价</Button>
          </div>
        </TabsContent>

        <TabsContent value="qa">
            <div className="space-y-6">
                <div className="bg-neutral-50 rounded-2xl p-6 border border-neutral-200">
                    <h4 className="font-bold text-neutral-900 mb-4 flex items-center gap-2">
                        <HelpCircle className="w-5 h-5 text-neutral-400" />
                        提出问题
                    </h4>
                    <form onSubmit={handleQuestionSubmit} className="space-y-4">
                        <Textarea 
                            placeholder="匿名询问关于此商品的问题..." 
                            className="bg-white resize-none border-neutral-200 focus:ring-brand-deep-blue"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                        />
                        <div className="flex justify-between items-center">
                            <span className="text-xs text-neutral-400 flex items-center gap-1">
                                <Shield className="w-3 h-3" /> 您的身份受保护
                            </span>
                            <Button type="submit" disabled={isSubmitting || !question.trim()}>
                                {isSubmitting ? "发送中..." : "提交问题"}
                            </Button>
                        </div>
                    </form>
                </div>
                
                <div className="text-center py-8">
                    <p className="text-neutral-500 mb-2">暂无提问。</p>
                    <p className="text-sm text-neutral-400">成为第一个匿名提问的人。</p>
                </div>
            </div>
        </TabsContent>
      </Tabs>
    </GlassCard>
  );
}
