
import React from 'react';
import { WelcomeBanner } from '@/components/dashboard/WelcomeBanner';
import { Button } from '@/components/ui/button';
import { Lightbulb, Box, ChevronRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 flex flex-col h-full">
      <WelcomeBanner />

      <div className="space-y-4">
        {/* Knowledge Base Modules Section */}
        <div className="bg-[#F8FAFF] rounded-xl p-5 border border-primary/5">
          <div className="flex items-center gap-2 mb-3">
            <div className="text-yellow-500">
              <Lightbulb className="h-5 w-5 fill-current" />
            </div>
            <h2 className="text-base font-bold">核心知识库模块</h2>
          </div>
          
          <ul className="space-y-2.5 text-xs sm:text-sm">
            <li className="flex gap-2">
              <span className="font-bold whitespace-nowrap">• 机构知识库:</span>
              <span className="text-muted-foreground leading-snug">
                汇聚中国教育科学研究院各类科研成果、政策文件、研究报告等核心资源，实现机构知识资产的系统化沉淀与管理。
              </span>
            </li>
            <li className="flex gap-2">
              <span className="font-bold whitespace-nowrap">• 共享知识库:</span>
              <span className="text-muted-foreground leading-snug">
                搭建开放共享的知识交流空间，支持跨部门、跨领域的知识流通，促进科研经验与成果的共建共用。
              </span>
            </li>
            <li className="flex gap-2">
              <span className="font-bold whitespace-nowrap">• 我的知识库:</span>
              <span className="text-muted-foreground leading-snug">
                提供个性化知识存储功能，用户可自定义收藏、整理专属知识内容，打造私人化知识管理中心。
              </span>
            </li>
          </ul>
        </div>

        {/* Core Features Highlights Section */}
        <div className="bg-[#F8FAFF] rounded-xl p-5 border border-primary/5">
          <div className="flex items-center gap-2 mb-3">
            <div className="text-primary">
              <Box className="h-5 w-5" />
            </div>
            <h2 className="text-base font-bold">核心功能亮点</h2>
          </div>
          
          <ul className="space-y-2.5 text-xs sm:text-sm">
            <li className="flex gap-2">
              <span className="font-bold whitespace-nowrap">• 灵活新增:</span>
              <span className="text-muted-foreground leading-snug">
                支持用户自主上传、录入文档、数据、案例等各类知识素材，支持多格式文件导入，丰富知识库内容生态。
              </span>
            </li>
            <li className="flex gap-2">
              <span className="font-bold whitespace-nowrap">• AI 智能问答:</span>
              <span className="text-muted-foreground leading-snug">
                嵌入先进 AI 交互功能，基于检索增强生成 (RAG) 架构，快速检索三大知识库相关内容并生成精准解答。
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-6 flex justify-center pb-4">
        <Button className="bg-primary hover:bg-primary/90 text-white rounded-lg px-8 py-5 h-auto text-sm gap-2 shadow-lg shadow-primary/20">
          新手指南
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
