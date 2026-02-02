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
  ChevronDown,
  LayoutGrid,
  HeartPulse,
  Rocket,
  Brain,
  Smartphone
} from "lucide-react";
import { cn } from "@/app/components/design-system/utils";
import { useNavigate, useLocation } from "react-router";
import { Link } from "@/app/components/router";
import { useCart } from "@/app/context/CartContext";
import { BrandLogo } from "@/app/components/BrandLogo";
import { SmartBreadcrumbs } from "./SmartBreadcrumbs";

interface NavbarProps {
  privacyMode?: boolean;
  onPrivacyToggle?: (enabled: boolean) => void;
}

const mainNavItems = [
  { id: "CARE", label: "CARE 身心关爱", icon: HeartPulse, color: "text-emerald-500", bg: "bg-emerald-50" },
  { id: "PLAY", label: "PLAY 愉悦探索", icon: Rocket, color: "text-rose-500", bg: "bg-rose-50" },
  { id: "SMART", label: "SMART 智感科技", icon: Brain, color: "text-blue-500", bg: "bg-blue-50" },
];

export function Navbar({ privacyMode = false, onPrivacyToggle }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [activeDropdown, setActiveDropdown] = React.useState<string | null>(null);
  
  const { itemCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const ConsoleItem = ({ 
    icon: Icon, 
    label, 
    active = false, 
    badge = 0,
    onClick 
  }: any) => (
    <Button 
      variant="ghost"
      size="sm"
      className={cn(
        "relative h-10 px-4 transition-all rounded-xl border border-transparent",
        active 
          ? "bg-white text-brand-hailan-blue shadow-md border-neutral-100" 
          : "hover:bg-white/50 text-neutral-500"
      )}
      onClick={onClick}
    >
      <Icon className={cn("w-4 h-4", label ? "mr-2" : "")} />
      {label && <span className="text-xs font-bold uppercase tracking-wider">{label}</span>}
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
        "sticky top-0 z-50 w-full transition-all duration-500",
        privacyMode 
          ? "bg-brand-navy/90 border-b border-brand-hailan-blue/20 text-white backdrop-blur-3xl" 
          : "bg-white/70 border-b border-white shadow-sm backdrop-blur-2xl text-neutral-900"
      )}>
        <div className="container mx-auto max-w-7xl">
          <div className="flex h-20 items-center justify-between px-6 gap-6">
            
            <div className="flex items-center gap-8 flex-shrink-0">
              <Button 
                variant="ghost" 
                size="icon" 
                className="md:hidden rounded-xl bg-neutral-100/50"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </Button>
              
              <Link to="/" className="flex items-center gap-2 transition-transform hover:scale-105 active:scale-95">
                <BrandLogo variant="full" size="sm" invert={privacyMode} />
              </Link>

              <nav className="hidden md:flex items-center gap-2">
                <div 
                  className="relative group"
                  onMouseEnter={() => setActiveDropdown('categories')}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Button variant="ghost" className={cn("text-sm font-bold h-11 px-6 rounded-xl hover:bg-white/50", privacyMode ? "text-white" : "text-neutral-900")}>
                    探索核心分类 <ChevronDown className={cn("ml-2 w-4 h-4 transition-transform duration-300", activeDropdown === 'categories' && "rotate-180")} />
                  </Button>
                  
                  {activeDropdown === 'categories' && (
                    <div className="absolute top-full left-0 w-72 bg-white/95 backdrop-blur-3xl rounded-3xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.2)] border border-white p-3 mt-2 overflow-hidden animate-slideUp">
                      <div className="grid grid-cols-1 gap-2">
                        {mainNavItems.map(item => (
                          <Link 
                            key={item.id} 
                            to={`/category?main=${item.id}`} 
                            className="flex items-center gap-4 p-4 rounded-2xl hover:bg-neutral-50 transition-all group/item"
                            onClick={() => setActiveDropdown(null)}
                          >
                            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center transition-all group-hover/item:scale-110", item.bg, item.color)}>
                              <item.icon className="w-5 h-5" />
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm font-bold text-neutral-900">{item.label}</span>
                              <span className="text-[10px] text-neutral-400 font-medium tracking-tight">点击进入专属频道</span>
                            </div>
                          </Link>
                        ))}
                        <div className="h-px bg-neutral-100 my-1 mx-2" />
                        <Link to="/category" className="flex items-center gap-4 p-4 rounded-2xl hover:bg-neutral-50 transition-all group/item">
                           <div className="w-10 h-10 rounded-xl bg-brand-hailan-blue flex items-center justify-center text-white">
                              <LayoutGrid className="w-5 h-5" />
                           </div>
                           <span className="text-sm font-bold text-neutral-900">查看全部探索</span>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
                
                <Link to="/community">
                  <Button variant="ghost" className={cn("text-sm font-bold h-11 px-6 rounded-xl hover:bg-white/50", privacyMode ? "text-white" : "text-neutral-900")}>
                    海蓝社区
                  </Button>
                </Link>
              </nav>
            </div>

            <div className="hidden lg:flex flex-1 max-w-md mx-4">
               <div className="relative w-full group">
                  <Search className={cn(
                    "absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors",
                    privacyMode ? "text-white/40 group-focus-within:text-brand-gold" : "text-neutral-400 group-focus-within:text-brand-hailan-blue"
                  )} />
                  <Input 
                    placeholder={privacyMode ? "隐私模式：加密搜索..." : "寻找您的健康方案..."}
                    className={cn(
                      "pl-12 w-full transition-all h-12 rounded-2xl border-none shadow-inner",
                      privacyMode 
                        ? "bg-white/10 text-white placeholder:text-white/40 focus:ring-1 focus:ring-brand-gold" 
                        : "bg-neutral-100/50 focus:bg-white focus:ring-1 focus:ring-brand-hailan-blue/10"
                    )} 
                  />
               </div>
            </div>

            <div className="flex items-center gap-3">
              <div className={cn(
                "hidden md:flex items-center p-1.5 rounded-2xl border gap-1",
                privacyMode ? "bg-white/10 border-white/10" : "bg-neutral-100/50 border-white"
              )}>
                <ConsoleItem 
                  icon={privacyMode ? Lock : Eye}
                  label={privacyMode ? "隐私 ON" : "隐私"}
                  active={privacyMode}
                  onClick={() => onPrivacyToggle?.(!privacyMode)}
                />
                <ConsoleItem 
                  icon={ShoppingBag}
                  badge={!privacyMode ? itemCount : 0}
                  onClick={() => navigate("/cart")}
                />
              </div>

              <div className="hidden md:flex items-center gap-3">
                 <Button variant="ghost" size="icon" className="rounded-xl h-11 w-11 bg-white/50 border border-white shadow-sm hover:shadow-md" onClick={() => navigate("/profile")}>
                    <Bell className="w-5 h-5" />
                 </Button>
                 <Link to="/profile">
                    <div className={cn(
                      "w-11 h-11 rounded-2xl flex items-center justify-center text-white font-black text-sm shadow-xl transition-all hover:scale-105 active:scale-95",
                      privacyMode ? "bg-brand-gold" : "bg-brand-hailan-blue"
                    )}>
                      {privacyMode ? <Shield className="w-5 h-5" /> : "U"}
                    </div>
                 </Link>
              </div>

              <div className="flex md:hidden items-center gap-2">
                <Button variant="ghost" size="icon" className="rounded-xl bg-neutral-100/50 h-10 w-10" onClick={() => setIsSearchOpen(!isSearchOpen)}>
                  <Search className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="relative rounded-xl bg-neutral-100/50 h-10 w-10" onClick={() => navigate("/cart")}>
                  <ShoppingBag className="w-5 h-5" />
                  {itemCount > 0 && (
                    <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-brand-coral rounded-full border-2 border-white" />
                  )}
                </Button>
              </div>
            </div>
          </div>

          {!isHomePage && (
            <div className="hidden md:block px-6 pb-4">
               <SmartBreadcrumbs />
            </div>
          )}
        </div>

          {isSearchOpen && (
            <div className="md:hidden border-t border-neutral-100 p-5 bg-white/95 backdrop-blur-2xl absolute w-full shadow-2xl animate-fadeIn">
              <div className="relative">
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                 <Input placeholder="搜索产品..." className="pl-12 w-full h-12 rounded-2xl bg-neutral-100 border-none" autoFocus />
                 <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 h-9 w-9"
                    onClick={() => setIsSearchOpen(false)}
                 >
                   <X className="w-5 h-5" />
                 </Button>
              </div>
            </div>
          )}
      </header>

        {isMobileMenuOpen && (
          <>
            <div 
              className="fixed inset-0 bg-brand-navy/40 backdrop-blur-md z-[60] animate-fadeIn"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <div 
              className="fixed top-0 left-0 bottom-0 w-[85%] max-w-sm bg-white z-[70] shadow-2xl flex flex-col rounded-r-[3rem] animate-slideInLeft"
              style={{ animationDuration: '0.3s' }}
            >
              <div className="p-8 flex items-center justify-between border-b border-neutral-50">
                 <BrandLogo variant="full" size="sm" />
                 <Button variant="ghost" size="icon" className="rounded-xl bg-neutral-50" onClick={() => setIsMobileMenuOpen(false)}>
                    <X className="w-5 h-5" />
                 </Button>
              </div>
              
              <div className="flex-1 overflow-y-auto py-8 px-6">
                 <div className="space-y-10">
                    <div>
                       <h3 className="text-[10px] font-black text-neutral-300 uppercase tracking-[0.2em] mb-6 px-2">核心探索</h3>
                       <nav className="grid gap-2">
                          {mainNavItems.map(item => (
                            <MobileNavLink 
                              key={item.id}
                              to={`/category?main=${item.id}`} 
                              icon={item.icon} 
                              label={item.label} 
                              onClick={() => setIsMobileMenuOpen(false)} 
                              color={item.color}
                              bg={item.bg}
                            />
                          ))}
                          <MobileNavLink to="/category" icon={LayoutGrid} label="全部探索" onClick={() => setIsMobileMenuOpen(false)} />
                       </nav>
                    </div>

                    <div>
                       <h3 className="text-[10px] font-black text-neutral-300 uppercase tracking-[0.2em] mb-6 px-2">社交与体验</h3>
                       <nav className="grid gap-2">
                          <MobileNavLink to="/community" icon={Smartphone} label="海蓝社区" onClick={() => setIsMobileMenuOpen(false)} />
                          <MobileNavLink to="/ar-start" icon={Smartphone} label="AR 沉浸空间" onClick={() => setIsMobileMenuOpen(false)} />
                          <MobileNavLink to="/quiz-intro" icon={Shield} label="AI 智能测品" onClick={() => setIsMobileMenuOpen(false)} />
                       </nav>
                    </div>
                 </div>
              </div>

              <div className="p-8 border-t border-neutral-50 bg-neutral-50/50 rounded-br-[3rem]">
                 <div className="flex items-center gap-5 mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-brand-hailan-blue flex items-center justify-center text-white font-black text-xl shadow-lg">U</div>
                    <div>
                       <p className="font-bold text-brand-navy text-lg">王先生</p>
                       <p className="text-xs text-neutral-400 font-medium tracking-tight">HaiLan Elite 会员</p>
                    </div>
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" className="rounded-2xl h-12 bg-white font-bold border-neutral-200" onClick={() => { navigate('/profile'); setIsMobileMenuOpen(false); }}>
                       个人中心
                    </Button>
                    <Button variant="outline" className="rounded-2xl h-12 bg-white font-bold border-neutral-200" onClick={() => { navigate('/help'); setIsMobileMenuOpen(false); }}>
                       帮助中心
                    </Button>
                 </div>
              </div>
            </div>
          </>
        )}
    </>
  );
}

function MobileNavLink({ to, icon: Icon, label, onClick, color = "text-neutral-500", bg = "bg-neutral-100" }: any) {
  return (
    <Link 
      to={to} 
      onClick={onClick}
      className="flex items-center gap-4 p-4 rounded-2xl hover:bg-neutral-50 transition-all group"
    >
      <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110", bg, color)}>
        <Icon className="w-6 h-6" />
      </div>
      <span className="font-bold text-neutral-800">{label}</span>
    </Link>
  );
}
