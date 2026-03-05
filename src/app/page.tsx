import React from 'react';
import Image from 'next/image';
import { Lightbulb, Box, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans overflow-hidden">
      {/* 主体内容区 - 紧凑布局 */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-4 flex flex-col justify-center gap-4">
        
        {/* 插画横幅 Banner - 压缩比例 */}
        <section className="relative w-full aspect-[21/5] bg-[#E3F2FD] rounded-xl overflow-hidden shadow-sm shrink-0">
          <Image 
            src="https://picsum.photos/seed/edu-illustration-v3/1200/300" 
            alt="AI Knowledge Base Illustration"
            fill
            className="object-cover opacity-90"
            priority
            data-ai-hint="educational illustration"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#E3F2FD]/20 to-transparent" />
        </section>

        {/* 欢迎语与介绍 - 减小间距 */}
        <section className="space-y-1">
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">您好，欢迎进入AI知识库系统～</h1>
          <p className="text-slate-400 text-[12px] leading-relaxed max-w-4xl">
            中国教育科学研究院 AI 知识库系统是一款聚焦教育科研领域的智能知识管理与应用平台，整合三大核心知识库模块，融合 AI 技术赋能高效知识交互。
          </p>
        </section>

        {/* 核心模块与亮点 - 紧凑栅格 */}
        <section className="grid grid-cols-1 gap-3">
          
          {/* 核心知识库模块 - 减小内边距 */}
          <div className="bg-[#F8FAFF] p-4 rounded-xl border border-[#EDF2F7] space-y-2">
            <div className="flex items-center gap-2">
              <div className="bg-[#FFD600] p-1 rounded-md shadow-sm">
                <Lightbulb className="h-3.5 w-3.5 text-white" />
              </div>
              <h2 className="text-sm font-bold text-slate-800">核心知识库模块</h2>
            </div>
            <ul className="space-y-1.5 text-[12px] text-slate-500 pl-7 list-none relative">
              <li className="relative before:content-['•'] before:absolute before:-left-4 before:text-slate-300">
                <span className="font-semibold text-slate-700">机构知识库：</span>
                汇聚科研成果、政策文件、研究报告等核心资源，实现知识资产系统化沉淀。
              </li>
              <li className="relative before:content-['•'] before:absolute before:-left-4 before:text-slate-300">
                <span className="font-semibold text-slate-700">共享知识库：</span>
                搭建开放共享空间，支持跨部门知识流通，促进科研经验与成果共建共用。
              </li>
              <li className="relative before:content-['•'] before:absolute before:-left-4 before:text-slate-300">
                <span className="font-semibold text-slate-700">我的知识库：</span>
                提供个性化存储，用户可自定义收藏整理专属内容，打造私人知识中心。
              </li>
            </ul>
          </div>

          {/* 核心功能亮点 */}
          <div className="bg-[#F8FAFF] p-4 rounded-xl border border-[#EDF2F7] space-y-2">
            <div className="flex items-center gap-2">
              <div className="bg-[#2979FF] p-1 rounded-md shadow-sm">
                <Box className="h-3.5 w-3.5 text-white" />
              </div>
              <h2 className="text-sm font-bold text-slate-800">核心功能亮点</h2>
            </div>
            <ul className="space-y-1.5 text-[12px] text-slate-500 pl-7 list-none">
              <li className="relative before:content-['•'] before:absolute before:-left-4 before:text-slate-300">
                <span className="font-semibold text-slate-700">灵活新增：</span>
                支持自主上传、录入多格式素材，丰富知识库内容生态。
              </li>
              <li className="relative before:content-['•'] before:absolute before:-left-4 before:text-slate-300">
                <span className="font-semibold text-slate-700">AI 智能问答：</span>
                基于 RAG 架构，通过自然语言提问，高效获取关键信息、解决科研疑问。
              </li>
            </ul>
          </div>
        </section>

        {/* 底部按钮 */}
        <section className="flex justify-center">
          <Button asChild className="bg-[#2979FF] hover:bg-[#1E88E5] text-white rounded-lg px-8 h-9 text-sm font-medium transition-all shadow-md active:scale-95">
            <Link href="/chat" className="flex items-center gap-1.5">
              进入系统
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </section>
      </main>
    </div>
  );
}
