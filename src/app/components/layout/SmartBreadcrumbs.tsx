import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/app/components/design-system/utils";
import { motion, AnimatePresence } from "motion/react";

// Map path segments to friendly names
const routeNameMap: Record<string, string> = {
  "category": "分类浏览",
  "product": "商品详情",
  "ar-start": "AR空间",
  "ar-viewer": "AR预览",
  "community": "海蓝社区",
  "post": "文章详情",
  "profile": "个人中心",
  "orders": "我的订单",
  "cart": "购物车",
  "checkout": "结算确认",
  "quiz-intro": "智能测品",
  "quiz-question": "测品问卷",
  "quiz-result": "测品结果",
  "privacy-control": "隐私管家",
  "preferences": "偏好设定",
  "help": "帮助与支持",
};

export function SmartBreadcrumbs({ className }: { className?: string }) {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  // Don't show on home page
  if (pathnames.length === 0) {
    return null;
  }

  return (
    <nav 
      className={cn("flex items-center text-sm overflow-x-auto whitespace-nowrap scrollbar-hide py-1.5 px-3 rounded-full bg-white/40 backdrop-blur-sm border border-white/40 shadow-sm", className)} 
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center">
        <li className="flex items-center">
          <Link to="/" className="text-neutral-400 hover:text-brand-deep-blue p-1 rounded-full transition-all hover:bg-white/60">
            <Home className="w-3.5 h-3.5" />
          </Link>
        </li>
        
        <AnimatePresence mode="popLayout">
          {pathnames.map((value, index) => {
            // Special handling for dynamic IDs (check if the segment is an ID like p1, r1 etc)
            const isId = /^[a-z]\d+$/i.test(value) || value.length > 20;
            if (isId && index > 0) return null; // Skip IDs in breadcrumbs for cleaner look

            const to = `/${pathnames.slice(0, index + 1).join("/")}`;
            const isLast = index === pathnames.length - 1;
            const name = routeNameMap[value] || value;

            return (
              <motion.li 
                key={to} 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="flex items-center"
              >
                <ChevronRight className="w-3.5 h-3.5 mx-1 text-neutral-300" />
                {isLast ? (
                  <span className="font-semibold text-brand-deep-blue px-2 py-0.5 rounded-md bg-white/60 shadow-inner text-xs">
                    {name}
                  </span>
                ) : (
                  <Link 
                    to={to} 
                    className="text-neutral-500 hover:text-brand-deep-blue px-2 py-0.5 rounded-md transition-all hover:bg-white/60 text-xs"
                  >
                    {name}
                  </Link>
                )}
              </motion.li>
            );
          })}
        </AnimatePresence>
      </ol>
    </nav>
  );
}
