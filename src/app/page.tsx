import React from 'react';
import { WelcomeBanner } from '@/components/dashboard/WelcomeBanner';
import { Button } from '@/components/ui/button';
import { BookOpen, School, ChevronRight, Sparkles, Database, GraduationCap, Library } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="h-screen w-full bg-[#F8FAFC] flex flex-col overflow-hidden">
      {/* Direct Content Layout - No outer Card wrapper */}
      <div className="flex-1 flex flex-col max-w-7xl mx-auto w-full px-8 py-6 gap-6">
        
        {/* Banner Section */}
        <section className="flex-none">
          <WelcomeBanner />
        </section>

        {/* Knowledge Modules - Direct Display */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col p-6 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 transition-all hover:shadow-lg group">
            <div className="flex items-center gap-3 mb-3">
              <div className="text-primary bg-primary/10 p-2.5 rounded-xl group-hover:bg-primary group-hover:text-white transition-colors">
                <GraduationCap className="h-6 w-6" />
              </div>
              <h2 className="text-lg font-bold text-slate-900">政策文件库</h2>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed">
              全面收录国家及各省市教育政策、法律法规、行业标准及改革方案，为科研与管理提供权威参考。
            </p>
          </div>

          <div className="flex flex-col p-6 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 transition-all hover:shadow-lg group">
            <div className="flex items-center gap-3 mb-3">
              <div className="text-primary bg-primary/10 p-2.5 rounded-xl group-hover:bg-primary group-hover:text-white transition-colors">
                <School className="h-6 w-6" />
              </div>
              <h2 className="text-lg font-bold text-slate-900">教学资源库</h2>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed">
              整合精品课件、教学案例、多媒体素材及优质教案，支持跨学科资源沉淀，助力教师卓越教学。
            </p>
          </div>

          <div className="flex flex-col p-6 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 transition-all hover:shadow-lg group">
            <div className="flex items-center gap-3 mb-3">
              <div className="text-primary bg-primary/10 p-2.5 rounded-xl group-hover:bg-primary group-hover:text-white transition-colors">
                <BookOpen className="h-6 w-6" />
              </div>
              <h2 className="text-lg font-bold text-slate-900">科研成果库</h2>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed">
              汇聚历年学术论文、课题报告、教育调查报告及科研专利，促进知识复用与重大学术创新。
            </p>
          </div>
        </section>

        {/* AI Action Section - Compact CTA */}
        <section className="mt-auto mb-4 relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 text-white shadow-xl">
          <div className="absolute top-0 right-0 -mt-8 -mr-8 opacity-10">
            <Library className="h-64 w-64" />
          </div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-2">
              <h3 className="text-2xl font-black flex items-center gap-3">
                <Sparkles className="h-6 w-6 text-blue-300 fill-current" />
                EduWisdom AI 智库引擎
              </h3>
              <p className="text-blue-100 max-w-2xl text-sm font-medium opacity-90 leading-relaxed">
                深度整合教育垂直领域知识，通过 RAG 技术实现毫秒级精准问答、自动摘要及深度综述，赋能每一位教育工作者。
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
                新手指引
              </Button>
            </div>
          </div>
        </section>
      </div>

      {/* Simplified Footer */}
      <footer className="bg-white border-t border-slate-200 py-4 flex-none px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
          <div className="flex items-center gap-2">
            <Database className="h-3 w-3 text-primary" />
            <span>EduWisdom AI System v3.0</span>
          </div>
          <div className="flex gap-6">
            <span>© 2024 中国教育科学研究院 (NIES)</span>
            <span className="hidden sm:inline px-2 py-0.5 bg-blue-50 text-primary rounded border border-blue-100">机密等级：内部公开</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
