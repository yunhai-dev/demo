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
    <div className="flex flex-col h-full bg-white relative overflow-hidden">
      {/* Content Area */}
      <div 
        ref={scrollRef}
        className={cn(
          "flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 transition-all duration-500",
          isEmpty ? "flex flex-col items-center justify-center p-6" : "pb-40"
        )}
      >
        <div className={cn(
          "w-full transition-all duration-500",
          isEmpty ? "max-w-3xl space-y-8" : "max-w-3xl mx-auto p-6 space-y-8"
        )}>
          {isEmpty ? (
            /* Empty State: Centered Welcome Section */
            <div className="flex flex-col items-center text-center space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="relative group">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg transform transition-transform group-hover:scale-105">
                  <span className="text-white text-2xl font-bold tracking-tighter italic">Ai</span>
                </div>
                <div className="absolute -inset-1 rounded-2xl bg-blue-500/10 blur-sm -z-10 animate-pulse" />
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight text-slate-800">上午好，有什么我可以帮助你的吗？</h2>
                <p className="text-slate-400 text-sm">请从左侧选择知识库或文档开始问答</p>
              </div>

              {/* Input is embedded here when empty */}
              <div className="w-full">
                {renderInputArea()}
              </div>
            </div>
          ) : (
            /* Chat History */
            <div className="space-y-8">
              {messages.map((m) => (
                <div key={m.id} className={cn(
                  "flex flex-col animate-in fade-in slide-in-from-bottom-2 duration-300",
                  m.role === 'user' ? "items-end" : "items-start"
                )}>
                  <div className={cn(
                    "max-w-[85%] p-4 rounded-2xl text-[14px] leading-relaxed shadow-sm",
                    m.role === 'user' 
                      ? "bg-primary text-white" 
                      : "bg-slate-50 border border-slate-100 text-slate-700"
                  )}>
                    {m.content}
                  </div>
                  
                  {m.role === 'ai' && (
                    <div className="mt-3 flex flex-col gap-3 w-full">
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-primary transition-colors"><RotateCcw className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-primary transition-colors"><Copy className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-primary transition-colors"><ThumbsUp className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-primary transition-colors"><ThumbsDown className="h-4 w-4" /></Button>
                      </div>
                      {m.recommendedQuestions && (
                        <div className="flex flex-wrap gap-2">
                          {m.recommendedQuestions.map((rq) => (
                            <button 
                              key={rq} 
                              className="px-4 py-1.5 rounded-full bg-blue-50/50 text-[12px] text-primary border border-primary/10 hover:bg-primary/5 hover:border-primary/30 transition-all"
                              onClick={() => setInput(rq)}
                            >
                              {rq}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex items-start gap-3 animate-pulse">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[10px] text-slate-400 font-bold italic">AI</div>
                  <div className="max-w-[70%] p-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-400 text-sm">
                    正在为您寻找答案...
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Persistent Input Bar (Only shown when not empty) */}
      {!isEmpty && (
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-white/80 backdrop-blur-md border-t border-slate-100 animate-in slide-in-from-bottom duration-500">
          <div className="max-w-3xl mx-auto">
            {renderInputArea()}
          </div>
        </div>
      )}
    </div>
  );

  function renderInputArea() {
    return (
      <div className="w-full space-y-4">
        {/* Main Input Box */}
        <div className="relative bg-white rounded-2xl border border-slate-200 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] focus-within:border-primary/40 focus-within:shadow-[0_8px_30px_-8px_rgba(59,130,246,0.12)] transition-all overflow-hidden">
          <Textarea 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="请输入您的问题..."
            className="min-h-[100px] max-h-[300px] border-none focus-visible:ring-0 text-[14px] resize-none py-4 px-5 bg-transparent placeholder:text-slate-300"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          
          {/* Input Footer Bar */}
          <div className="flex items-center justify-between px-4 pb-4">
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 px-3 rounded-lg bg-blue-50/50 text-blue-600 hover:bg-blue-100 text-[12px] font-medium border border-blue-100/50"
              >
                已选 {count} 项
                <ChevronDown className="h-4 w-4 ml-1 opacity-60" />
              </Button>
              <div className="h-4 w-[1px] bg-slate-100 mx-1" />
              <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors">
                <Mic className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors">
                <Upload className="h-4 w-4" />
              </Button>
            </div>

            <Button 
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              size="sm" 
              className="bg-primary hover:bg-primary/90 text-white rounded-xl h-9 px-5 text-[13px] font-semibold transition-all shadow-sm shadow-primary/20"
            >
              发送
              <Send className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>

        {/* Tool Pills Bar */}
        <div className="flex items-center justify-center gap-2.5 overflow-x-auto scrollbar-hide py-1">
          {[
            { icon: PenTool, label: 'AI 写作', color: 'text-emerald-500' },
            { icon: Languages, label: 'AI 翻译', color: 'text-indigo-500' },
            { icon: FileText, label: 'AI 摘要', color: 'text-amber-500' },
            { icon: Search, label: 'AI 综述', color: 'text-slate-500' },
            { icon: PieChart, label: 'AI 问数', color: 'text-rose-500' },
          ].map((tool) => (
            <button 
              key={tool.label}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-100 rounded-full text-[12px] font-medium text-slate-600 hover:border-primary/20 hover:text-primary transition-all shadow-sm whitespace-nowrap active:scale-95 group"
            >
              <tool.icon className={cn("h-3.5 w-3.5 transition-colors", tool.color, "group-hover:text-primary")} />
              {tool.label}
            </button>
          ))}
        </div>
      </div>
    );
  }
}
