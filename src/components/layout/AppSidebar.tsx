'use client';

import React from 'react';
import { Search, Plus, Home, Library, Share2, Folder } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from '@/components/ui/sidebar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { KnowledgeTree } from './KnowledgeTree';
import { INSTITUTIONAL_KNOWLEDGE, SHARED_KNOWLEDGE, PERSONAL_KNOWLEDGE } from '@/lib/mock-data';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSelection } from '@/context/SelectionContext';

export function AppSidebar() {
  const pathname = usePathname();
  const { count } = useSelection();

  return (
    <Sidebar className="border-r border-border bg-sidebar">
      <SidebarHeader className="p-4 space-y-4">
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-lg">E</div>
          <span className="font-bold text-lg text-foreground tracking-tight">中国教育科学研究院</span>
        </div>
        
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input 
            placeholder="搜索知识库..." 
            className="pl-9 bg-muted/30 border-none h-9 ring-offset-transparent focus-visible:ring-1 focus-visible:ring-primary/20"
          />
        </div>

        <Button className="w-full bg-primary hover:bg-primary/90 text-white gap-2 h-11 shadow-sm font-medium">
          <Plus className="h-4 w-4" />
          新建知识库
        </Button>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === '/'} tooltip="主页">
                <Link href="/" className="font-medium">
                  <Home className="h-4 w-4" />
                  <span>主页</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === '/chat'} tooltip="AI 对话">
                <Link href="/chat" className="font-medium">
                  <Library className="h-4 w-4" />
                  <span>AI 对话交互</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">知识目录</SidebarGroupLabel>
          <SidebarGroupContent className="px-2 pt-2">
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 px-2 py-2 text-sm font-semibold text-foreground/70">
                  <Library className="h-4 w-4 text-primary" />
                  <span>机构知识库</span>
                </div>
                <KnowledgeTree nodes={INSTITUTIONAL_KNOWLEDGE} />
              </div>

              <div>
                <div className="flex items-center gap-2 px-2 py-2 text-sm font-semibold text-foreground/70">
                  <Share2 className="h-4 w-4 text-primary" />
                  <span>共享知识库</span>
                </div>
                <KnowledgeTree nodes={SHARED_KNOWLEDGE} />
              </div>

              <div>
                <div className="flex items-center gap-2 px-2 py-2 text-sm font-semibold text-foreground/70">
                  <Folder className="h-4 w-4 text-primary" />
                  <span>我的知识库</span>
                </div>
                <KnowledgeTree nodes={PERSONAL_KNOWLEDGE} />
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <div className="p-4 mt-auto border-t border-border bg-muted/20">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>上下文状态</span>
          <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">已选 {count} 项</span>
        </div>
      </div>
    </Sidebar>
  );
}
