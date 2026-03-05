import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function WelcomeBanner() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary/10 via-accent/10 to-transparent p-8 sm:p-12 mb-8 border border-primary/5">
      <div className="relative z-10 max-w-2xl">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
          您好，欢迎进入 AI 知识库系统～
        </h1>
        <p className="text-lg text-muted-foreground mb-8 max-w-lg leading-relaxed">
          基于中国教育科学研究院核心数据构建，支持 RAG 智能问答、多维知识检索与学术写作辅助，为您提供更专业的教育科研支持。
        </p>
        <Button className="rounded-full px-8 py-6 h-auto text-lg gap-2 shadow-lg shadow-primary/20 hover:scale-105 transition-transform">
          新手指南
          <ArrowRight className="h-5 w-5" />
        </Button>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute right-0 top-0 bottom-0 w-1/3 hidden lg:flex items-center justify-center pointer-events-none opacity-80">
        <div className="relative w-64 h-64">
          <div className="absolute top-0 right-0 w-48 h-48 bg-primary/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent/30 rounded-full blur-2xl animate-bounce duration-10000" />
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full relative z-10">
            <path fill="currentColor" className="text-primary/20" d="M47.1,-57.1C60.1,-47.9,68.9,-31.9,71.1,-15.5C73.3,1,68.9,17.9,60.1,32.4C51.3,46.9,38.1,59,22.7,64.8C7.3,70.5,-10.3,69.9,-25.7,63.5C-41.1,57.1,-54.3,44.9,-61.7,30.3C-69.1,15.7,-70.7,-1.4,-66.4,-17.1C-62.1,-32.8,-51.9,-47.1,-38.9,-56.3C-25.9,-65.5,-12.9,-69.6,2.2,-72.2C17.3,-74.8,34.1,-66.3,47.1,-57.1Z" transform="translate(100 100)" />
          </svg>
        </div>
      </div>
    </div>
  );
}