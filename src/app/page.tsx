import React from 'react';
import { WelcomeBanner } from '@/components/dashboard/WelcomeBanner';
import { Button } from '@/components/ui/button';
import { Plane, Settings2, ChevronRight, Sparkles, FileText, Database, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="h-screen w-full bg-[#F0F4F8] flex items-center justify-center p-4">
      <div className="max-w-5xl w-full bg-white rounded-[2rem] shadow-2xl shadow-blue-900/10 border border-blue-100 overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex-1 p-6 sm:p-10 flex flex-col gap-6 overflow-y-auto scrollbar-hide">
          <WelcomeBanner />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Aviation Standards */}
            <div className="bg-slate-50 rounded-2xl p-5 border border-blue-50 hover:border-blue-200 transition-colors">
              <div className="flex items-center gap-2 mb-3">
                <div className="text-blue-600 bg-blue-100 p-2 rounded-xl">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <h2 className="text-base font-bold text-slate-800">航空标准库</h2>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                收录国内外航空制造标准、适航法规及质量体系文件，确保生产流程高度合规。
              </p>
            </div>

            {/* Process Engineering */}
            <div className="bg-slate-50 rounded-2xl p-5 border border-blue-50 hover:border-blue-200 transition-colors">
              <div className="flex items-center gap-2 mb-3">
                <div className="text-blue-600 bg-blue-100 p-2 rounded-xl">
                  <Settings2 className="h-5 w-5" />
                </div>
                <h2 className="text-base font-bold text-slate-800">工艺规程库</h2>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                沉淀关键零件制造工艺、部组件装配流程及特种工艺参数，赋能一线生产。
              </p>
            </div>

            {/* Research & Models */}
            <div className="bg-slate-50 rounded-2xl p-5 border border-blue-50 hover:border-blue-200 transition-colors">
              <div className="flex items-center gap-2 mb-3">
                <div className="text-blue-600 bg-blue-100 p-2 rounded-xl">
                  <Database className="h-5 w-5" />
                </div>
                <h2 className="text-base font-bold text-slate-800">科研型号库</h2>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                整合历史机型研发数据、试验报告及改进方案，助力跨型号技术创新与成果转化。
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 bg-blue-600 rounded-3xl p-6 sm:px-10 text-white shadow-lg">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="text-lg font-bold flex items-center justify-center sm:justify-start gap-2">
                <Sparkles className="h-5 w-5 fill-current" />
                AI 智能工艺辅助
              </h3>
              <p className="text-sm text-blue-100 opacity-90">基于 RAG 架构实现毫秒级技术文档检索与精准问答</p>
            </div>
            <div className="flex gap-3 shrink-0">
              <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-blue-50 rounded-xl px-8 font-bold shadow-md">
                <Link href="/chat">
                  进入系统
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 rounded-xl px-8 font-medium">
                操作手册
              </Button>
            </div>
          </div>
        </div>
        
        <div className="bg-slate-50/80 py-4 px-10 border-t border-slate-100 flex justify-between items-center text-[11px] text-slate-400 font-medium">
          <div className="flex items-center gap-2">
            <Plane className="h-3 w-3" />
            <span className="uppercase tracking-widest">PilotMind AI Engine v2.0</span>
          </div>
          <div className="flex gap-6">
            <span>© 2024 中国航空制造技术研究院</span>
            <span className="hidden sm:inline">安全级别：机密级 (L3)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
