
'use client';

import React from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function WelcomeBanner() {
  const bannerImg = PlaceHolderImages.find(img => img.id === 'banner-illustration');

  return (
    <div className="w-full mb-6">
      <div className="relative w-full aspect-[4/1] sm:aspect-[5/1] rounded-xl overflow-hidden bg-[#E2EFFF]">
        {bannerImg && (
          <Image 
            src={bannerImg.imageUrl}
            alt={bannerImg.description}
            fill
            className="object-cover mix-blend-multiply opacity-80"
            data-ai-hint={bannerImg.imageHint}
          />
        )}
      </div>
      
      <div className="mt-4 space-y-2">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          您好，欢迎进入AI知识库系统～
        </h1>
        <p className="text-muted-foreground text-xs sm:text-sm max-w-4xl leading-relaxed">
          中国教育科学研究院 AI 知识库系统是一款聚焦教育科研领域的智能知识管理与应用平台，整合三大核心知识库模块，融合 AI 技术赋能高效知识交互。
        </p>
      </div>
    </div>
  );
}
