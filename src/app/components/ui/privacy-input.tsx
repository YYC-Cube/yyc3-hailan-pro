/**
 * PrivacyInput 隐私输入框组件
 * 支持隐私模式、密码强度指示、安全提示等功能
 */

import React, { useState, forwardRef } from 'react';
import { Eye, EyeOff, Lock, Shield, AlertCircle, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from './input';

export interface PrivacyInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** 是否启用隐私模式 */
  privacyMode?: boolean;
  /** 是否显示隐私图标 */
  showPrivacyIcon?: boolean;
  /** 隐私提示文本 */
  privacyHint?: string;
  /** 是否显示密码强度指示器（仅type="password"时有效） */
  showPasswordStrength?: boolean;
  /** 错误信息 */
  error?: string;
  /** 成功信息 */
  success?: string;
}

/**
 * 计算密码强度
 */
function calculatePasswordStrength(password: string): {
  score: number;
  label: string;
  color: string;
} {
  let score = 0;

  if (!password) {
    return { score: 0, label: '', color: '' };
  }

  // 长度检查
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;

  // 包含小写字母
  if (/[a-z]/.test(password)) score += 1;

  // 包含大写字母
  if (/[A-Z]/.test(password)) score += 1;

  // 包含数字
  if (/\d/.test(password)) score += 1;

  // 包含特殊字符
  if (/[^a-zA-Z\d]/.test(password)) score += 1;

  if (score <= 2) {
    return { score, label: '弱', color: 'bg-red-500' };
  } else if (score <= 4) {
    return { score, label: '中', color: 'bg-yellow-500' };
  } else {
    return { score, label: '强', color: 'bg-green-500' };
  }
}

export const PrivacyInput = forwardRef<HTMLInputElement, PrivacyInputProps>(
  (
    {
      privacyMode = false,
      showPrivacyIcon = true,
      privacyHint,
      showPasswordStrength = false,
      error,
      success,
      className,
      type = 'text',
      placeholder,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const isPassword = type === 'password';
    const actualType = isPassword && showPassword ? 'text' : type;

    const passwordStrength = showPasswordStrength && isPassword
      ? calculatePasswordStrength(inputValue)
      : null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
      props.onChange?.(e);
    };

    return (
      <div className="w-full">
        <div className="relative">
          {/* 左侧隐私图标 */}
          {privacyMode && showPrivacyIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none z-10">
              <Lock className="w-4 h-4 text-text-tertiary" aria-hidden="true" />
            </div>
          )}

          {/* 输入框 */}
          <Input
            ref={ref}
            type={actualType}
            placeholder={
              privacyMode && showPrivacyIcon
                ? `🔒 ${placeholder || ''}`
                : placeholder
            }
            className={cn(
              privacyMode && showPrivacyIcon && 'pl-10',
              (isPassword || error || success) && 'pr-10',
              privacyMode && 'border-[#6B46C1] focus:ring-[#6B46C1]',
              error && 'border-error focus:ring-error',
              success && 'border-success focus:ring-success',
              className
            )}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            aria-invalid={error ? 'true' : undefined}
            aria-describedby={
              error ? 'input-error' : success ? 'input-success' : privacyHint ? 'input-hint' : undefined
            }
            {...props}
          />

          {/* 右侧图标 */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
            {/* 成功图标 */}
            {success && !error && (
              <CheckCircle2 className="w-4 h-4 text-success" aria-hidden="true" />
            )}

            {/* 错误图标 */}
            {error && (
              <AlertCircle className="w-4 h-4 text-error" aria-hidden="true" />
            )}

            {/* 密码显示/隐藏切换 */}
            {isPassword && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-text-tertiary hover:text-text-primary transition-colors focus-ring rounded"
                aria-label={showPassword ? '隐藏密码' : '显示密码'}
                tabIndex={0}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            )}

            {/* 隐私模式指示器 */}
            {privacyMode && !showPrivacyIcon && (
              <Shield className="w-4 h-4 text-[#6B46C1]" aria-label="隐私模式" />
            )}
          </div>
        </div>

        {/* 密码强度指示器 */}
        {showPasswordStrength && isPassword && inputValue && isFocused && (
          <div className="mt-2" role="status" aria-live="polite">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-text-secondary">密码强度</span>
              <span
                className={cn(
                  'text-xs font-medium',
                  passwordStrength?.score && passwordStrength.score <= 2 && 'text-red-600',
                  passwordStrength?.score && passwordStrength.score > 2 && passwordStrength.score <= 4 && 'text-yellow-600',
                  passwordStrength?.score && passwordStrength.score > 4 && 'text-green-600'
                )}
              >
                {passwordStrength?.label}
              </span>
            </div>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5, 6].map((level) => (
                <div
                  key={level}
                  className={cn(
                    'h-1 flex-1 rounded-full transition-colors',
                    passwordStrength && passwordStrength.score >= level
                      ? passwordStrength.color
                      : 'bg-bg-tertiary'
                  )}
                  aria-hidden="true"
                />
              ))}
            </div>
            <div className="mt-2 text-xs text-text-tertiary space-y-1">
              <div className={cn(inputValue.length >= 8 && 'text-success')}>
                {inputValue.length >= 8 ? '✓' : '○'} 至少8个字符
              </div>
              <div className={cn(/[a-z]/.test(inputValue) && /[A-Z]/.test(inputValue) && 'text-success')}>
                {/[a-z]/.test(inputValue) && /[A-Z]/.test(inputValue) ? '✓' : '○'} 包含大小写字母
              </div>
              <div className={cn(/\d/.test(inputValue) && 'text-success')}>
                {/\d/.test(inputValue) ? '✓' : '○'} 包含数字
              </div>
              <div className={cn(/[^a-zA-Z\d]/.test(inputValue) && 'text-success')}>
                {/[^a-zA-Z\d]/.test(inputValue) ? '✓' : '○'} 包含特殊字符
              </div>
            </div>
          </div>
        )}

        {/* 隐私提示 */}
        {privacyHint && !error && !success && (
          <div
            id="input-hint"
            className="mt-1.5 text-xs text-text-tertiary flex items-center gap-1"
          >
            <Shield className="w-3 h-3 text-[#6B46C1]" aria-hidden="true" />
            <span>{privacyHint}</span>
          </div>
        )}

        {/* 错误信息 */}
        {error && (
          <div
            id="input-error"
            className="mt-1.5 text-xs text-error flex items-center gap-1"
            role="alert"
          >
            <AlertCircle className="w-3 h-3" aria-hidden="true" />
            <span>{error}</span>
          </div>
        )}

        {/* 成功信息 */}
        {success && !error && (
          <div
            id="input-success"
            className="mt-1.5 text-xs text-success flex items-center gap-1"
            role="status"
          >
            <CheckCircle2 className="w-3 h-3" aria-hidden="true" />
            <span>{success}</span>
          </div>
        )}
      </div>
    );
  }
);

PrivacyInput.displayName = 'PrivacyInput';

/**
 * 搜索框（带隐私滤镜）
 */
export const PrivacySearchInput = forwardRef<HTMLInputElement, PrivacyInputProps>(
  ({ privacyMode, placeholder = '搜索...', ...props }, ref) => {
    return (
      <PrivacyInput
        ref={ref}
        type="search"
        privacyMode={privacyMode}
        showPrivacyIcon={false}
        placeholder={privacyMode ? `🔒 ${placeholder}` : placeholder}
        privacyHint={privacyMode ? '搜索内容已加密，不会被记录' : undefined}
        {...props}
      />
    );
  }
);

PrivacySearchInput.displayName = 'PrivacySearchInput';