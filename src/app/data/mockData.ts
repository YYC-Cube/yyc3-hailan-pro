import { LucideIcon, Heart, Sparkles, Zap, Smartphone, Feather, ShieldCheck } from "lucide-react";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  images: string[];
  category: string;
  tags: string[];
  features: string[];
  material: string[];
  isNew?: boolean;
  isSmart?: boolean;
  
  // New fields for PDP
  compatibility?: string[];
  boxContent?: string[];
  cleaningInstructions?: string;
  arEnabled?: boolean;
}

export interface Category {
  id: string;
  name: string;
  subcategories: string[];
}

export const CATEGORIES: Category[] = [
  {
    id: "smart-toys",
    name: "智能愉悦",
    subcategories: ["遥控控制", "App 连接", "互动体验", "可穿戴"]
  },
  {
    id: "massage",
    name: "身体按摩",
    subcategories: ["按摩棒", "精油", "香氛蜡烛", "工具"]
  },
  {
    id: "wellness",
    name: "性健康",
    subcategories: ["盆底健康", "营养补充", "卫生护理", "教育"]
  },
  {
    id: "apparel",
    name: "情趣服饰",
    subcategories: ["内衣", "睡袍", "丝绸", "配饰"]
  },
  {
    id: "couples",
    name: "伴侣共享",
    subcategories: ["游戏", "情趣增强", "套装", "情趣家具"]
  },
  {
    id: "tech",
    name: "高科技",
    subcategories: ["VR/AR", "远程互动", "生物反馈"]
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
    category: "smart-toys",
    tags: ["热销", "智能"],
    features: ["App 连接", "全身防水", "超静音", "超长续航"],
    material: ["医用级硅胶", "ABS"],
    isNew: true,
    isSmart: true,
    compatibility: ["iOS 14+", "Android 10+", "海蓝 App"],
    boxContent: ["星云脉冲设备", "磁吸 USB 充电线", "丝缎收纳袋", "快速入门指南"],
    cleaningInstructions: "使用温水和专用清洁剂或温和肥皂清洗。冲洗干净后用无绒布擦干。",
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
      "https://images.unsplash.com/photo-1725182525091-ae6076964336?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjb3NtZXRpY3MlMjBib3R0bGUlMjBkYXJrJTIwYmx1ZSUyMGJhY2tncm91bmQlMjBzdHVkaW8lMjBzaG90fGVufDF8fHx8MTc2OTQwNjY5M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1747052881000-a640a4981dd0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJmdW1lJTIwYm90dGxlJTIwZWxlZ2FudHxlbnwxfHx8fDE3Njk0MDY2OTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    ],
    category: "massage",
    tags: ["有机", "香氛"],
    features: ["纯素", "不沾染", "可食用安全"],
    material: ["精油", "椰子油基底"],
  },
  {
    id: "p4",
    name: "宁静香氛烛",
    description: "低温大豆蜡烛，不仅能调节氛围，更适合低温滴蜡玩法。",
    price: 249.00,
    rating: 4.5,
    reviewCount: 76,
    images: [
      "https://images.unsplash.com/photo-1619695662967-3e739a597f47?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW5kbGUlMjBzcGElMjByZWxheGluZ3xlbnwxfHx8fDE3Njk0MDY2OTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    ],
    category: "massage",
    tags: ["氛围"],
    features: ["大豆蜡", "低温熔点", "纯棉烛芯"],
    material: ["大豆蜡", "陶瓷"],
  },
  {
    id: "p5",
    name: "新星雕塑 (Nova Sculpt)",
    description: "兼具艺术美感与愉悦功能的现代雕塑。极简设计下蕴藏强大的内部震动。",
    price: 899.00,
    rating: 4.6,
    reviewCount: 42,
    images: [
      "https://images.unsplash.com/photo-1738672688024-5ce3b389f76b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBtaW5pbWFsJTIwYWJzdHJhY3QlMjBvcmdhbmljJTIwc2hhcGUlMjBzY3VscHR1cmUlMjB3aGl0ZSUyMGJhY2tncm91bmQlMjBzdHVkaW8lMjBzaG90fGVufDF8fHx8MTc2OTQwNzI5Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    ],
    category: "smart-toys",
    tags: ["设计大奖", "隐秘"],
    features: ["全身防水", "Type-C 充电", "旅行锁"],
    material: ["医用级硅胶"],
    isNew: true
  },
  {
    id: "p6",
    name: "光之灵药 (Lumina Elixir)",
    description: "高端身体精华，提升敏感度并滋养肌肤。富含植物萃取精华。",
    price: 599.00,
    originalPrice: 699.00,
    rating: 4.9,
    reviewCount: 156,
    images: [
      "https://images.unsplash.com/photo-1697301439997-052adc7d7443?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBlbGVnYW50JTIwc2VydW0lMjBib3R0bGUlMjBkYXJrJTIwYmx1ZSUyMGJhY2tncm91bmQlMjBzdHVkaW8lMjBzaG90fGVufDF8fHx8MTc2OTQwNzI5Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    ],
    category: "wellness",
    tags: ["天然", "高端"],
    features: ["酸碱平衡", "无香精", "皮肤科测试"],
    material: ["玻璃瓶", "植物萃取"]
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
    category: "tech",
    tags: ["高科技", "伴侣"],
    features: ["App 连接", "远程互动", "视频同步"],
    material: ["ABS", "硅胶"],
    isSmart: true
  },
  {
    id: "p8",
    name: "丝绒触感按摩棒",
    description: "现代形态演绎经典动力。终极身体按摩器，配备灵活按摩头和深沉震感。",
    price: 999.00,
    rating: 4.8,
    reviewCount: 312,
    images: [
      "https://images.unsplash.com/photo-1563549054059-bf4ebe2f49d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzbW9vdGglMjBnYWRnZXQlMjBzaWxpY29uZSUyMHdoaXRlJTIwYmFja2dyb3VuZHxlbnwxfHx8fDE3Njk0MDY2OTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    ],
    category: "massage",
    tags: ["经典", "强力"],
    features: ["涡轮模式", "无线", "防水"],
    material: ["医用级硅胶"]
  },
  {
    id: "p9",
    name: "月光睡眠眼罩",
    description: "奢华丝绸眼罩，助您享受不间断的休憩。加厚填充设计，带来极致舒适与遮光效果。",
    price: 320.00,
    rating: 4.9,
    reviewCount: 201,
    images: [
      "https://images.unsplash.com/photo-1766879240552-1d45e2a5d79f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaWxrJTIwZmFicmljJTIwdGV4dHVyZSUyMGRhcmslMjBibHVlfGVufDF8fHx8MTc2OTUxNDQzM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    ],
    category: "apparel",
    tags: ["旅行", "睡眠"],
    features: ["100% 桑蚕丝", "可调节带", "全遮光"],
    material: ["桑蚕丝", "棉填充"]
  },
  {
    id: "p10",
    name: "核心平衡球",
    description: "符合人体工学的硅胶凯格尔球。进阶式组合，助您循序渐进地增强力量。",
    price: 450.00,
    rating: 4.8,
    reviewCount: 143,
    images: [
      "https://images.unsplash.com/photo-1588733162458-28da22719e51?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwd2VpZ2h0cyUyMHBhc3RlbCUyMHNpbGljb25lJTIwbWluaW1hbGlzdHxlbnwxfHx8fDE3Njk1MTQ0NDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    ],
    category: "wellness",
    tags: ["健康", "训练"],
    features: ["4件套", "进阶重量", "人体安全材质"],
    material: ["硅胶", "钢芯"]
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
    category: "couples",
    tags: ["可穿戴", "互联"],
    features: ["心跳同步", "触摸反馈", "生活防水"],
    material: ["陶瓷", "钛合金"],
    isSmart: true
  },
  {
    id: "p12",
    name: "Zenith 浴盐",
    description: "富含矿物质的浴盐，配以干薰衣草和洋甘菊。深度放松，排毒养颜。",
    price: 299.00,
    rating: 4.9,
    reviewCount: 320,
    images: [
      "https://images.unsplash.com/photo-1663089889877-8ad61477bf00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXRoJTIwc2FsdHMlMjBqYXIlMjBsdXh1cnklMjBzcGElMjBkYXJrJTIwYmFja2dyb3VuZHxlbnwxfHx8fDE3Njk1MTQ0MzR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    ],
    category: "massage",
    tags: ["SPA", "放松"],
    features: ["天然矿物", "精油", "玻璃罐装"],
    material: ["海盐", "泻盐", "干花"]
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
  },
  {
    id: "r2",
    author: "李先生",
    rating: 4,
    date: "2023-11-02",
    content: "非常安静，正是我需要的。材质摸起来很高级。",
    dimensions: { comfort: 4, quality: 5, privacy: 5, effect: 4 }
  },
  {
    id: "r3",
    author: "王女士",
    rating: 5,
    date: "2023-11-20",
    content: "App的伪装功能太棒了。我可以放心把它留在手机上。产品效果如广告所述，非常强劲。",
    dimensions: { comfort: 5, quality: 5, privacy: 5, effect: 5 }
  },
  {
    id: "r4",
    author: "陈先生",
    rating: 4,
    date: "2023-12-05",
    content: "发货保密且迅速。丝绸睡袍非常柔软，虽然尺码稍微有点偏小。",
    dimensions: { comfort: 4, quality: 5, privacy: 5, effect: 3 }
  },
  {
    id: "r5",
    author: "刘女士",
    rating: 5,
    date: "2024-01-10",
    content: "我遇到过的最好的客户服务。AI助手帮我为伴侣选到了合适的产品。",
    dimensions: { comfort: 5, quality: 5, privacy: 5, effect: 5 }
  }
];
