import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Minus, 
  Send, 
  Sparkles,
  Settings,
  Plus,
  ShieldCheck,
  Mic,
  MicOff,
  Maximize2,
  Minimize2,
  Activity,
  Server,
  Shield
} from 'lucide-react';
import { MessageBubble } from '@/app/pages/ai-assistant/components/MessageBubble';
import { SmartSuggestionCard } from '@/app/pages/ai-assistant/components/SmartSuggestionCard';
import { QuickQuestions } from '@/app/pages/ai-assistant/components/QuickQuestions';
import { FunctionPanel } from '@/app/pages/ai-assistant/components/FunctionPanel';
import { PrivacyControlPanel } from '@/app/pages/ai-assistant/components/PrivacyControlPanel';
import { AssistantAvatar } from '@/app/pages/ai-assistant/components/AssistantAvatar';
import { Button } from '@/app/components/design-system/Button';
import aiLogo from 'figma:asset/d687e8c6eaff439058d15cc055f57aadc55a2b38.png';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  suggestions?: any[];
}

interface Suggestion {
  type: 'product' | 'health' | 'tutorial' | 'expert';
  title: string;
  description: string;
  action: string;
  data?: any;
}

export function GlobalAIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [showFunctionPanel, setShowFunctionPanel] = useState(false);
  const [showPrivacyPanel, setShowPrivacyPanel] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: '您好！我是您的 AI 健康助手。检测到您的本地健康库已同步，我可以基于您的最新生理数据（如 HRV、心率曲线）提供精准建议。您的隐私受端到端加密保护。',
      timestamp: new Date(),
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom();
    }
  }, [messages, isOpen, isMinimized, isExpanded]);

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const getSuggestions = (input: string): Suggestion[] => {
    const suggestions: Suggestion[] = [];
    if (input.includes('推荐') || input.includes('建议')) {
      suggestions.push({
        type: 'product',
        title: '为您推荐',
        description: '基于您的需求，我们为您精选了几款优质产品',
        action: '查看推荐',
        data: {
          products: [
            { id: 1, name: '舒适系列', price: '¥299', rating: 4.8 },
            { id: 2, name: '智能系列', price: '¥599', rating: 4.9 },
          ]
        }
      });
    }
    if (input.includes('使用') || input.includes('如何')) {
      suggestions.push({
        type: 'tutorial',
        title: '使用教程',
        description: '详细的图文和视频教程，帮助您正确使用',
        action: '查看教程',
      });
    }
    return suggestions;
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      let content = '我已经收到您的咨询。正在从您的私密知识库中检索相关信息... 这里有一些基于您以往偏好的建议。';
      const lowerInput = currentInput.toLowerCase();
      
      if (lowerInput.includes('推荐') || lowerInput.includes('建议')) {
        content = '根据您的需求，我为您精心挑选了几款产品。这些产品均采用医用级材质，安全可靠，并且具有出色的用户评价。您可以查看下方的产品推荐卡片，了解更多详情。';
      } else if (lowerInput.includes('使用') || lowerInput.includes('如何') || lowerInput.includes('怎么')) {
        content = '关于使用方法，我为您准备了详细的图文教程和视频指导。正确的使用方式不仅能提升体验，还能确保安全和卫生。您可以点击下方的教程链接查看详细说明。';
      }

      const suggestions = getSuggestions(currentInput);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content,
        timestamp: new Date(),
        suggestions
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleVoiceInput = () => {
    if (isListening) {
      setIsListening(false);
    } else {
      setIsListening(true);
      setTimeout(() => {
        setIsListening(false);
        setInputValue("推荐一些适合新手的健康产品");
      }, 3000);
    }
  };

  const sendMessage = (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: text,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: '感谢您的提问。我为您找到了一些相关信息。',
        timestamp: new Date(),
        suggestions: getSuggestions(text)
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const toggleOpen = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
  };

  const handleMinimize = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMinimized(true);
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(false);
    setIsExpanded(false);
  };

  const handleExpandToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  const handleNewConversation = () => {
    setMessages([{
        id: Date.now().toString(),
        type: 'assistant',
        content: '您好！我是您的AI健康助手。有什么我可以帮助您的吗？',
        timestamp: new Date(),
    }]);
  };

  const getWindowStyles = () => {
    if (isMobile) {
      return { width: '100%', height: '100%', bottom: 0, right: 0, borderRadius: 0 };
    }
    if (isExpanded) {
      return { width: '800px', height: '80vh', bottom: '10vh', right: 'calc(50% - 400px)' };
    }
    return { width: '380px', height: '650px', bottom: 80, right: 32 };
  };

  return (
    <div className="fixed z-[9999] pointer-events-none inset-0 overflow-hidden font-sans">
        {(!isOpen || isMinimized) && (
          <div
            className="absolute pointer-events-auto animate-fadeIn"
            style={{ bottom: 32, right: 32 }}
            onClick={toggleOpen}
          >
             <div className="relative group cursor-pointer">
               <div className="absolute inset-0 bg-[#0056b3]/20 rounded-full blur-xl animate-pulse group-hover:bg-[#0056b3]/40 transition-colors" />
               <button className="relative w-16 h-16 bg-white rounded-full shadow-2xl border border-white/60 backdrop-blur-md flex items-center justify-center overflow-hidden hover:scale-110 active:scale-90 transition-transform">
                  <img src={aiLogo} alt="AI" className="w-10 h-10 object-contain" />
               </button>
               <div className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full border-2 border-white" />
             </div>
          </div>
        )}

        {isOpen && !isMinimized && (
          <div
            className={`absolute pointer-events-auto flex flex-col bg-white/95 backdrop-blur-2xl shadow-2xl border border-white/60 overflow-hidden animate-slideUp ${isMobile ? 'rounded-none' : 'rounded-3xl'}`}
            style={{ position: 'absolute', ...getWindowStyles() }}
          >
            <div className={`flex items-center justify-between px-5 py-4 bg-white/80 border-b border-neutral-100/50 ${(!isMobile && !isExpanded) ? 'cursor-move' : ''}`}>
                <div className="flex items-center gap-3 pointer-events-none select-none">
                    <div className="w-8 h-8 rounded-full bg-transparent flex items-center justify-center">
                        <img src={aiLogo} alt="Logo" className="w-full h-full object-contain" />
                    </div>
                    <div>
                        <h3 className="text-lg font-serif font-bold text-[#0056b3]">海蓝 AI 核心</h3>
                    </div>
                </div>
                
                <div className="flex items-center gap-1 z-10" onPointerDown={(e) => e.stopPropagation()}>
                    <div className="mr-2">
                       <ShieldCheck className="w-5 h-5 text-neutral-400" />
                    </div>
                    {!isMobile && (
                      <button onClick={handleExpandToggle} className="p-1.5 hover:bg-neutral-100 rounded-lg text-neutral-400 hover:text-neutral-600 transition-colors hidden md:block">
                        {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                      </button>
                    )}
                    <button onClick={handleMinimize} className="p-1.5 hover:bg-neutral-100 rounded-lg text-neutral-400 hover:text-neutral-600 transition-colors">
                        <Minus className="w-4 h-4" />
                    </button>
                    <button onClick={handleClose} className="p-1.5 hover:bg-red-50 hover:text-red-500 rounded-lg text-neutral-400 transition-colors">
                        <X className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div className="bg-[#002b5c] text-white px-4 py-1.5 flex flex-col gap-0.5 text-[9px] font-mono tracking-wider">
                <div className="flex items-center gap-2 scale-90 origin-left">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="font-bold text-emerald-500 uppercase">Nas Sync Active</span>
                </div>
                <div className="flex items-center justify-between text-white">
                  <div className="flex flex-col sm:flex-row sm:gap-4">
                      <span className="flex items-center gap-1">
                         <Activity className="w-2.5 h-2.5" />
                         LOG: <span className="text-emerald-400">IDLE</span>
                      </span>
                      <span className="flex items-center gap-1">
                         <Server className="w-2.5 h-2.5" />
                         NODE: <span className="text-emerald-400 font-bold">HaiLan-Core-Alpha-01</span>
                      </span>
                  </div>
                  <span className="flex items-center gap-1">
                     <Shield className="w-2.5 h-2.5" />
                     SEC: <span className="text-emerald-400 font-bold">AES-256</span>
                  </span>
                </div>
            </div>

            <div className="flex items-center justify-between px-4 py-2 bg-neutral-50/50 border-b border-neutral-100/50 text-xs" onPointerDown={(e) => e.stopPropagation()}>
               <div className="flex gap-1">
                  <button onClick={() => setShowFunctionPanel(!showFunctionPanel)} className="p-2 hover:bg-white rounded-lg text-neutral-600 transition-all hover:shadow-sm flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#0056b3]" />
                      <span>功能</span>
                  </button>
                  <button onClick={() => setShowPrivacyPanel(!showPrivacyPanel)} className="p-2 hover:bg-white rounded-lg text-neutral-600 transition-all hover:shadow-sm flex items-center gap-1.5">
                      <Settings className="w-3.5 h-3.5 text-neutral-500" />
                      <span>隐私</span>
                  </button>
               </div>
               <button onClick={handleNewConversation} className="p-2 hover:bg-white rounded-lg text-neutral-600 transition-all hover:shadow-sm flex items-center gap-1.5">
                  <Plus className="w-3.5 h-3.5" />
                  <span>新对话</span>
               </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-neutral-50/30 scrollbar-hide" onPointerDown={(e) => e.stopPropagation()}>
                {messages.length === 1 && (
                    <div className="text-center py-6 animate-fadeIn">
                        <AssistantAvatar size="xl" animated />
                        <h2 className="text-lg font-bold text-neutral-900 mt-4 mb-2">欢迎使用海蓝 AI 核心</h2>
                        <div className="text-[10px] bg-[#0056b3]/5 border border-[#0056b3]/10 inline-block px-2 py-1 rounded text-[#0056b3] mb-4">
                           [系统] 已成功握手 HaiLan-Core。所有交互数据将保存在您的本地 NAS 中。
                        </div>
                        <p className="text-neutral-500 text-sm mb-6 max-w-[280px] mx-auto leading-relaxed">
                            24小时在线的私密健康顾问。为您提供专业建议、产品推荐和使用指导。
                        </p>
                        <QuickQuestions onQuestionClick={(q) => sendMessage(q)} />
                    </div>
                )}

                {messages.slice(messages.length === 1 ? 1 : 0).map((msg) => (
                    <div key={msg.id} className="space-y-3">
                        <MessageBubble message={msg as any} /> 
                        {msg.suggestions && msg.suggestions.length > 0 && (
                           <div className="pl-12 space-y-2">
                             {msg.suggestions.map((sugg, idx) => (
                                <SmartSuggestionCard key={idx} suggestion={sugg} />
                             ))}
                           </div>
                        )}
                    </div>
                ))}
                
                {isTyping && (
                    <div className="flex items-center gap-3 animate-fadeIn pl-2">
                        <AssistantAvatar size="sm" />
                        <div className="bg-white border border-neutral-100 px-4 py-3 rounded-2xl rounded-tl-none shadow-sm flex gap-1">
                            <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" />
                            <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce delay-75" />
                            <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce delay-150" />
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className="p-4 bg-white border-t border-neutral-100" onPointerDown={(e) => e.stopPropagation()}>
                <div className="relative flex items-center gap-2">
                    <div className="flex-1 relative">
                        <input 
                          type="text"
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                          placeholder={isListening ? "正在聆听..." : "询问您的健康数据或咨询产品..."}
                          disabled={isListening}
                          className={`w-full bg-neutral-50 border border-neutral-200 rounded-2xl pl-4 pr-10 py-3 text-sm focus:ring-2 focus:ring-[#0056b3]/20 focus:border-[#0056b3]/50 outline-none transition-all placeholder:text-neutral-400 ${isListening ? 'bg-red-50/50 border-red-200 animate-pulse' : ''}`}
                        />
                        <button onClick={handleVoiceInput} className={`absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full transition-colors ${isListening ? 'bg-red-500 text-white hover:bg-red-600' : 'text-neutral-400 hover:bg-neutral-200'}`} title="语音输入">
                           {isListening ? <MicOff className="w-4 h-4 animate-pulse" /> : <Mic className="w-4 h-4" />}
                        </button>
                    </div>
                    <Button size="icon" className="rounded-xl h-11 w-11 shrink-0 bg-[#0056b3] hover:bg-[#0056b3]/90 shadow-lg" onClick={handleSendMessage} disabled={!inputValue.trim() && !isListening}>
                        <Send className="w-5 h-5 ml-0.5" />
                    </Button>
                </div>
            </div>

            {showFunctionPanel && (
              <div className="absolute inset-0 bg-white z-20 animate-slideUp" onPointerDown={(e) => e.stopPropagation()}>
                  <FunctionPanel onClose={() => setShowFunctionPanel(false)} />
              </div>
            )}
            {showPrivacyPanel && (
              <div className="absolute inset-0 bg-white z-20 animate-slideUp" onPointerDown={(e) => e.stopPropagation()}>
                  <PrivacyControlPanel onClose={() => setShowPrivacyPanel(false)} />
              </div>
            )}
          </div>
        )}
    </div>
  );
}
