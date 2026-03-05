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
  Sparkles,
  RefreshCw,
  Info
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useSelection } from '@/context/SelectionContext';
import { cn } from '@/lib/utils';
import { contextualAIQuestionAnswering } from '@/ai/flows/contextual-ai-question-answering';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

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

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <div className="flex flex-col h-full bg-slate-50/50">
      {/* Messages Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto"
      >
        {isEmpty ? (
          <div className="h-full flex flex-col items-center justify-center p-6 text-center max-w-2xl mx-auto space-y-8">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-inner">
              <Sparkles className="h-8 w-8 animate-pulse" />
            </div>
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900">您好，我是 EduWisdom AI</h2>
              <p className="text-slate-500 text-base">我可以帮您解读教育政策、检索学术资源或辅助课题研究报告的撰写。</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
              {[
                '2024年教育重点工作有哪些？', 
                '帮我总结一下《中国教育现代化2035》',
                '如何提高课堂教学的互动性？',
                '最新的教育数字化政策解读'
              ].map((q) => (
                <button 
                  key={q}
                  onClick={() => setInput(q)}
                  className="p-4 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-sm text-left transition-all hover:border-primary/30 shadow-sm active:scale-[0.98]"
                >
                  {q}
                </button>
              ))}
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
                    : "bg-white border border-slate-200 text-slate-800 rounded-tl-none"
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
                <div className="max-w-[85%] p-4 bg-white border border-slate-200 rounded-2xl rounded-tl-none">
                  <div className="flex gap-1.5">
                    <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce" />
                    <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Input Area Container */}
      <div className="p-4 sm:p-6 bg-background border-t border-slate-200">
        <div className="max-w-4xl mx-auto space-y-4">
          
          {/* Tool Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {[
              { icon: PenTool, label: 'AI 写作' },
              { icon: Languages, label: 'AI 翻译' },
              { icon: FileText, label: 'AI 摘要' },
              { icon: Search, label: 'AI 综述' },
              { icon: PieChart, label: 'AI 问数' },
            ].map((tool) => (
              <button 
                key={tool.label}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-600 hover:text-primary hover:border-primary/40 transition-all shadow-sm whitespace-nowrap active:bg-slate-50"
              >
                <tool.icon className="h-3.5 w-3.5" />
                {tool.label}
              </button>
            ))}
          </div>

          {/* Actual Input Box */}
          <div className="relative bg-white rounded-2xl border border-slate-200 shadow-lg focus-within:ring-2 focus-within:ring-primary/10 transition-shadow">
            <div className="flex items-center justify-between px-4 py-2 border-b border-slate-50">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 border-none px-2 py-0 h-5 text-[10px] font-bold">RAG ACTIVE</Badge>
                <span className="text-[10px] text-slate-400 flex items-center gap-1">
                  <Info className="h-3 w-3" />
                  已关联 {count} 项知识库上下文
                </span>
              </div>
              <button onClick={clearChat} className="text-[10px] text-slate-400 hover:text-primary transition-colors flex items-center gap-1 font-medium">
                <RefreshCw className="h-3 w-3" />
                清空对话
              </button>
            </div>
            
            <Textarea 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="请输入您的问题..."
              className="min-h-[80px] max-h-[300px] border-none focus-visible:ring-0 text-sm resize-none py-4 px-4 bg-transparent"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />
            
            <div className="flex items-center justify-between px-4 pb-3">
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 rounded-lg hover:bg-slate-100 hover:text-primary">
                  <Mic className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 rounded-lg hover:bg-slate-100 hover:text-primary">
                  <Upload className="h-4 w-4" />
                </Button>
              </div>
              
              <Button 
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                size="sm" 
                className="bg-primary hover:bg-primary/90 text-white rounded-xl px-6 h-9 shadow-md transition-all active:scale-95"
              >
                <Send className="h-4 w-4 mr-2" />
                发送
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
