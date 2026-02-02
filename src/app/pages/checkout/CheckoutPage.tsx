import React, { useState } from "react";
import { Navbar } from "@/app/components/layout/Navbar";
import { Footer } from "@/app/components/layout/Footer";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/app/components/ui/radio-group";
import { useCart } from "@/app/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ShieldCheck, Truck, CreditCard, Lock, Package, ArrowLeft, Clock } from "lucide-react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";

const steps = [
  { id: 1, name: "配送信息", icon: Truck },
  { id: 2, name: "支付方式", icon: CreditCard },
  { id: 3, name: "确认订单", icon: Check },
];

export function CheckoutPage() {
  const { cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [deliveryType, setDeliveryType] = useState("standard");
  const [privacyOption, setPrivacyOption] = useState("stealth");

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      // Place order
      toast.success("订单提交成功！");
      clearCart();
      // Redirect to a success page or back home
      setTimeout(() => navigate("/"), 2000);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
        navigate("/cart");
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Progress Steps */}
        <div className="mb-10">
           <div className="flex items-center justify-between relative z-0">
              <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-200 -z-10" />
              <div 
                className="absolute top-1/2 left-0 h-1 bg-[#1A365D] -z-10 transition-all duration-500" 
                style={{ width: `${((currentStep - 1) / 2) * 100}%` }} 
              />
              
              {steps.map((step) => {
                 const isActive = step.id <= currentStep;
                 const isCompleted = step.id < currentStep;
                 return (
                   <div key={step.id} className="flex flex-col items-center bg-[#F8FAFC] px-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${isActive ? "bg-[#1A365D] text-white shadow-lg" : "bg-slate-200 text-slate-400"}`}>
                         {isCompleted ? <Check className="w-5 h-5" /> : <step.icon className="w-5 h-5" />}
                      </div>
                      <span className={`mt-2 text-sm font-medium ${isActive ? "text-[#1A365D]" : "text-slate-400"}`}>
                        {step.name}
                      </span>
                   </div>
                 )
              })}
           </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
                <AnimatePresence mode="wait">
                    {currentStep === 1 && (
                        <motion.div 
                           key="step1"
                           initial={{ opacity: 0, x: 20 }}
                           animate={{ opacity: 1, x: 0 }}
                           exit={{ opacity: 0, x: -20 }}
                           className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-6"
                        >
                            <h2 className="text-xl font-serif text-[#1A365D] font-bold">配送信息</h2>
                            
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>收货人姓名 (或昵称)</Label>
                                    <Input placeholder="张先生/小姐" />
                                </div>
                                <div className="space-y-2">
                                    <Label>联系电话</Label>
                                    <Input placeholder="138 **** ****" />
                                </div>
                            </div>
                            
                            <div className="space-y-2">
                                <Label>配送地址</Label>
                                <Input placeholder="省、市、区、街道及详细地址" />
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>城市</Label>
                                    <Input placeholder="北京/上海/广州..." />
                                </div>
                                <div className="space-y-2">
                                    <Label>邮政编码</Label>
                                    <Input placeholder="100000" />
                                </div>
                            </div>

                            <div className="pt-4 space-y-4">
                                <Label className="flex items-center gap-2 font-bold text-[#1A365D]">
                                    <Package className="w-4 h-4" />
                                    隐私包装选项
                                </Label>
                                <RadioGroup defaultValue="stealth" onValueChange={setPrivacyOption} className="grid gap-3">
                                    <div className={`flex items-start space-x-3 p-4 border rounded-xl cursor-pointer transition-all ${privacyOption === 'standard' ? 'border-[#1A365D] bg-blue-50/20' : 'border-slate-200 hover:border-slate-300'}`}>
                                        <RadioGroupItem value="standard" id="pkg-1" className="mt-1" />
                                        <div className="grid gap-1">
                                            <Label htmlFor="pkg-1" className="font-medium cursor-pointer">标准隐私包装</Label>
                                            <p className="text-sm text-slate-500">纯色无标识纸箱。发货人显示为“海蓝物流”。</p>
                                        </div>
                                    </div>
                                    <div className={`flex items-start space-x-3 p-4 border rounded-xl cursor-pointer transition-all ${privacyOption === 'stealth' ? 'border-[#1A365D] bg-blue-50/20' : 'border-slate-200 hover:border-slate-300'}`}>
                                        <RadioGroupItem value="stealth" id="pkg-2" className="mt-1" />
                                        <div className="grid gap-1">
                                            <Label htmlFor="pkg-2" className="font-medium cursor-pointer">极致伪装包装</Label>
                                            <p className="text-sm text-slate-500">伪装为“办公用品”或“健康补给”。双层加固。随机发货人名称。</p>
                                        </div>
                                    </div>
                                </RadioGroup>
                            </div>
                            
                            <div className="pt-4 space-y-4">
                                <Label className="flex items-center gap-2 font-bold text-[#1A365D]">
                                    <Clock className="w-4 h-4" />
                                    配送时间偏好
                                </Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="选择您方便的收货时间" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="asap">尽快送达</SelectItem>
                                        <SelectItem value="weekend">仅限周末配送</SelectItem>
                                        <SelectItem value="evening">晚间配送 (18:00 后)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </motion.div>
                    )}

                    {currentStep === 2 && (
                        <motion.div 
                           key="step2"
                           initial={{ opacity: 0, x: 20 }}
                           animate={{ opacity: 1, x: 0 }}
                           exit={{ opacity: 0, x: -20 }}
                           className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-6"
                        >
                             <h2 className="text-xl font-serif text-[#1A365D] font-bold">支付方式</h2>
                             <div className="bg-blue-50 p-4 rounded-lg flex items-start gap-3 text-sm text-blue-800">
                                 <Lock className="w-5 h-5 shrink-0" />
                                 <p>您的支付信息已加密。交易记录在账单上将显示为“HL-Lifestyle”以保护隐私。</p>
                             </div>

                             <div className="space-y-4">
                                 <div className="p-4 border border-[#1A365D] bg-blue-50/20 rounded-xl flex items-center gap-4 cursor-pointer">
                                     <div className="w-5 h-5 rounded-full border border-slate-300 flex items-center justify-center">
                                         <div className="w-3 h-3 bg-[#1A365D] rounded-full" />
                                     </div>
                                     <CreditCard className="w-6 h-6 text-slate-600" />
                                     <span className="font-medium">在线支付 (支付宝/微信/银联)</span>
                                 </div>
                                 
                                 <div className="p-4 border rounded-xl flex items-center gap-4 opacity-50 cursor-not-allowed">
                                     <div className="w-5 h-5 rounded-full border border-slate-300" />
                                     <span className="font-medium">数字货币支付 (即将推出)</span>
                                 </div>
                             </div>
                        </motion.div>
                    )}

                    {currentStep === 3 && (
                        <motion.div 
                           key="step3"
                           initial={{ opacity: 0, x: 20 }}
                           animate={{ opacity: 1, x: 0 }}
                           exit={{ opacity: 0, x: -20 }}
                           className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-6"
                        >
                            <h2 className="text-xl font-serif text-[#1A365D] font-bold">确认订单</h2>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center py-2 border-b border-slate-100">
                                    <span className="text-slate-500">商品总计</span>
                                    <span className="font-medium">¥{cartTotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-slate-100">
                                    <span className="text-slate-500">配送费用 ({privacyOption === 'stealth' ? '极致伪装' : '标准'})</span>
                                    <span className="font-medium text-emerald-600">免费</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-slate-100">
                                    <span className="text-slate-500">税费/服务费</span>
                                    <span className="font-medium">¥0.00</span>
                                </div>
                                <div className="flex justify-between items-center py-4 text-2xl font-bold text-[#1A365D]">
                                    <span>应付总计</span>
                                    <span>¥{cartTotal.toLocaleString()}</span>
                                </div>
                            </div>
                            
                            <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4">
                                <div className="flex items-center gap-2 text-emerald-700 font-bold mb-1">
                                    <ShieldCheck className="w-4 h-4" />
                                    海蓝隐私保证
                                </div>
                                <p className="text-sm text-emerald-600">
                                    您的订单将采用无标识包装。配送面单及银行对账单均不显示商品名称。
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
                
                <div className="mt-8 flex justify-between">
                    <Button variant="ghost" onClick={handleBack} className="text-slate-500">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        返回
                    </Button>
                    <Button onClick={handleNext} className="bg-[#1A365D] hover:bg-[#2A4365] px-12 h-12 rounded-xl text-lg shadow-md">
                        {currentStep === 3 ? "提交订单" : "下一步"}
                    </Button>
                </div>
            </div>

            <div className="lg:col-span-4 hidden lg:block">
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 sticky top-24">
                    <h3 className="font-bold text-[#1A365D] mb-4">订单摘要</h3>
                    <div className="flex justify-between text-sm mb-2">
                        <span className="text-slate-500">商品小计</span>
                        <span className="font-bold">¥{cartTotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm mb-2">
                        <span className="text-slate-500">配送</span>
                        <span className="text-emerald-600 font-medium">免运费</span>
                    </div>
                    <div className="text-xs text-slate-400 mt-6 leading-relaxed">
                        提交订单即代表您同意海蓝的服务条款与隐私政策。我们承诺对您的所有信息严格保密。
                    </div>
                </div>
            </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
