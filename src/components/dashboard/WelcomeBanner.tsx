'use client';

import React from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function WelcomeBanner() {
  const bannerImg = PlaceHolderImages.find(img => img.id === 'banner-illustration');

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="relative w-full aspect-[21/6] rounded-3xl overflow-hidden shadow-inner bg-gradient-to-br from-blue-100 to-indigo-100">
        {bannerImg && (
          <Image 
            src={bannerImg.imageUrl}
            alt={bannerImg.description}
            fill
            className="object-cover mix-blend-multiply opacity-60"
            data-ai-hint="aviation manufacturing"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-transparent flex items-center px-10">
          <div className="bg-white/20 backdrop-blur-md border border-white/30 p-4 rounded-2xl">
            <p className="text-white text-xs font-bold uppercase tracking-widest">数字化工厂 · 智能智造</p>
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
          欢迎使用 <span className="text-blue-600">领航智库</span>
        </h1>
        <p className="text-slate-500 text-sm sm:text-base max-w-3xl leading-relaxed font-medium">
          航空制造智能知识管理系统，整合行业标准、制造工艺与研发成果，利用大模型技术赋能高效科研生产交互，构建航空领域专属知识生态。
        </p>
      </div>
    </div>
  );
}
