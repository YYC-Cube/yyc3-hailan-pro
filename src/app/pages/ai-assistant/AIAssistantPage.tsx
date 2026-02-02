import React, { useState, useRef, useEffect } from 'react';
import { Send, Lock, Plus, Settings, History, Sparkles, ShieldCheck, ChevronLeft, Database, Wifi, Activity } from 'lucide-react';
import { useNavigate } from 'react-router';
import { AssistantAvatar } from './components/AssistantAvatar';
import { MessageBubble } from './components/MessageBubble';
import { SmartSuggestionCard } from './components/SmartSuggestionCard';
import { QuickQuestions } from './components/QuickQuestions';
import { FunctionPanel } from './components/FunctionPanel';
import { PrivacyControlPanel } from './components/PrivacyControlPanel';
import { motion, AnimatePresence } from 'framer-motion';

// --- NAS / 后端 API 模拟配置 ---
// 模拟真实联调状态
const NAS_CONFIG = {
  enabled: true,
  status: "CONNECTED", // CONNECTED, SYNCING, OFFLINE
  nodeName: "HaiLan-Core-Alpha-01",
  ip: "192.168.1.105",
  latency: "12ms",
  encryption: "AES-256-GCM"
};

const API_CONFIG = {
  useRealApi: false, // 设为 true 时尝试连接 apiEndpoint
  apiEndpoint: "http://192.168.1.105:3000/api/v1/chat" 
};

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  suggestions?: Suggestion[];
  isSystem?: boolean;
}

interface Suggestion {
  type: 'product' | 'health' | 'tutorial' | 'expert';
  title: string;
  description: string;
  action: string;
  data?: any;
}

