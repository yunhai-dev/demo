'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
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
  ChevronDown,
  X
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

const AI_TOOLS = [
  { icon: PenTool, label: 'AI 写作', color: 'text-emerald-500', mode: 'writing' },
  { icon: Languages, label: 'AI 翻译', color: 'text-indigo-500', mode: 'translation' },
  { icon: FileText, label: 'AI 摘要', color: 'text-amber-500', mode: 'summary' },
  { icon: Search, label: 'AI 综述', color: 'text-slate-500', mode: 'review' },
  { icon: PieChart, label: 'AI 问数', color: 'text-rose-500', mode: 'data' },
];

export default function ChatPage() {
  const { count } = useSelection();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMode, setSelectedMode] = useState<string | null>(null);
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
      content: selectedMode ? `[${selectedMode}] ${input}` : input,
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
    <div className="flex flex-col h-full bg-white relative overflow-hidden font-body">
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
            <div className="flex flex-col items-center text-center space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-1000">
              <div className="relative group">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg transform transition-all group-hover:scale-110 group-hover:rotate-3">
                  <span className="text-white text-xl font-black tracking-tighter italic">Ai</span>
                </div>
                <div className="absolute -inset-2 rounded-2xl bg-blue-500/10 blur-md -z-10 animate-pulse" />
              </div>

              <div className="space-y-2">
                <h2 className="text-xl font-bold tracking-tight text-slate-800">上午好，有什么我可以帮助你的吗？</h2>
                <p className="text-slate-400 text-[12px] font-medium">请从左侧选择知识库或直接向我提问</p>
              </div>

              <div className="w-full">
                {renderInputArea()}
              </div>
            </div>
          ) : (
            /* Chat History */
            <div className="space-y-10">
              {messages.map((m) => (
                <div key={m.id} className={cn(
                  "flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500",
                  m.role === 'user' ? "items-end" : "items-start"
                )}>
                  <div className={cn(
                    "max-w-[85%] p-4 rounded-2xl text-[14px] leading-relaxed shadow-sm ring-1 ring-black/5",
                    m.role === 'user' 
                      ? "bg-primary text-white ring-primary/20" 
                      : "bg-slate-50 border border-slate-100 text-slate-700"
                  )}>
                    {m.content}
                  </div>
                  
                  {m.role === 'ai' && (
                    <div className="mt-4 flex flex-col gap-4 w-full">
                      <div className="flex items-center gap-1.5 ml-1">
                        {[RotateCcw, Copy, ThumbsUp, ThumbsDown].map((Icon, i) => (
                          <Button 
                            key={i}
                            variant="ghost" 
                            size="icon" 
                            className="h-7 w-7 text-slate-400 hover:text-primary hover:bg-primary/5 transition-all rounded-lg"
                          >
                            <Icon className="h-3.5 w-3.5" />
                          </Button>
                        ))}
                      </div>
                      {m.recommendedQuestions && (
                        <div className="flex flex-wrap gap-2">
                          {m.recommendedQuestions.map((rq) => (
                            <button 
                              key={rq} 
                              className="px-4 py-1.5 rounded-full bg-blue-50/50 text-[12px] font-medium text-primary border border-primary/10 hover:bg-primary/5 hover:border-primary/30 transition-all active:scale-95"
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
                <div className="flex items-start gap-4 animate-pulse">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-50 to-indigo-50 flex items-center justify-center text-[10px] text-primary font-black italic border border-primary/10 shadow-sm">AI</div>
                  <div className="max-w-[70%] p-4 bg-slate-50/50 border border-slate-100 rounded-2xl text-slate-400 text-[13px] font-medium italic">
                    正在深入分析知识库并为您构建答案...
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Persistent Input Bar (Only shown when not empty) */}
      {!isEmpty && (
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-white/90 backdrop-blur-xl border-t border-slate-100/50 shadow-[0_-8px_30px_rgba(0,0,0,0.02)] animate-in slide-in-from-bottom-full duration-700">
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
        <div className="relative bg-white rounded-2xl border border-slate-200/80 shadow-[0_8px_30px_-6px_rgba(0,0,0,0.05)] focus-within:border-primary/50 focus-within:shadow-[0_12px_40px_-8px_rgba(59,130,246,0.15)] transition-all duration-300 overflow-hidden">
          
          {/* Mode Indicator Overlay */}
          {selectedMode && (
            <div className="flex items-center px-5 pt-3">
              <div className="flex items-center gap-2 px-2 py-0.5 bg-primary/5 border border-primary/15 rounded-md animate-in zoom-in-95 duration-200">
                <span className="text-[10px] font-bold text-primary uppercase tracking-wider">
                  {AI_TOOLS.find(t => t.mode === selectedMode)?.label} 模式
                </span>
                <button 
                  onClick={() => setSelectedMode(null)}
                  className="p-0.5 hover:bg-primary/10 rounded-full transition-colors"
                >
                  <X className="h-2.5 w-2.5 text-primary/60" />
                </button>
              </div>
            </div>
          )}

          <Textarea 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={selectedMode ? `在 ${AI_TOOLS.find(t => t.mode === selectedMode)?.label} 模式下提问...` : "请输入您的问题..."}
            className={cn(
              "min-h-[80px] max-h-[300px] border-none focus-visible:ring-0 text-[14px] font-medium resize-none px-6 bg-transparent placeholder:text-slate-300 transition-all",
              selectedMode ? "pt-1 pb-3" : "py-4"
            )}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          
          {/* Input Footer Bar */}
          <div className="flex items-center justify-between px-5 pb-4 pt-1">
            <div className="flex items-center gap-1.5">
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-7 px-2.5 rounded-lg bg-blue-50/80 text-primary hover:bg-blue-100/80 text-[10px] font-bold border border-blue-100/50 shadow-sm"
              >
                已选 {count} 项
                <ChevronDown className="h-3 w-3 ml-1 opacity-60" />
              </Button>
            </div>

            <Button 
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              size="sm" 
              className="bg-primary hover:bg-primary/95 text-white rounded-xl h-8 px-5 text-[12px] font-bold transition-all shadow-lg shadow-primary/20 active:scale-95 disabled:shadow-none"
            >
              发送
            </Button>
          </div>
        </div>

        {/* Tool Pills Bar - Compact Style */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto scrollbar-hide py-1 px-4">
          {AI_TOOLS.map((tool) => (
            <button 
              key={tool.label}
              onClick={() => setSelectedMode(tool.mode)}
              className={cn(
                "flex items-center gap-2 px-3 py-1.5 bg-white border rounded-lg text-[11px] font-bold transition-all shadow-sm whitespace-nowrap active:scale-95 group",
                selectedMode === tool.mode 
                  ? "border-primary/30 bg-primary/5 text-primary ring-1 ring-primary/10" 
                  : "border-slate-100 text-slate-600 hover:border-primary/20 hover:text-primary"
              )}
            >
              <tool.icon className={cn(
                "h-3 w-3 transition-colors", 
                selectedMode === tool.mode ? "text-primary" : tool.color, 
                "group-hover:text-primary"
              )} />
              {tool.label}
            </button>
          ))}
        </div>
      </div>
    );
  }
}
