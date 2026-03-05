'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Mic, 
  Upload, 
  Send, 
  RotateCcw, 
  Copy, 
  ThumbsUp, 
  ThumbsDown, 
  PenTool, 
  Languages, 
  FileText, 
  Search, 
  PieChart, 
  ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useSelection } from '@/context/SelectionContext';
import { cn } from '@/lib/utils';
import { contextualAIQuestionAnswering } from '@/ai/flows/contextual-ai-question-answering';
import { Badge } from '@/components/ui/badge';

interface Message {
  id: string;
  role: 'user' | 'ai';
  content: string;
  recommendedQuestions?: string[];
}

export default function ChatPage() {
  const { count } = useSelection();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const isEmpty = messages.length === 0;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await contextualAIQuestionAnswering({
        question: userMessage.content,
        context: count > 0 ? ['知识库上下文片段...'] : [],
      });

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        content: response,
        recommendedQuestions: [
          '关于该政策的更多解读',
          '相关的研究报告列表',
          '如何应用这些数据到我的课题中？'
        ],
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Messages Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto"
      >
        {isEmpty ? (
          <div className="h-full flex flex-col items-center justify-center p-6 text-center max-w-4xl mx-auto space-y-8">
            {/* AI Logo Area */}
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-lg">
                <span className="text-white text-4xl font-bold italic tracking-tighter">Ai</span>
              </div>
              <div className="absolute -inset-2 rounded-full border border-blue-100 animate-pulse -z-10" />
            </div>

            <div className="space-y-4">
              <h2 className="text-4xl font-bold tracking-tight text-slate-900">上午好，有什么我可以帮助你的吗？</h2>
              <p className="text-slate-400 text-lg">请从左侧选择知识库或文档开始问答</p>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto w-full p-4 sm:p-8 space-y-8">
            {messages.map((m) => (
              <div key={m.id} className={cn(
                "flex flex-col",
                m.role === 'user' ? "items-end" : "items-start"
              )}>
                <div className={cn(
                  "max-w-[85%] p-4 rounded-2xl shadow-sm text-sm leading-relaxed",
                  m.role === 'user' 
                    ? "bg-primary text-primary-foreground rounded-tr-none" 
                    : "bg-slate-50 border border-slate-100 text-slate-800 rounded-tl-none"
                )}>
                  {m.content}
                </div>
                
                {m.role === 'ai' && (
                  <div className="mt-3 flex flex-col gap-4 w-full">
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-primary"><RotateCcw className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-primary"><Copy className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-primary"><ThumbsUp className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-primary"><ThumbsDown className="h-4 w-4" /></Button>
                    </div>
                    {m.recommendedQuestions && (
                      <div className="flex flex-wrap gap-2">
                        {m.recommendedQuestions.map((rq) => (
                          <Button 
                            key={rq} 
                            variant="outline" 
                            size="sm" 
                            className="rounded-full bg-white text-[11px] text-primary border-primary/20 hover:bg-primary/5 hover:border-primary/40 h-7"
                            onClick={() => setInput(rq)}
                          >
                            {rq}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex flex-col items-start animate-pulse">
                <div className="max-w-[85%] p-4 bg-slate-50 border border-slate-100 rounded-2xl rounded-tl-none text-slate-400 text-xs">
                  AI 正在思考中...
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Input Area Container */}
      <div className="p-4 sm:p-10 bg-white">
        <div className="max-w-4xl mx-auto space-y-6">
          
          {/* Main Input Box */}
          <div className="relative bg-white rounded-3xl border border-slate-200 shadow-sm focus-within:ring-2 focus-within:ring-primary/10 focus-within:border-primary/30 transition-all">
            <Textarea 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="请输入您的问题..."
              className="min-h-[120px] max-h-[400px] border-none focus-visible:ring-0 text-base resize-none py-6 px-6 bg-transparent"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />
            
            {/* Input Footer Bar */}
            <div className="flex items-center justify-between px-4 pb-4">
              <Button 
                variant="outline" 
                size="sm" 
                className="h-9 px-3 rounded-xl bg-blue-50/50 border-blue-100 text-blue-600 hover:bg-blue-100 hover:text-blue-700 flex items-center gap-1.5 font-medium"
              >
                已选 {count} 项
                <ChevronDown className="h-4 w-4" />
              </Button>

              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="h-10 w-10 text-slate-400 rounded-full hover:bg-slate-100">
                  <Mic className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="h-10 w-10 text-slate-400 rounded-full hover:bg-slate-100">
                  <Upload className="h-5 w-5" />
                </Button>
                <Button 
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  size="icon" 
                  className="bg-primary hover:bg-primary/90 text-white rounded-full h-10 w-10 shadow-md ml-1"
                >
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Tool Pills Bar - Below Input */}
          <div className="flex items-center justify-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {[
              { icon: PenTool, label: 'AI 写作', color: 'text-green-500', bg: 'bg-green-50' },
              { icon: Languages, label: 'AI 翻译', color: 'text-blue-500', bg: 'bg-blue-50' },
              { icon: FileText, label: 'AI 摘要', color: 'text-orange-500', bg: 'bg-orange-50' },
              { icon: Search, label: 'AI 综述', color: 'text-slate-500', bg: 'bg-slate-50' },
              { icon: PieChart, label: 'AI 问数', color: 'text-red-500', bg: 'bg-red-50' },
            ].map((tool) => (
              <button 
                key={tool.label}
                className="flex items-center gap-2 px-6 py-2.5 bg-white border border-slate-200 rounded-full text-sm font-medium text-slate-600 hover:border-primary/40 hover:text-primary transition-all shadow-sm whitespace-nowrap active:scale-95"
              >
                <tool.icon className={cn("h-4 w-4", tool.color)} />
                {tool.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
