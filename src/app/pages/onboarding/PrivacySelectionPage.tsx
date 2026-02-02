import React from "react";
import { Button } from "@/app/components/design-system/Button";
import { GlassCard, InteractiveListItem } from "@/app/components/design-system/GlassCard";
import { Eye, Cloud, Lock, Check, Shield } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/app/components/design-system/utils";

interface PrivacyOption {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  level: 1 | 2 | 3;
  color: string;
  bg: string;
}

interface PrivacySelectionPageProps {
  onSelect: (mode: string) => void;
  onBack: () => void;
}

export function PrivacySelectionPage({ onSelect, onBack }: PrivacySelectionPageProps) {
  const options: PrivacyOption[] = [
    {
      id: "visitor",
      title: "访客模式",
      description: "临时浏览，本地不存储任何数据。退出即销毁浏览记录，无需注册。",
      icon: Eye,
      level: 1,
      color: "text-blue-500",
      bg: "bg-blue-50",
    },
    {
      id: "cloud",
      title: "标准云端账户",
      description: "跨设备同步偏好与收藏。数据加密存储于云端，支持 PWA 离线功能。",
      icon: Cloud,
      level: 2,
      color: "text-brand-deep-blue",
      bg: "bg-brand-deep-blue/5",
    },
    {
      id: "stealth",
      title: "隐私极客模式",
      description: "端到端加密，支持生物识别锁。本地存储关键数据，伪装应用图标与通知。",
      icon: Lock,
      level: 3,
      color: "text-emerald-500",
      bg: "bg-emerald-50",
    }
  ];

  const [selectedId, setSelectedId] = React.useState("cloud");

  return (
    <div className="min-h-screen bg-brand-light-grey flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-xl w-full"
      >
        <div className="text-center mb-8">
           <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-sm mb-4">
              <Shield className="w-8 h-8 text-brand-deep-blue" />
           </div>
           <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-2">选择您的隐私偏好</h1>
           <p className="text-neutral-500">海蓝致力于保护您的数字足迹。您可以随时在设置中更改此项。</p>
        </div>

        <div className="space-y-4 mb-8">
           {options.map((option) => (
              <InteractiveListItem
                key={option.id}
                onClick={() => setSelectedId(option.id)}
                className={cn(
                  "p-5 rounded-2xl border-2 transition-all cursor-pointer bg-white",
                  selectedId === option.id ? "border-brand-deep-blue shadow-lg" : "border-transparent hover:border-neutral-200"
                )}
              >
                <div className="flex gap-4">
                   <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center shrink-0", option.bg, option.color)}>
                      <option.icon className="w-6 h-6" />
                   </div>
                   <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                         <h3 className="font-bold text-neutral-900">{option.title}</h3>
                         {selectedId === option.id && (
                            <div className="w-5 h-5 bg-brand-deep-blue rounded-full flex items-center justify-center">
                               <Check className="w-3 h-3 text-white" />
                            </div>
                         )}
                      </div>
                      <p className="text-sm text-neutral-500 leading-relaxed">{option.description}</p>
                   </div>
                </div>
              </InteractiveListItem>
           ))}
        </div>

        <div className="flex flex-col gap-3">
           <Button 
             className="w-full bg-brand-deep-blue text-white h-14 text-lg rounded-2xl shadow-lg"
             onClick={() => onSelect(selectedId)}
           >
              确认并继续
           </Button>
           <Button 
             variant="ghost" 
             className="w-full text-neutral-400"
             onClick={onBack}
           >
              返回上一页
           </Button>
        </div>

        <div className="mt-8 p-4 bg-white/50 border border-neutral-100 rounded-xl text-center">
           <p className="text-xs text-neutral-400">
             * 所有模式均包含隐私发货与面单脱敏保证。
           </p>
        </div>
      </motion.div>
    </div>
  );
}
