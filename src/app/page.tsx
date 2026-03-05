import React from 'react';
import { WelcomeBanner } from '@/components/dashboard/WelcomeBanner';
import { Button } from '@/components/ui/button';
import { Plane, Settings2, ChevronRight, Sparkles, Database, ShieldCheck, Factory } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-[#F8FAFC] flex flex-col">
      {/* Top Section: Hero & Header Info */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <WelcomeBanner />
        </div>
      </div>

      {/* Middle Section: Core Knowledge Bases */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Aviation Standards */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-blue-300 transition-all hover:shadow-md group">
            <div className="flex items-center gap-3 mb-4">
              <div className="text-blue-600 bg-blue-50 p-2.5 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h2 className="text-lg font-bold text-slate-900">航空标准库</h2>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed">
              收录国内外航空制造标准 (NAS, AS9100)、适航法规及质量体系文件，确保所有生产环节高度合规。
            </p>
          </div>

          {/* Process Engineering */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-blue-300 transition-all hover:shadow-md group">
            <div className="flex items-center gap-3 mb-4">
              <div className="text-blue-600 bg-blue-50 p-2.5 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Settings2 className="h-6 w-6" />
              </div>
              <h2 className="text-lg font-bold text-slate-900">工艺规程库</h2>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed">
              沉淀关键零件制造工艺、复合材料铺叠流程及特种工艺参数，赋能数字化车间一线生产。
            </p>
          </div>

          {/* Research & Models */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-blue-300 transition-all hover:shadow-md group">
            <div className="flex items-center gap-3 mb-4">
              <div className="text-blue-600 bg-blue-50 p-2.5 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Database className="h-6 w-6" />
              </div>
              <h2 className="text-lg font-bold text-slate-900">科研型号库</h2>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed">
              整合历史机型研发数据、强度试验报告及改进方案，助力跨型号技术创新与知识复用。
            </p>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-700 to-indigo-800 rounded-3xl p-8 text-white shadow-xl">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 opacity-10">
            <Factory className="h-64 w-64" />
          </div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 text-center md:text-left">
              <h3 className="text-2xl font-black flex items-center justify-center md:justify-start gap-3">
                <Sparkles className="h-6 w-6 text-blue-300 fill-current" />
                领航智库 AI 引擎
              </h3>
              <p className="text-blue-100 max-w-2xl text-base opacity-90 font-medium leading-relaxed">
                基于航空制造专属大模型的 RAG 架构，实现毫秒级技术文档检索与精准问答，辅助工程师快速决策。
              </p>
            </div>
            <div className="flex gap-4 shrink-0">
              <Button asChild size="lg" className="bg-white text-blue-700 hover:bg-blue-50 rounded-xl px-10 h-14 font-black text-lg shadow-lg">
                <Link href="/chat">
                  进入系统
                  <ChevronRight className="h-5 w-5 ml-1" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="border-white/40 text-white hover:bg-white/10 rounded-xl px-8 h-14 font-bold">
                操作手册
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-400 font-bold uppercase tracking-widest">
          <div className="flex items-center gap-2">
            <Plane className="h-4 w-4 text-blue-600" />
            <span>PilotMind AI Enterprise v2.5</span>
          </div>
          <div className="flex gap-8">
            <span>© 2024 中国航空制造技术研究院 (AVIC MTI)</span>
            <span className="hidden sm:inline px-3 py-1 bg-red-50 text-red-600 rounded-md">安全级别：机密级 (L3)</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
