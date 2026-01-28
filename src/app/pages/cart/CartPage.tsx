import React from "react";
import { useCart } from "@/app/context/CartContext";
import { Navbar } from "@/app/components/layout/Navbar";
import { Footer } from "@/app/components/layout/Footer";
import { Button } from "@/app/components/ui/button";
import { Trash2, Plus, Minus, ArrowRight, ShieldCheck, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/app/components/ui/badge";

export function CartPage() {
  const { items, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center p-4">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
            <ShoppingBag className="w-10 h-10 text-slate-300" />
          </div>
          <h2 className="text-2xl font-serif text-[#1A365D] mb-2">购物车是空的</h2>
          <p className="text-slate-500 mb-8">看起来您还没有找到心仪的产品。</p>
          <Button onClick={() => navigate("/category")} className="bg-[#1A365D] hover:bg-[#2A4365]">
            开始探索
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <h1 className="text-3xl font-serif text-[#1A365D] mb-8">购物车</h1>
        
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Cart Items List */}
          <div className="lg:col-span-8 space-y-4">
            {items.map((item) => (
              <div key={`${item.id}-${item.selectedColor}`} className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-slate-100 flex flex-col md:flex-row gap-6 items-start md:items-center">
                <div className="w-24 h-24 bg-slate-100 rounded-xl shrink-0 overflow-hidden border border-neutral-100">
                    <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                </div>
                
                <div className="flex-1 space-y-1">
                   <div className="flex justify-between items-start">
                       <h3 className="font-medium text-[#1A365D] text-lg">{item.name}</h3>
                       <button onClick={() => removeFromCart(item.id)} className="text-slate-400 hover:text-red-500 transition-colors">
                           <Trash2 className="w-5 h-5" />
                       </button>
                   </div>
                   <div className="text-sm text-slate-500">选项: {item.selectedColor || '默认'}</div>
                   {item.selectedPackaging !== 'standard' && (
                       <Badge variant="outline" className="text-xs border-emerald-200 text-emerald-700 bg-emerald-50 mt-1">
                           <ShieldCheck className="w-3 h-3 mr-1" />
                           {item.selectedPackaging === 'stealth' ? '隐身包装' : '高级隐私'}
                       </Badge>
                   )}
                </div>

                <div className="flex items-center gap-3">
                    <button 
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 text-slate-600 active:scale-90 transition-transform"
                    >
                        <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center font-medium text-[#1A365D]">{item.quantity}</span>
                    <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 text-slate-600 active:scale-90 transition-transform"
                    >
                        <Plus className="w-4 h-4" />
                    </button>
                </div>

                <div className="text-right min-w-[100px]">
                    <div className="text-lg font-bold text-[#1A365D]">¥{(item.price * item.quantity).toLocaleString()}</div>
                </div>
              </div>
            ))}
            
            <div className="flex justify-between items-center pt-4">
                <Button variant="ghost" className="text-slate-500 hover:text-red-500" onClick={clearCart}>
                    清空购物车
                </Button>
                <Button variant="outline" onClick={() => navigate("/category")}>
                    继续购物
                </Button>
            </div>
          </div>

          {/* Summary */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-2xl p-6 shadow-lg shadow-slate-200/50 sticky top-24 border border-slate-100">
                <h3 className="text-lg font-serif text-[#1A365D] mb-6 font-bold">订单摘要</h3>
                
                <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-slate-600">
                        <span>商品小计</span>
                        <span>¥{cartTotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                        <span>估计运费</span>
                        <span className="text-emerald-600 font-medium">免运费</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                        <span>隐私加固包装</span>
                        <span className="text-emerald-600 font-medium">免费</span>
                    </div>
                </div>
                
                <div className="border-t border-slate-100 pt-4 mb-6">
                    <div className="flex justify-between text-xl font-bold text-[#1A365D]">
                        <span>总计</span>
                        <span>¥{cartTotal.toLocaleString()}</span>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-2">含所有适用税费及保险</p>
                </div>

                <Button className="w-full bg-[#1A365D] hover:bg-[#2A4365] py-7 text-lg rounded-xl shadow-md hover:shadow-lg transition-all" onClick={() => navigate("/checkout")}>
                    立即结算
                    <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                
                <div className="mt-6 flex flex-col gap-3">
                    <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
                        <ShieldCheck className="w-4 h-4 text-emerald-500" />
                        <span>100% 安全加密结算</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
                        <ShoppingBag className="w-4 h-4 text-brand-deep-blue" />
                        <span>隐私面单：包裹不显示商品名称</span>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
