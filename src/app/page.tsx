import React from 'react';
import Image from 'next/image';
import { Lightbulb, Box, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F5F7FA] flex flex-col font-body overflow-hidden">
      {/* 主体内容区 */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-8 flex flex-col justify-center gap-6">
        
        {/* Banner 区域 - 遵循 4px 圆角与扁平科技风 */}
        <section className="relative w-full aspect-[21/6] bg-white rounded-sm border border-[#DCDFE6] overflow-hidden shadow-sm shrink-0">
          <Image 
            src="https://picsum.photos/seed/aviation-tech/1200/400" 
            alt="航空工业 智能知识库"
            fill
            className="object-cover opacity-90"
            priority
            data-ai-hint="aviation technology flat illustration"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/40 to-transparent" />
        </section>

        {/* 欢迎语 - 遵循主文本 #1D2129 与字号规范 */}
        <section className="space-y-2">
          <h1 className="text-[20px] font-bold text-[#1D2129] tracking-tight">欢迎进入 航空工业 智能知识库系统</h1>
          <p className="text-[#909399] text-[14px] leading-[22px] max-w-4xl">
            本系统是航空工业数字化转型的核心支撑平台，整合机构、共享及个人三大核心知识资产，通过 AI 技术赋能高效知识交互与科研协同。
          </p>
        </section>

        {/* 核心模块 - 使用 24 栅格理念与标准间距 */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* 核心知识库模块 */}
          <div className="bg-white p-5 rounded-sm border border-[#DCDFE6] space-y-3 transition-all hover:border-[#1E89FF]/30">
            <div className="flex items-center gap-2">
              <div className="bg-[#1E89FF] p-1.5 rounded-sm">
                <Lightbulb className="h-4 w-4 text-white" />
              </div>
              <h2 className="text-[14px] font-bold text-[#1D2129]">核心知识库模块</h2>
            </div>
            <ul className="space-y-2 text-[14px] leading-[22px] text-[#606266] list-none">
              <li className="flex gap-2">
                <span className="text-[#1E89FF] font-bold">·</span>
                <span><strong className="text-[#1D2129]">机构知识库：</strong>系统化沉淀科研成果、政策文件等核心资产。</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#1E89FF] font-bold">·</span>
                <span><strong className="text-[#1D2129]">共享知识库：</strong>跨部门知识流通，促进经验与成果共建共用。</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#1E89FF] font-bold">·</span>
                <span><strong className="text-[#1D2129]">我的知识库：</strong>个性化私人知识中心，支持自定义收藏与整理。</span>
              </li>
            </ul>
          </div>

          {/* 核心功能亮点 */}
          <div className="bg-white p-5 rounded-sm border border-[#DCDFE6] space-y-3 transition-all hover:border-[#1E89FF]/30">
            <div className="flex items-center gap-2">
              <div className="bg-[#1E89FF] p-1.5 rounded-sm">
                <Box className="h-4 w-4 text-white" />
              </div>
              <h2 className="text-[14px] font-bold text-[#1D2129]">核心功能亮点</h2>
            </div>
            <ul className="space-y-2 text-[14px] leading-[22px] text-[#606266] list-none">
              <li className="flex gap-2">
                <span className="text-[#1E89FF] font-bold">·</span>
                <span><strong className="text-[#1D2129]">多格式兼容：</strong>支持各类科研文档、音视频素材的快速入库。</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#1E89FF] font-bold">·</span>
                <span><strong className="text-[#1D2129]">AI 智能问答：</strong>基于 RAG 架构实现专业级精准检索与决策支持。</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#1E89FF] font-bold">·</span>
                <span><strong className="text-[#1D2129]">安全管控：</strong>严格遵循集团密级管理规范，确保知识资产安全。</span>
              </li>
            </ul>
          </div>
        </section>

        {/* 底部按钮 - 遵循主色 #1E89FF */}
        <section className="flex justify-center pt-4">
          <Button asChild className="bg-[#1E89FF] hover:bg-[#006DEA] text-white rounded-sm px-10 h-10 text-[14px] font-medium transition-all shadow-none">
            <Link href="/chat" className="flex items-center gap-2">
              进入系统
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </section>
      </main>

      {/* 页脚 - 规范要求包含版权信息 */}
      <footer className="py-4 border-t border-[#DCDFE6] bg-white text-center">
        <p className="text-[12px] text-[#909399]">
          © 航空工业 版权所有 | 技术支持：数字化中心
        </p>
      </footer>
    </div>
  );
}