export function AIAssistantPage() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'system-1',
      type: 'assistant',
      content: `[系统] 已成功握手 HaiLan-Core。当前节点：${NAS_CONFIG.nodeName}。所有交互数据将保存在您的本地 NAS 中。`,
      timestamp: new Date(),
      isSystem: true
    },
    {
      id: '1',
      type: 'assistant',
      content: '您好！我是您的 AI 健康助手。检测到您的本地健康库已同步，我可以基于您的最新生理数据（如 HRV、心率曲线）提供精准建议。您的隐私受端到端加密保护。',
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [systemLog, setSystemLog] = useState<string>('Ready');
  const [showFunctionPanel, setShowFunctionPanel] = useState(false);
  const [showPrivacyPanel, setShowPrivacyPanel] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
    setSystemLog(`NAS Requesting: ${NAS_CONFIG.nodeName}...`);

    try {
      const response = await getAIResponse(currentInput);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: response.content,
        timestamp: new Date(),
        suggestions: response.suggestions,
      };
      setMessages(prev => [...prev, assistantMessage]);
      setSystemLog('NAS Response Received');
    } catch (error) {
      console.error("NAS Service Error:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: "抱歉，无法访问您的本地 NAS。请检查网络连接或 HaiLan-Core 服务状态。",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
      setSystemLog('NAS Connection Failed');
    } finally {
      setIsTyping(false);
      setTimeout(() => setSystemLog('Idle'), 2000);
    }
  };

  const getAIResponse = async (userInput: string): Promise<{ content: string; suggestions?: Suggestion[] }> => {
    // 模拟 NAS 处理延迟
    await new Promise(resolve => setTimeout(resolve, 2000));

    const input = userInput.toLowerCase();
    let content = '';
    
    // 模拟基于 NAS 数据的特定回复
    if (input.includes('数据') || input.includes('健康') || input.includes('分析')) {
      content = `根据您 NAS 中的本地数据库分析，您本周的平均压力指数为 42（正常）。但在昨晚 23:00 左右，监测到您的 HRV 有轻微波动。建议今晚配合“星云脉冲”的‘静谧模式’进行 15 分钟的呼吸放松。`;
    } else if (input.includes('同步') || input.includes('连接')) {
      content = `当前与 NAS 节点 ${NAS_CONFIG.nodeName} 连接稳定。您的所有 12 台智能设备数据已完成 100% 同步。加密协议：${NAS_CONFIG.encryption}。`;
    } else {
      content = '我已经收到您的咨询。正在从您的私密知识库中检索相关信息... 这里有一些基于您以往偏好的建议。';
    }
    
    return { content, suggestions: [] };
  };

  return (
    <div className="min-h-screen bg-bg-secondary">
      {/* 顶部导航栏 */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-border shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors">
              <ChevronLeft className="w-6 h-6 text-text-primary" />
            </button>
            <AssistantAvatar size="sm" />
            <div>
              <h1 className="text-md font-bold text-text-primary">海蓝 AI 核心</h1>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-tight">NAS Sync Active</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setShowFunctionPanel(true)}
              className="p-2 hover:bg-bg-secondary rounded-lg transition-colors text-text-secondary"
            >
               <Settings className="w-5 h-5" />
            </button>
            <button onClick={() => setShowPrivacyPanel(true)} className="p-2 hover:bg-bg-secondary rounded-lg transition-colors">
              <ShieldCheck className="w-5 h-5 text-text-secondary" />
            </button>
          </div>
        </div>
      </header>

      {/* NAS 状态浮层 */}
      <div className="bg-emerald-50/90 backdrop-blur border-b border-emerald-100 text-[10px] font-medium text-emerald-700 px-4 py-1.5 flex items-center justify-between sticky top-[61px] z-20 shadow-sm">
         <div className="flex items-center gap-2">
            <Activity className="w-3 h-3" />
            <span>状态: {systemLog === 'Idle' ? '就绪' : systemLog}</span>
         </div>
         <div className="flex items-center gap-4">
            <span className="hidden sm:inline">节点: {NAS_CONFIG.nodeName}</span>
            <span className="flex items-center gap-1"><Lock className="w-2.5 h-2.5" /> 加密传输</span>
         </div>
      </div>

      {/* 主内容区域 */}
      <div className="max-w-4xl mx-auto px-4 py-6 pb-32">
        <div className="space-y-6">
          {messages.map((message) => (
            <div key={message.id} className={message.isSystem ? "flex justify-center my-4" : "animate-slideUp"}>
              {message.isSystem ? (
                <div className="px-3 py-1 rounded-full bg-neutral-100 text-[10px] font-bold text-neutral-400 flex items-center gap-2 border border-neutral-200">
                   <Database className="w-3 h-3" />
                   {message.content}
                </div>
              ) : (
                <MessageBubble message={message} />
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex items-start gap-3 animate-fadeIn">
              <AssistantAvatar size="sm" />
              <div className="bg-white rounded-2xl px-4 py-3 shadow-sm border border-neutral-100">
                <div className="flex gap-1.5 items-center">
                  <span className="text-[10px] font-bold text-neutral-400 animate-pulse">正在检索 NAS 数据...</span>
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></span>
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* 输入区域 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-border shadow-lg z-30">
        <div className="max-w-4xl mx-auto px-4 py-4 pb-8 md:pb-4">
          <div className="flex items-end gap-3">
            <div className="flex-1 relative">
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder="询问您的健康数据或咨询产品..."
                className="w-full px-5 py-3.5 pr-12 bg-neutral-50 border border-neutral-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-deep-blue/20 focus:bg-white transition-all resize-none min-h-[56px] max-h-32 text-sm font-medium"
                rows={1}
              />
              <div className="absolute right-4 bottom-3.5 flex items-center gap-2">
                <Lock className="w-4 h-4 text-emerald-500" />
              </div>
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              className="w-14 h-14 bg-[#0056b3] text-white rounded-2xl hover:bg-[#004494] disabled:opacity-50 transition-all flex items-center justify-center shrink-0 shadow-lg active:scale-95"
            >
              <Send className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {showPrivacyPanel && <PrivacyControlPanel onClose={() => setShowPrivacyPanel(false)} />}
      {showFunctionPanel && <FunctionPanel onClose={() => setShowFunctionPanel(false)} />}
    </div>
  );
}
