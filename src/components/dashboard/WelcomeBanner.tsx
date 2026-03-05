
'use client';

import React from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function WelcomeBanner() {
  const bannerImg = PlaceHolderImages.find(img => img.id === 'banner-illustration');

  return (
    <div className="w-full mb-10">
      <div className="relative w-full aspect-[3/1] rounded-2xl overflow-hidden bg-[#E2EFFF]">
        {bannerImg && (
          <Image 
            src={bannerImg.imageUrl}
            alt={bannerImg.description}
            fill
            className="object-cover mix-blend-multiply opacity-80"
            data-ai-hint={bannerImg.imageHint}
          />
        )}
        {/* Fallback decorative elements if image fails or to enhance */}
        <div className="absolute inset-0 flex items-center justify-around pointer-events-none p-12">
          {/* We can use simple SVGs or icons to mimic the style if needed, 
              but the main placeholder image serves as the core visual. */}
        </div>
      </div>
      
      <div className="mt-8 space-y-4">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          您好，欢迎进入AI知识库系统～
        </h1>
        <p className="text-muted-foreground text-sm max-w-4xl leading-relaxed">
          中国教育科学研究院 AI 知识库系统是一款聚焦教育科研领域的智能知识管理与应用平台，整合三大核心知识库模块，融合 AI 技术赋能高效知识交互。
        </p>
      </div>
    </div>
  );
}
