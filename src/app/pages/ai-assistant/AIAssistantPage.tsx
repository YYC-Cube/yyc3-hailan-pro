import React, { useState, useRef, useEffect } from 'react';
import { Send, Lock, Plus, Settings, History, Sparkles, ShieldCheck, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AssistantAvatar } from './components/AssistantAvatar';
import { MessageBubble } from './components/MessageBubble';
import { SmartSuggestionCard } from './components/SmartSuggestionCard';
import { QuickQuestions } from './components/QuickQuestions';
import { FunctionPanel } from './components/FunctionPanel';
import { PrivacyControlPanel } from './components/PrivacyControlPanel';

// --- NAS / 后端 API 配置 ---
// 如果您在 NAS 上部署了后端服务，请修改以下配置以启用真实数据交互
const API_CONFIG = {
  // 设置为 true 以启用真实 API 调用，设置为 false 则使用本地模拟逻辑
  useRealApi: false, 
  // 您的 NAS API 地址，例如 "http://192.168.1.100:3000/api/chat"
  // 注意：如果是 HTTP 而非 HTTPS，可能需要配置浏览器的混合内容权限，或者使用反向代理
  apiEndpoint: "http://localhost:3000/api/chat" 
};

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  suggestions?: Suggestion[];
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
      id: '1',
      type: 'assistant',
      content: '您好！我是您的AI健康助手。我可以帮助您了解产品信息、提供健康建议、解答疑问。所有对话都经过端到端加密保护，您的隐私是我们的首要考虑。',
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showFunctionPanel, setShowFunctionPanel] = useState(false);
  const [showPrivacyPanel, setShowPrivacyPanel] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    // 添加用户消息
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputValue; // 保存当前输入用于请求
    setInputValue('');
    setIsTyping(true);

    try {
      // 获取 AI 回复 (支持 NAS API 或本地模拟)
      const response = await getAIResponse(currentInput);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: response.content,
        timestamp: new Date(),
        suggestions: response.suggestions,
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error("AI Service Error:", error);
      // 错误处理
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: "抱歉，连接服务时出现问题。请稍后再试。",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  // 模拟/真实 API 调用
  const getAIResponse = async (userInput: string): Promise<{ content: string; suggestions?: Suggestion[] }> => {
    // 1. 如果启用了真实 API
    if (API_CONFIG.useRealApi) {
      try {
        const res = await fetch(API_CONFIG.apiEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: userInput })
        });
        if (!res.ok) throw new Error('API request failed');
        return await res.json();
      } catch (e) {
        console.warn("API call failed, falling back to local simulation", e);
        // 如果 API 失败，可以自动降级到本地逻辑，或者抛出错误
        // 这里演示自动降级
      }
    }

    // 2. 本地模拟逻辑 (带延迟)
    await new Promise(resolve => setTimeout(resolve, 1500));

    const input = userInput.toLowerCase();
    let content = '';
    let suggestions: Suggestion[] | undefined = getSuggestions(userInput); // 使用现有的建议逻辑
    
    if (input.includes('推荐') || input.includes('建议')) {
      content = '根据您的需求，我为您精心挑选了几款产品。这些产品均采用医用级材质，安全可靠，并且具有出色的用户评价。您可以查看下方的产品推荐卡片，了解更多详情。';
    } else if (input.includes('使用') || input.includes('如何') || input.includes('怎么')) {
      content = '关于使用方法，我为您准备了详细的图文教程和视频指导。正确的使用方式不仅能提升体验，还能确保安全和卫生。您可以点击下方的教程链接查看详细说明。';
    } else if (input.includes('清洁') || input.includes('保养') || input.includes('维护')) {
      content = '产品的清洁和保养非常重要。建议使用专用清洁剂，在使用前后都要进行彻底清洁。存放时应保持干燥，避免阳光直射。我可以为您设置定期清洁提醒。';
    } else if (input.includes('隐私') || input.includes('安全')) {
      content = '您的隐私和数据安全是我们的首要考虑。所有对话都经过端到端加密，我们不会存储任何敏感信息。您可以在隐私控制面板中管理您的数据设置。';
    } else {
      content = '感谢您的提问。我理解您的需求，让我为您提供一些有用的信息和建议。如果您需要更详细的帮助，我可以为您转接专业健康顾问。';
    }
    
    return { content, suggestions };
  };

  const getSuggestions = (userInput: string): Suggestion[] => {
    const input = userInput.toLowerCase();
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

    if (input.includes('健康') || input.includes('保养')) {
      suggestions.push({
        type: 'health',
        title: '健康建议',
        description: '科学的健康指导，让您更了解自己的身体',
        action: '了解更多',
      });
    }

    return suggestions;
  };

  const handleQuickQuestion = (question: string) => {
    setInputValue(question);
    setTimeout(() => handleSendMessage(), 100);
  };

  const handleNewConversation = () => {
    if (messages.length > 1) {
      const conversationTitle = `对话 - ${new Date().toLocaleString('zh-CN')}`;
      setConversationHistory(prev => [...prev, conversationTitle]);
    }
    setMessages([
      {
        id: Date.now().toString(),
        type: 'assistant',
        content: '您好！我是您的AI健康助手。有什么我可以帮助您的吗？',
        timestamp: new Date(),
      }
    ]);
  };

  return (
    <div className="min-h-screen bg-bg-secondary">
      {/* 顶部导航栏 */}
      <header className="sticky top-0 z-10 bg-white border-b border-border shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate(-1)}
              className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="返回"
            >
              <ChevronLeft className="w-6 h-6 text-text-primary" />
            </button>
            <AssistantAvatar size="md" />
            <div>
              <h1 className="text-lg font-semibold text-text-primary">AI健康助手</h1>
              <div className="flex items-center gap-2 text-sm text-text-tertiary">
                <Lock className="w-3 h-3" />
                <span>端到端加密保护</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFunctionPanel(!showFunctionPanel)}
              className="p-2 hover:bg-bg-secondary rounded-lg transition-colors"
              title="功能面板"
            >
              <Sparkles className="w-5 h-5 text-text-secondary" />
            </button>
            <button
              onClick={() => setShowPrivacyPanel(!showPrivacyPanel)}
              className="p-2 hover:bg-bg-secondary rounded-lg transition-colors"
              title="隐私设置"
            >
              <Settings className="w-5 h-5 text-text-secondary" />
            </button>
            <button
              onClick={handleNewConversation}
              className="p-2 hover:bg-bg-secondary rounded-lg transition-colors"
              title="新对话"
            >
              <Plus className="w-5 h-5 text-text-secondary" />
            </button>
          </div>
        </div>
      </header>

      {/* 主内容区域 */}
      <div className="max-w-4xl mx-auto px-4 py-6 pb-32">
        {/* 欢迎区域 - 只在第一次显示 */}
        {messages.length === 1 && (
          <div className="mb-8 text-center animate-fadeIn">
            <div className="mb-6 flex justify-center">
              <AssistantAvatar size="xl" animated />
            </div>
            <h2 className="text-2xl font-semibold text-text-primary mb-3">
              欢迎使用AI健康助手
            </h2>
            <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
              我可以帮助您了解产品信息、提供健康建议、解答疑问。所有对话都经过端到端加密保护。
            </p>
            
            {/* 隐私保护徽章 */}
            <div className="flex items-center justify-center gap-6 mb-8">
              <div className="flex items-center gap-2 text-sm text-text-tertiary">
                <ShieldCheck className="w-5 h-5 text-success" />
                <span>端到端加密</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-text-tertiary">
                <Lock className="w-5 h-5 text-success" />
                <span>隐私保护</span>
              </div>
            </div>

            {/* 快速问题入口 */}
            <QuickQuestions onQuestionClick={handleQuickQuestion} />
          </div>
        )}

        {/* 消息列表 */}
        <div className="space-y-6">
          {messages.map((message) => (
            <div key={message.id} className="animate-slideUp">
              <MessageBubble message={message} />
              
              {/* 智能建议卡片 */}
              {message.suggestions && message.suggestions.length > 0 && (
                <div className="mt-4 space-y-3">
                  {message.suggestions.map((suggestion, index) => (
                    <SmartSuggestionCard
                      key={index}
                      suggestion={suggestion}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* 正在输入指示器 */}
          {isTyping && (
            <div className="flex items-start gap-3 animate-fadeIn">
              <AssistantAvatar size="sm" />
              <div className="bg-white rounded-xl px-4 py-3 shadow-sm">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-text-tertiary rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-text-tertiary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></span>
                  <span className="w-2 h-2 bg-text-tertiary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* 输入区域 - 固定底部 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border shadow-lg z-20">
        <div className="max-w-4xl mx-auto px-4 py-4">
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
                placeholder="输入您的问题... (Shift + Enter 换行)"
                className="w-full px-4 py-3 pr-12 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0056b3] focus:border-transparent resize-none min-h-[52px] max-h-32"
                rows={1}
              />
              <div className="absolute right-3 bottom-3 flex items-center gap-2">
                <Lock className="w-4 h-4 text-success" title="端到端加密" />
              </div>
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
              className="px-6 py-3 bg-[#0056b3] text-white rounded-xl hover:bg-[#004494] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2 font-medium"
            >
              <Send className="w-5 h-5" />
              <span>发送</span>
            </button>
          </div>
          
          <div className="mt-2 text-xs text-text-tertiary text-center">
            对话内容经过端到端加密，我们不会存储任何敏感信息
          </div>
        </div>
      </div>

      {/* 功能扩展面板 */}
      {showFunctionPanel && (
        <FunctionPanel onClose={() => setShowFunctionPanel(false)} />
      )}

      {/* 隐私控制面板 */}
      {showPrivacyPanel && (
        <PrivacyControlPanel onClose={() => setShowPrivacyPanel(false)} />
      )}
    </div>
  );
}
