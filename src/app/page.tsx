import React from 'react';
import { WelcomeBanner } from '@/components/dashboard/WelcomeBanner';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Library, Share2, Folder, Zap, MessageSquare, FileSearch } from 'lucide-react';

const MODULES = [
  {
    title: '机构知识库',
    description: '收录教科院权威研究报告、政策文件及统计数据。',
    icon: Library,
    color: 'text-primary',
    bgColor: 'bg-primary/5',
  },
  {
    title: '共享知识库',
    description: '各部门协同沉淀，多层级权限管理的公共知识资源。',
    icon: Share2,
    color: 'text-accent',
    bgColor: 'bg-accent/5',
  },
  {
    title: '我的知识库',
    description: '个人专属空间，支持私有文档上传与个性化知识组织。',
    icon: Folder,
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/5',
  },
];

const FEATURES = [
  {
    title: '灵活知识导入',
    description: '支持 PDF, Word, Markdown 等多种格式，一键索引。',
    icon: Zap,
  },
  {
    title: 'AI 智能问答',
    description: '基于 RAG 架构，精准定位知识源，拒绝 AI 幻觉。',
    icon: MessageSquare,
  },
  {
    title: '多维语义检索',
    description: '跨库关联搜索，深度挖掘隐性知识联系。',
    icon: FileSearch,
  },
];

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto p-6 sm:p-8 space-y-8">
      <WelcomeBanner />

      <section>
        <div className="flex items-center gap-2 mb-6">
          <div className="w-1.5 h-6 bg-primary rounded-full" />
          <h2 className="text-xl font-bold">核心知识库模块</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MODULES.map((module) => (
            <Card key={module.title} className="hover:shadow-md transition-all border-none shadow-sm overflow-hidden group">
              <CardHeader className="pb-2">
                <div className={`${module.bgColor} ${module.color} w-12 h-12 rounded-xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform`}>
                  <module.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-lg">{module.title}</CardTitle>
                <CardDescription className="leading-relaxed">{module.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-primary text-sm font-medium flex items-center gap-1 cursor-pointer hover:underline">
                  查看详情
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center gap-2 mb-6">
          <div className="w-1.5 h-6 bg-primary rounded-full" />
          <h2 className="text-xl font-bold">核心功能亮点</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature) => (
            <div key={feature.title} className="flex gap-4 p-4 rounded-xl hover:bg-white transition-colors">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <feature.icon className="h-5 w-5" />
                </div>
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold text-base">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
