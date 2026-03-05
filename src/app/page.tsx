import React from 'react';
import Image from 'next/image';
import { Lightbulb, Box, ChevronRight, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      {/* 顶部导航栏 */}
      <header className="h-14 flex items-center justify-between px-6 border-b border-slate-100 bg-white sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-800 text-sm">知识库主页</span>
        </div>
        <div className="flex items-center gap-2 cursor-pointer hover:bg-slate-50 px-2 py-1 rounded-lg transition-colors">
          <Avatar className="h-7 w-7 border border-slate-100">
            <AvatarImage src="https://picsum.photos/seed/user-avatar/200" />
            <AvatarFallback>张</AvatarFallback>
          </Avatar>
          <span className="text-xs font-medium text-slate-700">张三</span>
          <ChevronDown className="h-3 w-3 text-slate-400" />
        </div>
      </header>

      {/* 主体内容区 */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-4 flex flex-col gap-6">
        
        {/* 插画横幅 Banner */}
        <section className="relative w-full aspect-[21/6] bg-[#E3F2FD] rounded-xl overflow-hidden shadow-sm">
          <Image 
            src="https://picsum.photos/seed/edu-illustration-v2/1200/400" 
            alt="AI Knowledge Base Illustration"
            fill
            className="object-cover opacity-90"
            priority
            data-ai-hint="educational illustration"
          />
          {/* 这里可以叠加一些简单的装饰性元素或遮罩，以匹配原图的清新感 */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#E3F2FD]/20 to-transparent" />
        </section>

        {/* 欢迎语与介绍 */}
        <section className="space-y-2">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">您好，欢迎进入AI知识库系统～</h1>
          <p className="text-slate-400 text-[13px] leading-relaxed max-w-4xl">
            中国教育科学研究院 AI 知识库系统是一款聚焦教育科研领域的智能知识管理与应用平台，整合三大核心知识库模块，融合 AI 技术赋能高效知识交互。
          </p>
        </section>

        {/* 核心模块与亮点 - 垂直堆叠以保持紧凑 */}
        <section className="flex flex-col gap-4">
          
          {/* 核心知识库模块 */}
          <div className="bg-[#F8FAFF] p-5 rounded-xl border border-[#EDF2F7] space-y-3">
            <div className="flex items-center gap-2">
              <div className="bg-[#FFD600] p-1 rounded-md shadow-sm">
                <Lightbulb className="h-4 w-4 text-white" />
              </div>
              <h2 className="text-sm font-bold text-slate-800">核心知识库模块</h2>
            </div>
            <ul className="space-y-2 text-[13px] text-slate-500 pl-7 list-none relative">
              <li className="relative before:content-['•'] before:absolute before:-left-4 before:text-slate-300">
                <span className="font-semibold text-slate-700">机构知识库：</span>
                汇聚中国教育科学研究院各类科研成果、政策文件、研究报告等核心资源，实现机构知识资产的系统化沉淀与管理。
              </li>
              <li className="relative before:content-['•'] before:absolute before:-left-4 before:text-slate-300">
                <span className="font-semibold text-slate-700">共享知识库：</span>
                搭建开放共享的知识交流空间，支持跨部门、跨领域的知识流通，促进科研经验与成果的共建共用。
              </li>
              <li className="relative before:content-['•'] before:absolute before:-left-4 before:text-slate-300">
                <span className="font-semibold text-slate-700">我的知识库：</span>
                提供个性化知识存储功能，用户可自定义收藏、整理专属知识内容，打造私人化知识管理中心。
              </li>
            </ul>
          </div>

          {/* 核心功能亮点 */}
          <div className="bg-[#F8FAFF] p-5 rounded-xl border border-[#EDF2F7] space-y-3">
            <div className="flex items-center gap-2">
              <div className="bg-[#2979FF] p-1 rounded-md shadow-sm">
                <Box className="h-4 w-4 text-white" />
              </div>
              <h2 className="text-sm font-bold text-slate-800">核心功能亮点</h2>
            </div>
            <ul className="space-y-2 text-[13px] text-slate-500 pl-7 list-none">
              <li className="relative before:content-['•'] before:absolute before:-left-4 before:text-slate-300">
                <span className="font-semibold text-slate-700">灵活新增：</span>
                支持用户自主上传、录入文档、数据、案例等各类知识素材，支持多格式文件导入，丰富知识库内容生态。
              </li>
              <li className="relative before:content-['•'] before:absolute before:-left-4 before:text-slate-300">
                <span className="font-semibold text-slate-700">AI 智能问答：</span>
                嵌入先进 AI 交互功能，基于检索增强生成 (RAG) 架构，快速检索三大知识库相关内容并生成精准解答。用户可通过自然语言提问，高效获取关键信息、解决科研疑问，避免信息检索繁琐耗时的问题。
              </li>
            </ul>
          </div>
        </section>

        {/* 底部按钮 */}
        <section className="flex justify-center mt-2">
          <Button asChild className="bg-[#2979FF] hover:bg-[#1E88E5] text-white rounded-lg px-8 h-10 text-sm font-medium transition-all shadow-md active:scale-95">
            <Link href="/chat" className="flex items-center gap-1.5">
              新手指南
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </section>
      </main>
    </div>
  );
}
