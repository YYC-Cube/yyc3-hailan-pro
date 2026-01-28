import * as React from "react";
import { Button } from "@/app/components/design-system/Button";
import { Input } from "@/app/components/design-system/Input";
import { 
  Shield, 
  Menu, 
  Search, 
  User, 
  Eye, 
  Lock, 
  ShoppingBag,
  X,
  Bell,
  Settings,
  ChevronDown,
  LayoutGrid,
  Heart,
  MessageCircle,
  HelpCircle,
  Smartphone
} from "lucide-react";
import { cn } from "@/app/components/design-system/utils";
import { motion, AnimatePresence } from "motion/react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useCart } from "@/app/context/CartContext";
import { BrandLogo } from "@/app/components/BrandLogo";
import { SmartBreadcrumbs } from "./SmartBreadcrumbs";
import { CATEGORIES } from "@/app/data/mockData";

interface NavbarProps {
  privacyMode?: boolean;
  onPrivacyToggle?: (enabled: boolean) => void;
}

export function Navbar({ privacyMode = false, onPrivacyToggle }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [activeDropdown, setActiveDropdown] = React.useState<string | null>(null);
  
  const { itemCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  // Quick Control Console Items
  const ConsoleItem = ({ 
    icon: Icon, 
    label, 
    active = false, 
    badge = 0,
    onClick,
    variant = "ghost" 
  }: any) => (
    <Button 
      variant={variant}
      size="sm"
      className={cn(
        "relative h-9 px-3 transition-all rounded-full",
        active ? "bg-white text-brand-deep-blue shadow-sm" : "hover:bg-neutral-100 text-neutral-600"
      )}
      onClick={onClick}
    >
      <Icon className={cn("w-4 h-4", label ? "mr-2" : "")} />
      {label && <span className="text-xs font-medium">{label}</span>}
      {badge > 0 && (
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand-coral rounded-full text-[10px] text-white flex items-center justify-center border-2 border-white">
          {badge}
        </span>
      )}
    </Button>
  );

  return (
    <>
      <header className={cn(
        "sticky top-0 z-50 w-full border-b transition-all duration-300",
        privacyMode 
          ? "bg-neutral-900/95 border-neutral-800 text-neutral-200" 
          : "bg-white/80 border-neutral-200 backdrop-blur-xl text-neutral-900"
      )}>
        <div className="container mx-auto max-w-7xl">
          <div className="flex h-16 items-center justify-between px-4 gap-4">
            
            {/* Left: Mobile Menu Trigger & Logo */}
            <div className="flex items-center gap-2 md:gap-6 flex-shrink-0">
              <Button 
                variant="ghost" 
                size="icon" 
                className="md:hidden"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </Button>
              
              <Link to="/" className="flex items-center gap-2 transition-transform active:scale-95">
                <BrandLogo variant="full" size="sm" />
              </Link>

              {/* Desktop Main Navigation */}
              <nav className="hidden md:flex items-center gap-1">
                <div 
                  className="relative group"
                  onMouseEnter={() => setActiveDropdown('categories')}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Button variant="ghost" className="text-sm font-medium h-9 px-4 rounded-full group-hover:bg-neutral-100">
                    分类浏览 <ChevronDown className={cn("ml-1 w-4 h-4 transition-transform", activeDropdown === 'categories' && "rotate-180")} />
                  </Button>
                  
                  <AnimatePresence>
                    {activeDropdown === 'categories' && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full left-0 w-64 bg-white rounded-2xl shadow-xl border border-neutral-100 p-2 mt-1 backdrop-blur-xl"
                      >
                        <div className="grid grid-cols-1 gap-1">
                          {CATEGORIES.map(cat => (
                            <Link 
                              key={cat.id} 
                              to="/category" 
                              className="flex items-center gap-3 p-3 rounded-xl hover:bg-neutral-50 transition-colors group/item"
                            >
                              <div className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center text-brand-deep-blue group-hover/item:bg-brand-deep-blue group-hover/item:text-white transition-colors">
                                <LayoutGrid className="w-4 h-4" />
                              </div>
                              <span className="text-sm font-medium text-neutral-700">{cat.name}</span>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                <Link to="/community">
                  <Button variant="ghost" className="text-sm font-medium h-9 px-4 rounded-full hover:bg-neutral-100">
                    海蓝社区
                  </Button>
                </Link>
                <Link to="/ar-start">
                  <Button variant="ghost" className="text-sm font-medium h-9 px-4 rounded-full hover:bg-neutral-100">
                    AR空间
                  </Button>
                </Link>
              </nav>
            </div>

            {/* Center: Search (Desktop) */}
            <div className="hidden lg:flex flex-1 max-w-md mx-4">
               <div className="relative w-full group">
                  <Search className={cn(
                    "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors",
                    privacyMode ? "text-neutral-500 group-focus-within:text-brand-gold" : "text-neutral-400 group-focus-within:text-brand-deep-blue"
                  )} />
                  <Input 
                    placeholder={privacyMode ? "隐私安全搜索..." : "搜索产品、健康方案..."}
                    className={cn(
                      "pl-10 w-full transition-all h-10 rounded-full border-none",
                      privacyMode 
                        ? "bg-neutral-800 text-neutral-200 placeholder:text-neutral-600 focus:ring-1 focus:ring-brand-gold" 
                        : "bg-neutral-100 focus:bg-white shadow-inner focus:shadow-sm focus:ring-1 focus:ring-brand-deep-blue/20"
                    )} 
                  />
               </div>
            </div>

            {/* Right: Quick Control & Profile */}
            <div className="flex items-center gap-2">
              
              {/* Quick Actions (Tablet/Desktop) */}
              <div className={cn(
                "hidden md:flex items-center p-1 rounded-full border gap-0.5",
                privacyMode ? "bg-neutral-800 border-neutral-700" : "bg-neutral-50 border-neutral-100"
              )}>
                <ConsoleItem 
                  icon={privacyMode ? Lock : Eye}
                  label={privacyMode ? "隐私开" : "隐私"}
                  active={privacyMode}
                  onClick={() => onPrivacyToggle?.(!privacyMode)}
                />
                <div className="w-px h-4 bg-neutral-200 mx-1" />
                <ConsoleItem 
                  icon={ShoppingBag}
                  badge={!privacyMode ? itemCount : 0}
                  onClick={() => navigate("/cart")}
                />
              </div>

              {/* Profile/Messages (Tablet/Desktop) */}
              <div className="hidden md:flex items-center gap-2">
                 <Button variant="ghost" size="icon" className="rounded-full h-9 w-9 text-neutral-500 hover:bg-neutral-100" onClick={() => navigate("/profile")}>
                    <Bell className="w-4 h-4" />
                 </Button>
                 <Link to="/profile">
                    <div className={cn(
                      "w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-sm transition-transform active:scale-95",
                      privacyMode ? "bg-brand-gold" : "bg-brand-deep-blue"
                    )}>
                      {privacyMode ? <Shield className="w-4 h-4" /> : "U"}
                    </div>
                 </Link>
              </div>

              {/* Mobile Actions */}
              <div className="flex md:hidden items-center gap-1">
                <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setIsSearchOpen(!isSearchOpen)}>
                  <Search className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="relative rounded-full" onClick={() => navigate("/cart")}>
                  <ShoppingBag className="w-5 h-5" />
                  {itemCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-coral rounded-full border border-white" />
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* Inline Breadcrumbs for Desktop only on non-home pages */}
          {!isHomePage && (
            <div className="hidden md:block px-4 pb-3">
               <SmartBreadcrumbs />
            </div>
          )}
        </div>

        {/* Mobile Search Overlay */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-neutral-100 p-4 bg-white/95 backdrop-blur-xl absolute w-full shadow-lg"
            >
              <div className="relative">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                 <Input placeholder="搜索产品..." className="pl-10 w-full rounded-full bg-neutral-100 border-none" autoFocus />
                 <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                    onClick={() => setIsSearchOpen(false)}
                 >
                   <X className="w-4 h-4" />
                 </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile Side Drawer (Drawer Dropdown Navigation) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-[80%] max-w-sm bg-white z-[70] shadow-2xl flex flex-col"
            >
              <div className="p-6 flex items-center justify-between border-b">
                 <BrandLogo variant="full" size="sm" />
                 <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                    <X className="w-5 h-5" />
                 </Button>
              </div>
              
              <div className="flex-1 overflow-y-auto py-6 px-4">
                 <div className="space-y-6">
                    <div>
                       <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-4 px-2">发现</h3>
                       <nav className="grid gap-1">
                          <MobileNavLink to="/category" icon={LayoutGrid} label="全部商品" onClick={() => setIsMobileMenuOpen(false)} />
                          <MobileNavLink to="/community" icon={MessageCircle} label="海蓝社区" onClick={() => setIsMobileMenuOpen(false)} />
                          <MobileNavLink to="/ar-start" icon={Smartphone} label="AR体验馆" onClick={() => setIsMobileMenuOpen(false)} />
                          <MobileNavLink to="/quiz-intro" icon={Shield} label="智能测品" onClick={() => setIsMobileMenuOpen(false)} />
                       </nav>
                    </div>

                    <div>
                       <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-4 px-2">品类</h3>
                       <nav className="grid gap-1">
                          {CATEGORIES.map(cat => (
                            <Link 
                              key={cat.id} 
                              to="/category" 
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="flex items-center gap-3 p-3 rounded-xl hover:bg-neutral-50 transition-colors"
                            >
                              <span className="text-sm font-medium text-neutral-700">{cat.name}</span>
                            </Link>
                          ))}
                       </nav>
                    </div>
                 </div>
              </div>

              <div className="p-6 border-t bg-neutral-50">
                 <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-brand-deep-blue flex items-center justify-center text-white font-bold text-lg">U</div>
                    <div>
                       <p className="font-bold text-neutral-900">王先生</p>
                       <p className="text-xs text-neutral-500">HaiLan Plus 会员</p>
                    </div>
                 </div>
                 <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" size="sm" className="rounded-xl flex items-center gap-2" onClick={() => { navigate('/profile'); setIsMobileMenuOpen(false); }}>
                       <User className="w-4 h-4" /> 个人资料
                    </Button>
                    <Button variant="outline" size="sm" className="rounded-xl flex items-center gap-2" onClick={() => { navigate('/help'); setIsMobileMenuOpen(false); }}>
                       <HelpCircle className="w-4 h-4" /> 帮助中心
                    </Button>
                 </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function MobileNavLink({ to, icon: Icon, label, onClick }: any) {
  return (
    <Link 
      to={to} 
      onClick={onClick}
      className="flex items-center gap-4 p-3 rounded-xl hover:bg-brand-deep-blue/5 transition-colors group"
    >
      <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-500 group-hover:bg-brand-deep-blue group-hover:text-white transition-colors">
        <Icon className="w-5 h-5" />
      </div>
      <span className="font-medium text-neutral-900">{label}</span>
    </Link>
  );
}
