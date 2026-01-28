import React from "react";
import { Shield, Facebook, Twitter, Instagram, Heart } from "lucide-react";
import { BrandLogo } from "@/app/components/BrandLogo";

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand & Mission */}
          <div className="space-y-4">
            <BrandLogo variant="full" size="md" />
            <p className="text-slate-300 text-sm leading-relaxed">
              以隐私优先的技术和优雅设计，赋能您的私密健康之旅。我们相信安全、智能且精致的愉悦体验。
            </p>
            <div className="flex gap-4 pt-2">
               <SocialIcon icon={Twitter} />
               <SocialIcon icon={Facebook} />
               <SocialIcon icon={Instagram} />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">探索</h3>
            <ul className="space-y-2 text-neutral-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">全部商品</a></li>
              <li><a href="#" className="hover:text-white transition-colors">新品上市</a></li>
              <li><a href="#" className="hover:text-white transition-colors">健康指南</a></li>
              <li><a href="#" className="hover:text-white transition-colors">礼品卡</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-bold text-lg mb-4">支持</h3>
            <ul className="space-y-2 text-neutral-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">帮助中心</a></li>
              <li><a href="#" className="hover:text-white transition-colors">隐私政策</a></li>
              <li><a href="#" className="hover:text-white transition-colors">服务条款</a></li>
              <li><a href="#" className="hover:text-white transition-colors">隐私配送</a></li>
            </ul>
          </div>

          {/* Privacy Promise */}
          <div className="bg-neutral-800 p-6 rounded-2xl">
            <div className="flex items-center gap-2 text-brand-gold mb-3">
              <Shield className="w-5 h-5" />
              <span className="font-bold">隐私承诺</span>
            </div>
            <p className="text-neutral-400 text-xs mb-4">
              我们采用银行级加密和零知识存储。您的数据仅属于您。
            </p>
            <div className="flex gap-2">
               <Badge text="SSL 加密" />
               <Badge text="隐私保护" />
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-neutral-500">
           <p>© 2026 海蓝健康。保留所有权利。</p>
           <p className="flex items-center gap-1">用 <Heart className="w-3 h-3 text-red-500 fill-current" /> 为隐私而创。</p>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ icon: Icon }: { icon: React.ElementType }) {
   return (
      <a href="#" className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center text-neutral-400 hover:bg-brand-deep-blue hover:text-white transition-all">
         <Icon className="w-5 h-5" />
      </a>
   )
}

function Badge({ text }: { text: string }) {
   return (
      <span className="px-2 py-1 rounded bg-neutral-700 text-neutral-300 text-[10px] uppercase tracking-wider">
         {text}
      </span>
   )
}