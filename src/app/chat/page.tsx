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
  ChevronDown
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
}

const AI_TOOLS = [
  { icon: PenTool, label: 'AI 写作', color: 'text-emerald-500', mode: 'writing' },
  { icon: Languages, label: 'AI 翻译', color: 'text-indigo-500', mode: 'translation' },
  { icon: FileText, label: 'AI 摘要', color: 'text-amber-500', mode: 'summary' },
  { icon: Search, label: 'AI 综述', color: 'text-slate-500', mode: 'review' },
  { icon: PieChart, label: 'AI 问数', color: 'text-rose-500', mode: 'data' },
];

const MOCK_RESPONSES: Record<string, { thought: string; content: string; questions: string[] }> = {
  writing: {
    thought: "用户要求生成关于‘教育数字化转型’的公文大纲。首先，我需要明确公文的规范格式，通常包括背景、目标、任务和保障。其次，结合当前教育数字化的热点。我计划将重点放在‘人工智能赋能’和‘高质量均衡’两个维度。最后，检查语言风格，确保严谨专业。",
    content: "已为您生成一份关于‘教育数字化转型’的公文大纲：\n\n1. 背景与意义：当前全球教育竞争的新高地\n2. 总体要求：坚持育人为本，技术赋能\n3. 重点任务：基础设施建设、资源平台优化、素养提升\n4. 保障措施：经费投入与安全防护。\n\n您需要我对其中哪个章节进行详细扩写吗？",
    questions: ["扩写第三部分“重点任务”", "将大纲转换为PPT演讲稿格式", "增加关于区域差异的分析"]
  },
  translation: {
    thought: "输入文本涉及‘人工智能对中国教育现代化’的影响。翻译时需注意专业术语的准确性。语境为正式学术讨论，因此词汇选择应偏向书面语。我将采用地道的学术英语表达方式，确保逻辑衔接自然。",
    content: "Selected text translated to English:\n\n'The profound impact of AI on the modernization of China's education system is reflected in three dimensions: personalized learning, intelligent governance, and teacher empowerment.'\n\n是否需要将结果保存至您的个人知识库？",
    questions: ["润色为学术论文风格", "翻译为德语版本", "提取其中的核心术语"]
  },
  summary: {
    thought: "这是一篇关于教育评价体系的政策文本。核心观点在于‘破五唯’后的新评价标准。我需要提取文中的主要矛盾点，并整理出具体的数字化解决方案。摘要应采用列表形式，突出核心结论。",
    content: "经过深度阅读，为您总结了本文的核心观点：\n\n- 核心矛盾：传统评价体系与学生全面发展之间的脱节。\n- 解决方案：引入多维度智能评估模型，实现过程性评价。\n- 结论：数字化不是目的，而是实现公平教育的路径。\n\n摘要已为您精简至300字以内。",
    questions: ["列出文中提到的参考文献", "生成一份核心思维导图", "对比其他同类政策差异"]
  },
  default: {
    thought: "用户提出了一个开放性的教育领域问题。我将从中国教育科学研究院的权威视角出发，首先检索相关的政策文件库。接着，分析当前教育现代化的主要瓶颈和发展阶段。我需要给出一个既有宏观高度，又有微观案例支撑的回答。",
    content: "这是一个非常深刻的问题。基于中国教育科学研究院的权威数据库，我可以从政策解读、案例分析和数据支撑三个维度为您提供参考意见。目前，我国教育现代化已进入加速期，特别是针对您关注的领域。",
    questions: ["查看相关的政策条文原文", "获取近三年的统计数据对比", "了解在该领域表现突出的示范区"]
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
    const currentInput = input;
    const currentMode = selectedMode;
    setInput('');
    setIsLoading(true);

    // 模拟 AI 响应
    setTimeout(() => {
      const responseTemplate = currentMode ? (MOCK_RESPONSES[currentMode] || MOCK_RESPONSES.default) : MOCK_RESPONSES.default;
      
      const aiMessageId = (Date.now() + 1).toString();
      const aiMessage: Message = {
        id: aiMessageId,
        role: 'ai',
        thought: responseTemplate.thought,
        content: '',
        recommendedQuestions: responseTemplate.questions,
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
      }, 25);
    }, 1500); 
  };

  return (
    <div className="flex flex-col h-full bg-white font-body relative overflow-hidden">
      {/* 消息滚动区域 */}
      <div 
        ref={scrollRef}
        className={cn(
          "flex-1 overflow-y-auto scroll-smooth",
          isEmpty ? "flex items-center justify-center p-6" : "p-6"
        )}
      >
        <div className={cn(
          "w-full mx-auto",
          isEmpty ? "max-w-2xl animate-in fade-in slide-in-from-bottom-8 duration-1000" : "max-w-3xl space-y-10"
        )}>
          {isEmpty ? (
            /* 初始状态：居中内容 */
            <div className="flex flex-col items-center text-center space-y-8 w-full">
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-700 flex items-center justify-center shadow-xl border border-white/20">
                  <span className="text-white text-2xl font-black tracking-tighter italic">Ai</span>
                </div>
                <div className="absolute -inset-3 rounded-3xl bg-blue-500/10 blur-xl -z-10 animate-pulse" />
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tight text-slate-800">上午好，有什么我可以帮助你的吗？</h2>
                <p className="text-slate-400 text-sm font-medium">请从下方选择模式或直接输入问题开始对话</p>
              </div>

              {renderInputArea()}
            </div>
          ) : (
            /* 对话历史 */
            <div className="space-y-10">
              {messages.map((m) => (
                <div key={m.id} className={cn(
                  "flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500",
                  m.role === 'user' ? "items-end" : "items-start"
                )}>
                  {m.role === 'ai' && (
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600/10 to-indigo-700/10 flex items-center justify-center mb-2 border border-primary/10 shadow-sm">
                      <span className="text-primary text-[11px] font-black italic">Ai</span>
                    </div>
                  )}

                  <div className="w-full space-y-4">
                    {m.role === 'ai' && m.thought && (
                      <div className="ml-1 max-w-[95%] border-l-2 border-slate-100 pl-4 py-1">
                        <Collapsible defaultOpen={true}>
                          <CollapsibleTrigger className="flex items-center gap-2 text-[11px] font-bold text-slate-400 hover:text-primary transition-colors mb-2 group">
                            <Brain className="h-3.5 w-3.5 text-slate-300 group-hover:text-primary" />
                            <span>深度思考过程</span>
                            <ChevronRight className="h-3 w-3 transition-transform data-[state=open]:rotate-90" />
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            <div className="text-[12px] leading-relaxed text-slate-500 italic font-medium bg-slate-50/50 p-4 rounded-xl border border-slate-100/50">
                              {m.thought}
                            </div>
                          </CollapsibleContent>
                        </Collapsible>
                      </div>
                    )}

                    <div className={cn(
                      "max-w-[85%] p-4 rounded-2xl text-[14px] leading-relaxed shadow-sm ring-1 ring-black/5 whitespace-pre-wrap transition-all",
                      m.role === 'user' 
                        ? "bg-primary text-white ring-primary/20 float-right ml-auto" 
                        : "bg-white border border-slate-100 text-slate-700"
                    )}>
                      {m.content}
                      {m.isTyping && (
                        <span className="inline-block w-1 h-4 ml-1 bg-primary/40 animate-pulse align-middle" />
                      )}
                    </div>
                  </div>
                  
                  {m.role === 'ai' && !m.isTyping && (
                    <div className="mt-4 flex flex-col gap-4 w-full animate-in fade-in slide-in-from-top-2 duration-700">
                      <div className="flex items-center gap-1.5 ml-1">
                        {[RotateCcw, Copy, ThumbsUp, ThumbsDown].map((Icon, i) => (
                          <Button 
                            key={i}
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-slate-400 hover:text-primary hover:bg-primary/5 transition-all rounded-lg"
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
                              className="px-4 py-1.5 rounded-full bg-blue-50/50 text-[11px] font-medium text-primary border border-primary/10 hover:bg-primary/5 hover:border-primary/30 transition-all active:scale-95"
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
                <div className="flex flex-col items-start animate-in fade-in duration-300">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600/10 to-indigo-700/10 flex items-center justify-center mb-2 border border-primary/10 shadow-sm">
                    <span className="text-primary text-[11px] font-black italic">Ai</span>
                  </div>
                  <div className="max-w-[70%] p-4 bg-slate-50/50 border border-slate-100 rounded-2xl text-slate-400 text-[13px] font-medium flex items-center gap-3">
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                    正在进行逻辑推理...
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 固定底部输入区域 */}
      {!isEmpty && (
        <div className="shrink-0 p-6 bg-white/80 backdrop-blur-xl border-t border-slate-100 shadow-[0_-8px_30px_rgba(0,0,0,0.02)] z-10">
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
        <div className="relative bg-white rounded-2xl border border-slate-200 shadow-[0_8px_30px_-6px_rgba(0,0,0,0.04)] focus-within:border-primary/40 focus-within:shadow-[0_12px_40px_-8px_rgba(59,130,246,0.08)] transition-all duration-300 overflow-hidden">
          
          {selectedMode && (
            <div className="flex items-center px-5 pt-3">
              <div className="flex items-center gap-2 px-2 py-0.5 bg-primary/5 border border-primary/10 rounded-md">
                <span className="text-[9px] font-bold text-primary uppercase tracking-wider">
                  {AI_TOOLS.find(t => t.mode === selectedMode)?.label} 模式
                </span>
                <button 
                  onClick={() => setSelectedMode(null)}
                  className="p-0.5 hover:bg-primary/10 rounded-full transition-colors"
                >
                  <X className="h-3 w-3 text-primary/60" />
                </button>
              </div>
            </div>
          )}

          <Textarea 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={selectedMode ? `在 ${AI_TOOLS.find(t => t.mode === selectedMode)?.label} 模式下提问...` : "请输入您的问题..."}
            className={cn(
              "min-h-[100px] max-h-[300px] border-none focus-visible:ring-0 text-[14px] font-medium resize-none px-6 bg-transparent placeholder:text-slate-300",
              selectedMode ? "pt-1 pb-3" : "py-4"
            )}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          
          <div className="flex items-center justify-between px-5 pb-4 pt-1">
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 px-3 rounded-lg bg-blue-50 text-primary hover:bg-blue-100 text-[10px] font-bold border border-blue-100/50 shadow-sm"
              >
                已选 {count} 项
                <ChevronDown className="h-3 w-3 ml-1 opacity-60" />
              </Button>
              
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
              >
                <Paperclip className="h-4 w-4" />
              </Button>
            </div>

            <Button 
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              size="sm" 
              className="bg-primary hover:bg-primary/95 text-white rounded-xl h-9 px-6 text-[12px] font-bold transition-all shadow-lg shadow-primary/20 active:scale-95 disabled:shadow-none"
            >
              发送
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 flex-wrap px-4">
          {AI_TOOLS.map((tool) => (
            <button 
              key={tool.label}
              onClick={() => setSelectedMode(tool.mode === selectedMode ? null : tool.mode)}
              className={cn(
                "flex items-center gap-2 px-3 py-1.5 bg-white border rounded-lg text-[11px] font-bold transition-all shadow-sm active:scale-95 group",
                selectedMode === tool.mode 
                  ? "border-primary/30 bg-primary/5 text-primary ring-1 ring-primary/10" 
                  : "border-slate-100 text-slate-600 hover:border-primary/20 hover:text-primary"
              )}
            >
              <tool.icon className={cn(
                "h-3.5 w-3.5 transition-colors", 
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
