'use client';

import React from 'react';
import { Bell, User, Settings, LogOut, UserCircle, Search, HelpCircle } from 'lucide-react';
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
import { Input } from '@/components/ui/input';

export function TopNav() {
  return (
    <header className="h-14 border-b border-border bg-white flex items-center justify-between px-6 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        {/* 规范：Header 必须包含密级标识 */}
        <Badge className="bg-[#FE8624] hover:bg-[#FE8624] text-white border-none rounded-sm px-2 py-0.5 text-[12px] font-bold">
          内部
        </Badge>
        <div className="h-4 w-px bg-border mx-2" />
        <span className="text-[14px] font-bold text-[#1D2129]">航空工业教科院办公平台</span>
      </div>

      <div className="flex items-center gap-2">
        {/* 规范：Header 必备搜索 */}
        <div className="relative mr-4 hidden md:block">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#A8ABB2]" />
          <Input 
            placeholder="搜索系统内容..." 
            className="w-64 h-8 pl-9 bg-[#F5F7FA] border-none text-[13px] placeholder:text-[#A8ABB2]" 
          />
        </div>

        <Button variant="ghost" size="icon" className="h-8 w-8 text-[#606266]">
          <HelpCircle className="h-5 w-5" />
        </Button>
        
        <Button variant="ghost" size="icon" className="h-8 w-8 text-[#606266] relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#D40000] rounded-full border-2 border-white" />
        </Button>
        
        <div className="h-6 w-px bg-border mx-2" />

        <div className="flex items-center gap-3">
          {/* 规范：头像 + 用户名称 */}
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
