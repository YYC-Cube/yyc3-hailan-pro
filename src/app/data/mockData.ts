import { LucideIcon, Heart, Sparkles, Zap, Smartphone, Feather, ShieldCheck, HeartHandshake, Leaf, Cpu, Gem, BookOpen, Users } from "lucide-react";

export type MainCategoryType = "CARE" | "PLAY" | "SMART";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  images: string[];
  mainCategory: MainCategoryType;
  category: string; // Sub-category
  tags: string[];
  features: string[];
  material: string[];
  isNew?: boolean;
  isSmart?: boolean;
  compatibility?: string[];
  boxContent?: string[];
  cleaningInstructions?: string;
  arEnabled?: boolean;
}

export interface Category {
  id: string;
  name: string;
  mainCategory: MainCategoryType;
  subcategories: string[];
}

export const CATEGORIES: Category[] = [
  {
    id: "wellness",
    name: "健康护理",
    mainCategory: "CARE",
    subcategories: ["盆底健康", "营养补充", "卫生护理", "教育"]
  },
  {
    id: "massage",
    name: "身体按摩",
    mainCategory: "CARE",
    subcategories: ["按摩棒", "精油", "香氛蜡烛", "工具"]
  },
  {
    id: "smart-toys",
    name: "愉悦玩物",
    mainCategory: "PLAY",
    subcategories: ["遥控控制", "App 连接", "互动体验", "可穿戴"]
  },
  {
    id: "apparel",
    name: "情趣服饰",
    mainCategory: "PLAY",
    subcategories: ["内衣", "睡袍", "丝绸", "配饰"]
  },
  {
    id: "couples",
    name: "伴侣共享",
    mainCategory: "PLAY",
    subcategories: ["游戏", "情趣增强", "套装", "情趣家具"]
  },
  {
    id: "tech",
    name: "智能科技",
    mainCategory: "SMART",
    subcategories: ["VR/AR", "远程互动", "生物反馈", "AI 指导"]
  }
];

export const PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "星云脉冲 (Nebula Pulse)",
    description: "一款专为个性化声波体验设计的智能App控制设备。配备生物反馈传感器，可根据您的身体反应自动调节。",
    price: 1299.00,
    rating: 4.8,
    reviewCount: 124,
    images: [
      "https://images.unsplash.com/photo-1563549054059-bf4ebe2f49d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzbW9vdGglMjBnYWRnZXQlMjBzaWxpY29uZSUyMHdoaXRlJTIwYmFja2dyb3VuZHxlbnwxfHx8fDE3Njk0MDY2OTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1760037034697-eee0b07ae072?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMHdlbGxuZXNzJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3Njk0MDY2OTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    ],
    mainCategory: "SMART",
    category: "tech",
    tags: ["热销", "智能"],
    features: ["App 连接", "全身防水", "超静音", "超长续航"],
    material: ["医用级硅胶", "ABS"],
    isNew: true,
    isSmart: true,
    compatibility: ["iOS 14+", "Android 10+", "海蓝 App"],
    boxContent: ["星云脉冲设备", "磁吸 USB 充电线", "丝缎收纳袋", "快速入门指南"],
    cleaningInstructions: "使用温水 and 专用清洁剂 or 温和肥皂清洗。冲洗干净后用无绒布擦干。",
    arEnabled: true
  },
  {
    id: "p2",
    name: "午夜丝绸睡袍",
    description: "由100%桑蚕丝手工制作，触感如第二层肌肤。深午夜蓝色调，尽显优雅神秘。",
    price: 1699.00,
    originalPrice: 1999.00,
    rating: 4.9,
    reviewCount: 89,
    images: [
      "https://images.unsplash.com/photo-1676696663276-d556eea4f577?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaWxrJTIwZmFicmljJTIwdGV4dHVyZSUyMGRhcmslMjBibHVlfGVufDF8fHx8MTc2OTQwNjY5M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    ],
    mainCategory: "PLAY",
    category: "apparel",
    tags: ["奢华", "天然"],
    features: ["100% 桑蚕丝", "温度调节", "低致敏性"],
    material: ["桑蚕丝"],
  },
  {
    id: "p3",
    name: "精华五号 (Essence No. 5)",
    description: "蕴含费洛蒙的按摩油，提升敏感度并营造宁静氛围。融合檀香与茉莉的香气。",
    price: 399.00,
    rating: 4.7,
    reviewCount: 210,
    images: [
      "https://images.unsplash.com/photo-1725182525091-ae6076964336?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjb3NtZXRpY3MlMjBib3R0bGUlMjBkYXJrJTIwYmFja2dyb3VuZHxlbnwxfHx8fDE3Njk0MDY2OTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1747052881000-a640a4981dd0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJmdW1lJTIwYm90dGxlJTIwZWxlZ2FudHxlbnwxfHx8fDE3Njk0MDY2OTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    ],
    mainCategory: "CARE",
    category: "massage",
    tags: ["有机", "香氛"],
    features: ["纯素", "不沾染", "可食用安全"],
    material: ["精油", "椰子油基底"],
  },
  {
    id: "p7",
    name: "Aero Link 远程伴侣",
    description: "专为异地伴侣打造的尖端远程连接设备。支持实时音视频同步。",
    price: 1499.00,
    rating: 4.7,
    reviewCount: 98,
    images: [
      "https://images.unsplash.com/photo-1739764577422-20863c027cb6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXR1cmlzdGljJTIwd2hpdGUlMjB0ZWNoJTIwZ2FkZ2V0JTIwc29mdCUyMGxpZ2h0fGVufDF8fHx8MTc2OTQwNzMwMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    ],
    mainCategory: "SMART",
    category: "tech",
    tags: ["高科技", "伴侣"],
    features: ["App 连接", "远程互动", "视频同步"],
    material: ["ABS", "硅胶"],
    isSmart: true
  },
  {
    id: "p11",
    name: "回声智能指环",
    description: "专为伴侣设计的可穿戴设备，可传递心跳与微震动。无论身在何处，都能感受彼此的存在。",
    price: 1199.00,
    rating: 4.6,
    reviewCount: 67,
    images: [
      "https://images.unsplash.com/photo-1654713056822-15e0553776bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VwbGUlMjByaW5ncyUyMHNtYXJ0JTIwdGVjaCUyMG1pbmltYWxpc3R8ZW58MXx8fHwxNzY5NTE0NDMzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    ],
    mainCategory: "SMART",
    category: "couples",
    tags: ["可穿戴", "互联"],
    features: ["心跳同步", "触摸反馈", "生活防水"],
    material: ["陶瓷", "钛合金"],
    isSmart: true
  }
];

export const MOCK_REVIEWS = [
  {
    id: "r1",
    author: "张小姐",
    rating: 5,
    date: "2023-10-15",
    content: "包装非常精美，设备本身就像一件艺术品。App的隐私模式简直是神来之笔。",
    dimensions: { comfort: 5, quality: 5, privacy: 5, effect: 4 }
  }
];
