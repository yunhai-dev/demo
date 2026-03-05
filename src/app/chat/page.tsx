'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  RotateCcw, 
  Copy, 
  ThumbsUp, 
  ThumbsDown, 
  PenTool, 
  Languages, 
  FileText, 
  Search, 
  PieChart, 
  X,
  Paperclip,
  Brain,
  ChevronRight,
  ChevronDown,
  SendHorizontal,
  BookOpen,
  Link as LinkIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useSelection } from '@/context/SelectionContext';
import { cn } from '@/lib/utils';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface Message {
  id: string;
  role: 'user' | 'ai';
  content: string;
  thought?: string;
  recommendedQuestions?: string[];
  isThinking?: boolean;
  isTyping?: boolean;
  sources?: string[];
}

const AI_TOOLS = [
  { icon: PenTool, label: 'AI 写作', mode: 'writing' },
  { icon: Languages, label: 'AI 翻译', mode: 'translation' },
  { icon: FileText, label: 'AI 摘要', mode: 'summary' },
  { icon: Search, label: 'AI 综述', mode: 'review' },
  { icon: PieChart, label: 'AI 问数', mode: 'data' },
];

const MOCK_RESPONSES: Record<string, { thought: string; content: string; questions: string[]; sources: string[] }> = {
  writing: {
    thought: "用户要求生成关于‘教育数字化转型’的公文大纲。首先，我需要明确公文的规范格式，通常包括背景、目标、任务和保障。其次，结合当前教育数字化的热点。我计划将重点放在‘人工智能赋能’和‘高质量均衡’两个维度。最后，检查语言风格，确保严谨专业。",
    content: "已为您生成一份关于‘教育数字化转型’的公文大纲：\n\n1. 背景与意义：当前全球教育竞争的新高地\n2. 总体要求：坚持育人为本，技术赋能\n3. 重点任务：基础设施建设、资源平台优化、素养提升\n4. 保障措施：经费投入与安全防护。\n\n您需要我对其中哪个章节进行详细扩写吗？",
    questions: ["扩写第三部分“重点任务”", "将大纲转换为PPT演讲稿格式", "增加关于区域差异的分析"],
    sources: ["《2024年教育发展纲要.pdf》", "《教育数字化转型指导意见》"]
  },
  default: {
    thought: "用户提出了一个开放性的教育领域问题。我将从中国教育科学研究院的权威视角出发，首先检索相关的政策文件库。接着，分析当前教育现代化的主要瓶颈和发展阶段。我需要给出一个既有宏观高度，又有微观案例支撑的回答。",
    content: "这是一个非常深刻的问题。基于中国教育科学研究院的权威数据库，我可以从政策解读、案例分析和数据支撑三个维度为您提供参考意见。目前，我国教育现代化已进入加速期，特别是针对您关注的领域。",
    questions: ["查看相关的政策条文原文", "获取近三年的统计数据对比", "了解在该领域表现突出的示范区"],
    sources: ["《国家中长期教育改革和发展规划纲要》", "《教育科研成果汇编2023》"]
  }
};

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
      content: selectedMode ? `[${selectedMode.toUpperCase()}] ${input}` : input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    setTimeout(() => {
      const responseTemplate = selectedMode ? (MOCK_RESPONSES[selectedMode] || MOCK_RESPONSES.default) : MOCK_RESPONSES.default;
      
      const aiMessageId = (Date.now() + 1).toString();
      const aiMessage: Message = {
        id: aiMessageId,
        role: 'ai',
        thought: responseTemplate.thought,
        content: '',
        recommendedQuestions: responseTemplate.questions,
        sources: count > 0 ? responseTemplate.sources : undefined,
        isTyping: true,
      };
      
      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);

      let fullText = responseTemplate.content;
      let currentIndex = 0;
      
      const interval = setInterval(() => {
        if (currentIndex < fullText.length) {
          const char = fullText[currentIndex];
          setMessages(prev => prev.map(m => 
            m.id === aiMessageId ? { ...m, content: m.content + char } : m
          ));
          currentIndex++;
        } else {
          clearInterval(interval);
          setMessages(prev => prev.map(m => 
            m.id === aiMessageId ? { ...m, isTyping: false } : m
          ));
        }
      }, 15);
    }, 1200); 
  };

  return (
    <div className="relative h-full flex flex-col bg-[#F5F7FA] overflow-hidden">
      <div 
        ref={scrollRef}
        className={cn(
          "absolute inset-0 overflow-y-auto scroll-smooth",
          isEmpty ? "flex items-center justify-center" : "pt-6 pb-[240px]" 
        )}
      >
        <div className={cn(
          "w-full mx-auto px-6",
          isEmpty ? "max-w-2xl" : "max-w-4xl space-y-8"
        )}>
          {isEmpty ? (
            <div className="flex flex-col items-center text-center space-y-6 w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="w-10 h-10 rounded-sm bg-[#1E89FF] flex items-center justify-center shadow-lg shadow-blue-200/50">
                <span className="text-white text-lg font-bold">Ai</span>
              </div>
              <div className="space-y-1">
                <h2 className="text-[18px] font-bold text-[#1D2129]">上午好，请问有什么可以帮您？</h2>
                <p className="text-[#909399] text-[13px]">基于航空工业教科院知识库为您提供专业解答</p>
              </div>
              {renderInputArea()}
            </div>
          ) : (
            <div className="space-y-8 pb-10">
              {messages.map((m) => (
                <div key={m.id} className={cn(
                  "flex animate-in fade-in duration-500",
                  m.role === 'user' ? "justify-end" : "justify-start gap-4"
                )}>
                  {m.role === 'ai' && (
                    <div className="shrink-0 w-8 h-8 rounded-sm bg-[#EBF4FF] border border-[#C2DEFF] flex items-center justify-center shadow-sm">
                      <span className="text-[#1E89FF] text-[11px] font-bold">Ai</span>
                    </div>
                  )}

                  <div className={cn("flex flex-col gap-2", m.role === 'user' ? "items-end max-w-[85%]" : "max-w-[85%]")}>
                    {m.role === 'ai' && m.thought && (
                      <div className="w-full border-l-2 border-[#DCDFE6] pl-4 mb-2">
                        <Collapsible defaultOpen={true}>
                          <CollapsibleTrigger className="flex items-center gap-2 text-[12px] font-bold text-[#909399] hover:text-[#1E89FF] transition-colors mb-2">
                            <Brain className="h-4 w-4" />
                            <span>思维逻辑链</span>
                            <ChevronRight className="h-3 w-3" />
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            <div className="text-[13px] leading-[20px] text-[#606266] italic bg-white/50 p-3 rounded-sm border border-[#E5E6EB]">
                              {m.thought}
                            </div>
                          </CollapsibleContent>
                        </Collapsible>
                      </div>
                    )}

                    <div className={cn(
                      "p-4 rounded-sm text-[14px] leading-[22px] shadow-sm ring-1 ring-[#DCDFE6] whitespace-pre-wrap",
                      m.role === 'user' 
                        ? "bg-[#1E89FF] text-white ring-[#1E89FF] font-medium" 
                        : "bg-white text-[#1D2129]"
                    )}>
                      {m.content}
                      {m.isTyping && (
                        <span className="inline-block w-1.5 h-4 ml-1 bg-[#1E89FF]/40 animate-pulse align-middle" />
                      )}
                    </div>

                    {m.role === 'ai' && !m.isTyping && (
                      <div className="flex flex-col gap-4 w-full mt-2 animate-in fade-in slide-in-from-top-2">
                        {m.sources && (
                          <div className="flex flex-col gap-2 p-3 bg-white border border-[#DCDFE6] rounded-sm">
                            <div className="flex items-center gap-2 text-[11px] font-bold text-[#909399]">
                              <BookOpen className="h-3.5 w-3.5" />
                              <span>引用文献来源</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {m.sources.map((source, idx) => (
                                <div key={idx} className="flex items-center gap-1.5 px-2 py-1 bg-[#F5F7FA] border border-[#E5E6EB] rounded-sm text-[11px] text-[#606266] hover:text-[#1E89FF] hover:border-[#1E89FF]/30 cursor-pointer transition-colors">
                                  <LinkIcon className="h-3 w-3" />
                                  {source}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="flex items-center gap-1">
                          {[RotateCcw, Copy, ThumbsUp, ThumbsDown].map((Icon, i) => (
                            <Button 
                              key={i}
                              variant="ghost" 
                              size="icon" 
                              className="h-7 w-7 text-[#909399] hover:text-[#1E89FF] hover:bg-[#EBF4FF]"
                            >
                              <Icon className="h-4 w-4" />
                            </Button>
                          ))}
                        </div>

                        {m.recommendedQuestions && (
                          <div className="flex flex-wrap gap-2">
                            {m.recommendedQuestions.map((rq) => (
                              <button 
                                key={rq} 
                                className="px-3 py-1.5 rounded-sm bg-white text-[12px] font-medium text-[#1E89FF] border border-[#DCDFE6] hover:border-[#1E89FF] transition-all"
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
                </div>
              ))}
              
              {isLoading && (
                <div className="flex gap-4">
                  <div className="shrink-0 w-8 h-8 rounded-sm bg-[#EBF4FF] border border-[#C2DEFF] flex items-center justify-center">
                    <span className="text-[#1E89FF] text-[11px] font-bold">Ai</span>
                  </div>
                  <div className="p-4 bg-white/60 border border-[#DCDFE6] rounded-sm text-[#909399] text-[13px] flex items-center gap-3">
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 bg-[#1E89FF] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 bg-[#1E89FF] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 bg-[#1E89FF] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                    正在调取知识库并构建逻辑响应...
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {!isEmpty && (
        <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-[#F5F7FA] via-[#F5F7FA] to-transparent pointer-events-none z-20">
          <div className="max-w-3xl mx-auto pointer-events-auto">
            {renderInputArea()}
          </div>
        </div>
      )}
    </div>
  );

  function renderInputArea() {
    return (
      <div className="w-full space-y-4">
        <div className="relative bg-white rounded-sm border border-[#DCDFE6] shadow-sm focus-within:border-[#1E89FF] focus-within:shadow-md transition-all duration-300">
          {selectedMode && (
            <div className="flex items-center px-4 pt-3">
              <div className="flex items-center gap-2 px-2 py-0.5 bg-[#EBF4FF] border border-[#C2DEFF] rounded-sm">
                <span className="text-[10px] font-bold text-[#1E89FF] uppercase tracking-wider">
                  {AI_TOOLS.find(t => t.mode === selectedMode)?.label} 模式
                </span>
                <button onClick={() => setSelectedMode(null)} className="p-0.5 hover:bg-white rounded-full">
                  <X className="h-3 w-3 text-[#1E89FF]" />
                </button>
              </div>
            </div>
          )}

          <Textarea 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={selectedMode ? `在 ${AI_TOOLS.find(t => t.mode === selectedMode)?.label} 模式下录入信息...` : "输入您的问题，基于教科院知识库为您解答..."}
            className={cn(
              "min-h-[80px] max-h-[200px] border-none focus-visible:ring-0 text-[14px] leading-[22px] px-4 bg-transparent placeholder:text-[#A8ABB2] font-body",
              selectedMode ? "pt-1 pb-3" : "py-4"
            )}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          
          <div className="flex items-center justify-between px-4 pb-3">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="h-7 px-2 rounded-sm bg-[#F5F7FA] text-[#1D2129] text-[11px] font-bold border border-[#DCDFE6]">
                已选资源 {count}
                <ChevronDown className="h-3 w-3 ml-1" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-[#606266] hover:text-[#1E89FF] hover:bg-[#EBF4FF]">
                <Paperclip className="h-4 w-4" />
              </Button>
            </div>

            <Button 
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              size="sm" 
              className="bg-[#1E89FF] hover:bg-[#006DEA] text-white rounded-sm h-8 px-4 flex items-center gap-2 text-[12px] font-bold"
            >
              提交指令
              <SendHorizontal className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 flex-wrap px-4">
          {AI_TOOLS.map((tool) => (
            <button 
              key={tool.label}
              onClick={() => setSelectedMode(tool.mode === selectedMode ? null : tool.mode)}
              className={cn(
                "flex items-center gap-2 px-3 py-1 bg-white border rounded-sm text-[12px] font-medium transition-all shadow-sm active:scale-95",
                selectedMode === tool.mode 
                  ? "border-[#1E89FF] bg-[#EBF4FF] text-[#1E89FF]" 
                  : "border-[#DCDFE6] text-[#606266] hover:border-[#1E89FF] hover:text-[#1E89FF]"
              )}
            >
              <tool.icon className="h-3.5 w-3.5" />
              {tool.label}
            </button>
          ))}
        </div>
      </div>
    );
  }
}
