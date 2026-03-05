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
    <Sidebar className="border-r border-[#DCDFE6] bg-white">
      <SidebarHeader className="p-4 space-y-4">
        <div className="flex items-center gap-3 px-2">
          <div className="w-7 h-7 rounded-sm bg-[#1E89FF] flex items-center justify-center text-white font-bold text-base">A</div>
          <span className="font-bold text-[15px] text-[#1D2129] tracking-tight">航空工业教科院</span>
        </div>
        
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#A8ABB2]" />
          <Input 
            placeholder="搜索知识库..." 
            className="pl-9 bg-[#F5F7FA] border-none h-8 text-[13px] rounded-sm"
          />
        </div>

        <Button className="w-full bg-[#1E89FF] hover:bg-[#006DEA] text-white gap-2 h-9 shadow-none font-medium rounded-sm">
          <Plus className="h-4 w-4" />
          新建知识库
        </Button>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === '/'} className="h-9">
                <Link href="/" className="font-medium text-[#606266]">
                  <Home className="h-4 w-4" />
                  <span>主页概览</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === '/chat'} className="h-9">
                <Link href="/chat" className="font-medium text-[#606266]">
                  <Library className="h-4 w-4" />
                  <span>AI 对话交互</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="px-4 text-[12px] font-bold text-[#909399] uppercase tracking-wider">知识目录</SidebarGroupLabel>
          <SidebarGroupContent className="px-2 pt-2">
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 px-2 py-1 text-[13px] font-bold text-[#1D2129]">
                  <Library className="h-4 w-4 text-[#1E89FF]" />
                  <span>机构知识库</span>
                </div>
                <KnowledgeTree nodes={INSTITUTIONAL_KNOWLEDGE} />
              </div>

              <div>
                <div className="flex items-center gap-2 px-2 py-1 text-[13px] font-bold text-[#1D2129]">
                  <Share2 className="h-4 w-4 text-[#1E89FF]" />
                  <span>共享知识库</span>
                </div>
                <KnowledgeTree nodes={SHARED_KNOWLEDGE} />
              </div>

              <div>
                <div className="flex items-center gap-2 px-2 py-1 text-[13px] font-bold text-[#1D2129]">
                  <Folder className="h-4 w-4 text-[#1E89FF]" />
                  <span>我的知识库</span>
                </div>
                <KnowledgeTree nodes={PERSONAL_KNOWLEDGE} />
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <div className="p-4 mt-auto border-t border-[#DCDFE6] bg-[#FAFAFA]">
        <div className="flex items-center justify-between text-[12px] text-[#909399]">
          <span>状态：运行中</span>
          <span className="bg-[#EBF4FF] text-[#1E89FF] px-2 py-0.5 rounded-sm font-bold">已选 {count}</span>
        </div>
      </div>
    </Sidebar>
  );
}
