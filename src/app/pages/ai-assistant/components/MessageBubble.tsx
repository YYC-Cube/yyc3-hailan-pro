import React from 'react';
import { User, Lock } from 'lucide-react';
import { AssistantAvatar } from './AssistantAvatar';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  suggestions?: any[];
}

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.type === 'user';

  return (
    <div className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
      {/* 头像 */}
      <div className="flex-shrink-0">
        {isUser ? (
          <div className="w-10 h-10 rounded-full bg-[#0056b3] flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
        ) : (
          <AssistantAvatar size="sm" />
        )}
      </div>

      {/* 消息内容 */}
      <div className={`flex-1 max-w-[80%] ${isUser ? 'flex flex-col items-end' : ''}`}>
        {/* 消息气泡 */}
        <div
          className={`
            px-4 py-3 rounded-xl shadow-sm
            ${isUser 
              ? 'bg-[#0056b3] text-white rounded-tr-none' 
              : 'bg-white text-text-primary rounded-tl-none border border-border'
            }
          `}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {message.content}
          </p>
        </div>

        {/* 时间戳和加密标识 */}
        <div className={`flex items-center gap-2 mt-1 px-1 ${isUser ? 'flex-row-reverse' : ''}`}>
          <span className="text-xs text-text-tertiary">
            {message.timestamp.toLocaleTimeString('zh-CN', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </span>
          {!isUser && (
            <Lock className="w-3 h-3 text-success" title="端到端加密" />
          )}
        </div>
      </div>
    </div>
  );
}
