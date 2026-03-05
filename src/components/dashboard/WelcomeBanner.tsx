'use client';

import React from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function WelcomeBanner() {
  const bannerImg = PlaceHolderImages.find(img => img.id === 'banner-illustration');

  return (
    <div className="w-full flex flex-col md:flex-row items-center gap-10">
      <div className="flex-1 space-y-4">
        <div className="inline-flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100">
          <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
          <p className="text-blue-700 text-[10px] font-black uppercase tracking-[0.2em]">Digitized Aerospace Factory</p>
        </div>
        <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl leading-tight">
          欢迎使用 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">领航智库</span>
        </h1>
        <p className="text-slate-500 text-base sm:text-lg max-w-2xl leading-relaxed font-medium">
          航空制造智能知识管理系统，整合行业标准、制造工艺与研发成果，利用前沿大模型技术赋能高效科研生产，构建航空领域专属知识生态。
        </p>
      </div>
      
      <div className="relative w-full md:w-1/3 aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-white">
        {bannerImg && (
          <Image 
            src={bannerImg.imageUrl}
            alt={bannerImg.description}
            fill
            className="object-cover"
            data-ai-hint="aviation manufacturing"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent" />
      </div>
    </div>
  );
}
