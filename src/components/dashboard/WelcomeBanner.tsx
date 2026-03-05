'use client';

import React from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function WelcomeBanner() {
  const bannerImg = PlaceHolderImages.find(img => img.id === 'banner-illustration');

  return (
    <div className="w-full flex flex-col md:flex-row items-center gap-8">
      <div className="flex-1 space-y-3">
        <div className="inline-flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
          <p className="text-blue-700 text-[10px] font-black uppercase tracking-[0.2em]">Intellectual Education Hub</p>
        </div>
        <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-5xl leading-tight">
          欢迎使用 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">EduWisdom AI</span>
        </h1>
        <p className="text-slate-500 text-sm sm:text-base max-w-2xl leading-relaxed font-medium">
          教育科学智能知识管理系统，整合国家政策、教学资源与前沿科研成果，利用大语言模型赋能高效科研与教学办公。
        </p>
      </div>
      
      <div className="relative w-full md:w-[320px] aspect-video rounded-2xl overflow-hidden shadow-xl border border-white shrink-0">
        {bannerImg && (
          <Image 
            src={bannerImg.imageUrl}
            alt={bannerImg.description}
            fill
            className="object-cover"
            data-ai-hint="educational research"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent" />
      </div>
    </div>
  );
}
