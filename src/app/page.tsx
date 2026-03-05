import React from 'react';
import { WelcomeBanner } from '@/components/dashboard/WelcomeBanner';
import { Button } from '@/components/ui/button';
import { Lightbulb, Box, ChevronRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 sm:p-8">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-xl shadow-primary/5 border border-primary/10 overflow-hidden">
        <div className="p-6 sm:p-8">
          <WelcomeBanner />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Knowledge Base Modules Section */}
            <div className="bg-[#F8FAFF] rounded-2xl p-5 border border-primary/5 h-full">
              <div className="flex items-center gap-2 mb-3">
                <div className="text-yellow-500 bg-yellow-50 p-1.5 rounded-lg">
                  <Lightbulb className="h-4 w-4 fill-current" />
                </div>
                <h2 className="text-sm font-bold">核心知识库模块</h2>
              </div>
              
              <ul className="space-y-3 text-xs">
                <li className="flex gap-2">
                  <span className="font-bold text-primary shrink-0">•</span>
                  <p className="text-muted-foreground leading-relaxed">
                    <span className="font-bold text-foreground">机构知识库:</span> 汇聚科研成果、政策文件等核心资源，实现系统化沉淀。
                  </p>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-primary shrink-0">•</span>
                  <p className="text-muted-foreground leading-relaxed">
                    <span className="font-bold text-foreground">共享知识库:</span> 搭建开放共享空间，促进跨部门科研经验成果流通。
                  </p>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-primary shrink-0">•</span>
                  <p className="text-muted-foreground leading-relaxed">
                    <span className="font-bold text-foreground">我的知识库:</span> 提供个性化存储，用户可收藏整理专属知识内容。
                  </p>
                </li>
              </ul>
            </div>

            {/* Core Features Highlights Section */}
            <div className="bg-[#F8FAFF] rounded-2xl p-5 border border-primary/5 h-full flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <div className="text-primary bg-primary/5 p-1.5 rounded-lg">
                  <Box className="h-4 w-4" />
                </div>
                <h2 className="text-sm font-bold">核心功能亮点</h2>
              </div>
              
              <ul className="space-y-3 text-xs flex-1">
                <li className="flex gap-2">
                  <span className="font-bold text-primary shrink-0">•</span>
                  <p className="text-muted-foreground leading-relaxed">
                    <span className="font-bold text-foreground">灵活新增:</span> 支持多格式文件自主上传，丰富知识库生态。
                  </p>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-primary shrink-0">•</span>
                  <p className="text-muted-foreground leading-relaxed">
                    <span className="font-bold text-foreground">AI 智能问答:</span> 基于 RAG 架构，跨库检索并生成精准解答。
                  </p>
                </li>
              </ul>

              <div className="mt-6 flex gap-3">
                <Button asChild className="flex-1 bg-primary hover:bg-primary/90 text-white rounded-xl py-5 h-auto text-sm gap-2 shadow-lg shadow-primary/20">
                  <Link href="/chat">
                    进入系统
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" className="flex-1 border-primary/20 text-primary hover:bg-primary/5 rounded-xl py-5 h-auto text-sm">
                  新手指南
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-primary/5 py-3 px-8 border-t border-primary/10 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Sparkles className="h-3 w-3 text-primary" />
            <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Powered by EduWisdom AI Engine</span>
          </div>
          <span className="text-[10px] text-muted-foreground">© 2024 中国教育科学研究院</span>
        </div>
      </div>
    </div>
  );
}
