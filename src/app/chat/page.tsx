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
  RefreshCw
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
      // Using context from RAG
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
    <div className="flex flex-col h-full bg-background relative">
      {/* Messages Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-8 scroll-smooth"
      >
        {isEmpty ? (
          <div className="h-full flex flex-col items-center justify-center space-y-6 text-center">
            <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center">
              <Sparkles className="h-10 w-10 text-primary animate-pulse" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold tracking-tight">上午好，有什么我可以帮助你的吗？</h2>
              <p className="text-muted-foreground">你可以问我任何关于教育政策、学术资源或课题报告的问题</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl w-full">
              {['2024年教育重点工作有哪些？', '帮我总结一下《中国教育现代化2035》'].map((q) => (
                <button 
                  key={q}
                  onClick={() => setInput(q)}
                  className="p-4 bg-white hover:bg-primary/5 border border-border rounded-xl text-sm text-left transition-all hover:border-primary/20 shadow-sm"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-8 pb-32">
            {messages.map((m) => (
              <div key={m.id} className={cn(
                "flex flex-col animate-in fade-in slide-in-from-bottom-2",
                m.role === 'user' ? "items-end" : "items-start"
              )}>
                <div className={cn(
                  "max-w-[85%] p-4 rounded-2xl shadow-sm text-sm leading-relaxed",
                  m.role === 'user' 
                    ? "bg-primary text-primary-foreground rounded-tr-none" 
                    : "bg-white border border-border text-foreground rounded-tl-none"
                )}>
                  {m.content}
                </div>
                
                {m.role === 'ai' && (
                  <div className="mt-4 space-y-4 w-full">
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground"><RotateCcw className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground"><Copy className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground"><ThumbsUp className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground"><ThumbsDown className="h-4 w-4" /></Button>
                    </div>
                    {m.recommendedQuestions && (
                      <div className="flex flex-wrap gap-2">
                        {m.recommendedQuestions.map((rq) => (
                          <Button 
                            key={rq} 
                            variant="outline" 
                            size="sm" 
                            className="rounded-full bg-white text-xs text-primary border-primary/20 hover:bg-primary/5"
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
                <div className="max-w-[85%] p-4 bg-white border border-border rounded-2xl rounded-tl-none">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" />
                    <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce [animation-delay:0.2s]" />
                    <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-8 bg-gradient-to-t from-background via-background to-transparent pointer-events-none">
        <div className="max-w-4xl mx-auto pointer-events-auto chat-input-container">
          <div className="relative bg-white rounded-2xl border border-border shadow-xl p-2 transition-all focus-within:ring-2 focus-within:ring-primary/20">
            <div className="flex items-center gap-2 px-3 pt-2">
              <span className="text-[10px] font-bold text-primary uppercase tracking-widest bg-primary/10 px-1.5 py-0.5 rounded">RAG 模式已开启</span>
              <span className="text-[10px] text-muted-foreground">已选 {count} 项上下文</span>
              <button onClick={clearChat} className="ml-auto text-[10px] text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                <RefreshCw className="h-3 w-3" />
                开启新对话
              </button>
            </div>
            
            <Textarea 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="输入问题，Shift + Enter 换行..."
              className="min-h-[60px] max-h-[200px] border-none focus-visible:ring-0 text-sm resize-none py-3"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />
            
            <div className="flex items-center justify-between px-2 pb-2">
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground rounded-full hover:bg-primary/5 hover:text-primary">
                  <Mic className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground rounded-full hover:bg-primary/5 hover:text-primary">
                  <Upload className="h-5 w-5" />
                </Button>
              </div>
              
              <Button 
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                size="sm" 
                className="bg-primary hover:bg-primary/90 text-white rounded-full px-5 h-9"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mt-4 overflow-x-auto pb-2 scrollbar-hide">
            {[
              { icon: PenTool, label: 'AI 写作' },
              { icon: Languages, label: 'AI 翻译' },
              { icon: FileText, label: 'AI 摘要' },
              { icon: Search, label: 'AI 综述' },
              { icon: PieChart, label: 'AI 问数' },
            ].map((tool) => (
              <button 
                key={tool.label}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-border rounded-full text-xs font-medium text-muted-foreground hover:text-primary hover:border-primary/30 transition-all shadow-sm whitespace-nowrap"
              >
                <tool.icon className="h-3.5 w-3.5" />
                {tool.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}