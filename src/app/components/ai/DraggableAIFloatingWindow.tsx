import React, { useState, useRef, useEffect } from "react";
import { X, Minimize2, Maximize2, MessageCircle, Sparkles, Palette } from "lucide-react";
import { Button } from "@/app/components/design-system/Button";
import { cn } from "@/app/components/design-system/utils";
import { motion } from "framer-motion";

interface DraggableAIFloatingWindowProps {
  onClose?: () => void;
}

export function DraggableAIFloatingWindow({ onClose }: DraggableAIFloatingWindowProps) {
  const [position, setPosition] = useState({ x: window.innerWidth - 400, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [bgColor, setBgColor] = useState("#0056b3");
  const [showColorPicker, setShowColorPicker] = useState(false);
  const dragRef = useRef<HTMLDivElement>(null);
  const dragStart = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.no-drag')) return;
    setIsDragging(true);
    dragStart.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    
    const newX = Math.max(0, Math.min(e.clientX - dragStart.current.x, window.innerWidth - 360));
    const newY = Math.max(0, Math.min(e.clientY - dragStart.current.y, window.innerHeight - (isMinimized ? 60 : 400)));
    
    setPosition({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging]);

  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  return (
    <motion.div
      ref={dragRef}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      style={{
        position: 'fixed',
        left: position.x,
        top: position.y,
        zIndex: 9999,
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
      className={cn(
        "rounded-2xl overflow-hidden shadow-2xl transition-all duration-300",
        isMinimized ? "w-80" : "w-96"
      )}
      onMouseDown={handleMouseDown}
    >
      {/* Window */}
      <div
        className="relative"
        style={{
          backgroundColor: hexToRgba(bgColor, 0.5),
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div className="text-white">
              <div className="font-bold text-sm">AI 智能助手</div>
              <div className="text-[10px] opacity-70">随时为您服务</div>
            </div>
          </div>

          <div className="flex items-center gap-1 no-drag">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 rounded-lg hover:bg-white/20 text-white"
              onClick={() => setShowColorPicker(!showColorPicker)}
            >
              <Palette className="w-3.5 h-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 rounded-lg hover:bg-white/20 text-white"
              onClick={() => setIsMinimized(!isMinimized)}
            >
              {isMinimized ? <Maximize2 className="w-3.5 h-3.5" /> : <Minimize2 className="w-3.5 h-3.5" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 rounded-lg hover:bg-white/20 text-white"
              onClick={onClose}
            >
              <X className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>

        {/* Color Picker */}
        {showColorPicker && (
          <div className="px-4 py-3 border-b border-white/10 no-drag">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs text-white/70">背景颜色</span>
              <span className="text-xs text-white/50">(50% 透明度)</span>
            </div>
            <div className="grid grid-cols-6 gap-2">
              {['#0056b3', '#6B46C1', '#ED8936', '#38A169', '#F56565', '#ECC94B', '#FBB6CE', '#4A5568'].map((color) => (
                <button
                  key={color}
                  className={cn(
                    "w-full aspect-square rounded-lg border-2 transition-all hover:scale-110",
                    bgColor === color ? "border-white scale-110" : "border-white/20"
                  )}
                  style={{ backgroundColor: color }}
                  onClick={() => setBgColor(color)}
                />
              ))}
            </div>
            <input
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              className="w-full h-10 mt-2 rounded-lg cursor-pointer"
            />
          </div>
        )}

        {/* Content */}
        {!isMinimized && (
          <div className="p-4 no-drag" style={{ height: '320px' }}>
            <div className="h-full flex flex-col">
              <div className="flex-1 overflow-y-auto mb-4 space-y-3">
                <div className="bg-white/10 rounded-xl p-3 text-white text-sm">
                  <div className="flex items-start gap-2">
                    <MessageCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <p>您好！我是海蓝Pro AI助手，很高兴为您服务。有什么我可以帮助您的吗？</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="输入您的问题..."
                  className="flex-1 px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 text-sm"
                />
                <Button className="px-4 py-2 bg-white text-brand-hailan-blue hover:bg-white/90 rounded-xl font-bold text-sm">
                  发送
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
