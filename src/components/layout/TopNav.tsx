'use client';

import React from 'react';
import { Bell, User, Settings, LogOut, UserCircle, HelpCircle, History, MessageSquare } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
} from '@/components/ui/sheet';
import { CHATS_HISTORY } from '@/lib/mock-data';

export function TopNav() {
  return (
    <header className="h-14 border-b border-border bg-white flex items-center justify-between px-6 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <Badge className="bg-[#FE8624] hover:bg-[#FE8624] text-white border-none rounded-sm px-2 py-0.5 text-[12px] font-bold">
          内部
        </Badge>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="h-8 w-8 text-[#606266]">
          <HelpCircle className="h-5 w-5" />
        </Button>

        <Button variant="ghost" size="icon" className="h-8 w-8 text-[#606266] relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#D40000] rounded-full border-2 border-white" />
        </Button>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-[#606266]">
              <History className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[380px] p-0 border-l border-[#DCDFE6]">
            <SheetHeader className="p-4 border-b border-[#DCDFE6] bg-[#F5F7FA]">
              <div className="flex items-center gap-2">
                <History className="h-4 w-4 text-[#1E89FF]" />
                <SheetTitle className="text-[14px] font-bold text-[#1D2129]">历史对话</SheetTitle>
              </div>
              <SheetDescription className="text-[12px] text-[#909399]">查看并回顾您最近的 AI 交互记录</SheetDescription>
            </SheetHeader>
            <div className="flex-1 overflow-y-auto">
              <div className="p-2 space-y-1">
                {CHATS_HISTORY.map((chat) => (
                  <div 
                    key={chat.id} 
                    className="p-3 rounded-sm hover:bg-[#F5F7FA] border border-transparent hover:border-[#DCDFE6] cursor-pointer group transition-all"
                  >
                    <div className="flex items-start justify-between mb-1">
                      <div className="flex items-center gap-2 min-w-0">
                        <MessageSquare className="h-3.5 w-3.5 text-[#1E89FF] shrink-0" />
                        <span className="text-[13px] font-bold text-[#1D2129] truncate">{chat.title}</span>
                      </div>
                      <span className="text-[11px] text-[#909399] shrink-0">{chat.date}</span>
                    </div>
                    <p className="text-[12px] text-[#606266] line-clamp-1 pl-5 group-hover:text-[#1E89FF]">
                      {chat.preview}
                    </p>
                  </div>
                ))}
              </div>
              {CHATS_HISTORY.length === 0 && (
                <div className="h-[200px] flex flex-col items-center justify-center text-[#909399] gap-2">
                  <History className="h-8 w-8 opacity-20" />
                  <span className="text-[13px]">暂无对话历史记录</span>
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>
        
        <div className="h-6 w-px bg-border mx-2" />

        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-2 cursor-pointer hover:bg-[#F5F7FA] px-2 py-1 rounded-sm transition-colors">
                <Avatar className="h-8 w-8 border border-border">
                  <AvatarImage src="https://picsum.photos/seed/user1/200" />
                  <AvatarFallback>张三</AvatarFallback>
                </Avatar>
                <span className="text-[14px] font-medium text-[#1D2129] max-w-[152px] truncate">张三</span>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>用户信息</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="gap-2">
                <UserCircle className="h-4 w-4" />
                个人中心
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2">
                <Settings className="h-4 w-4" />
                系统设置
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="gap-2 text-[#D40000]">
                <LogOut className="h-4 w-4" />
                退出登录
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
