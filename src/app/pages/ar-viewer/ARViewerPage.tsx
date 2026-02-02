import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { 
  X, 
  Camera as CameraIcon,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Settings,
  Share2,
  Download,
  RefreshCw,
  Box,
  Scan
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ARControlPanel } from './components/ARControlPanel';
import { ARScreenshotPanel } from './components/ARScreenshotPanel';
import { ARExitConfirm } from './components/ARExitConfirm';
import { ARSmartShopOverlay } from './components/ARSmartShopOverlay';
import { cn } from '@/app/components/design-system/utils';

export function ARViewerPage() {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [showControlPanel, setShowControlPanel] = useState(false);
  const [showScreenshotPanel, setShowScreenshotPanel] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [modelScale, setModelScale] = useState(1);
  const [modelRotation, setModelRotation] = useState(0);
  const [selectedColor, setSelectedColor] = useState('default');
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(true);

  useEffect(() => {
    startCamera();
    // Simulate scanning phase
    const timer = setTimeout(() => {
      setIsScanning(false);
    }, 2500);
    return () => {
      stopCamera();
      clearTimeout(timer);
    };
  }, []);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error('无法访问摄像头:', error);
      // Fallback for demo/desktop without camera
      // alert('无法访问摄像头，请检查权限设置');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const handleZoomIn = () => setModelScale(prev => Math.min(prev + 0.1, 3));
  const handleZoomOut = () => setModelScale(prev => Math.max(prev - 0.1, 0.5));
  const handleRotate = () => setModelRotation(prev => (prev + 45) % 360);
  const handleReset = () => {
    setModelScale(1);
    setModelRotation(0);
  };

  const captureScreenshot = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        // Draw video frame
        ctx.drawImage(video, 0, 0);
        
        // Draw AR content (mocked)
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate((modelRotation * Math.PI) / 180);
        ctx.scale(modelScale, modelScale);
        ctx.fillStyle = "rgba(0, 86, 179, 0.3)";
        ctx.fillRect(-100, -100, 200, 200);
        ctx.restore();
        
        const screenshotData = canvas.toDataURL('image/png');
        setScreenshot(screenshotData);
        setShowScreenshotPanel(true);
      }
    }
  };

  const handleExit = () => setShowExitConfirm(true);
  const confirmExit = () => {
    stopCamera();
    navigate(-1);
  };

  return (
    <div className="fixed inset-0 bg-black overflow-hidden font-sans">
      {/* Camera View */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover"
        />
        <canvas ref={canvasRef} className="hidden" />
        
        {/* Scanning Overlay Grid */}
        <AnimatePresence>
          {isScanning && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 pointer-events-none"
            >
              <div className="w-full h-full bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <motion.div 
                  animate={{ scale: [0.9, 1.1, 0.9], opacity: [0.5, 1, 0.5] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="flex flex-col items-center gap-4"
                >
                  <Scan className="w-16 h-16 text-white/80" />
                  <span className="text-white/80 font-medium tracking-widest uppercase text-sm bg-black/20 px-4 py-1 rounded-full backdrop-blur-sm">Scanning Surface...</span>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* AR Model Overlay */}
      {!isScanning && (
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', damping: 20 }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div 
            className="relative transition-all duration-300 ease-out will-change-transform"
            style={{ 
              transform: `scale(${modelScale}) rotate(${modelRotation}deg)`,
            }}
          >
            {/* 3D Model Placeholder */}
            <div className="w-64 h-64 relative group">
               {/* Selection Box */}
               <div className="absolute inset-0 border-2 border-white/30 rounded-3xl group-hover:border-white/60 transition-colors" />
               <div className="absolute -inset-1 border border-white/10 rounded-[26px] animate-pulse" />
               
               {/* Cube Representation */}
               <div className="w-full h-full bg-gradient-to-br from-brand-deep-blue/40 to-brand-elegant-purple/40 backdrop-blur-md rounded-2xl flex flex-col items-center justify-center shadow-2xl shadow-brand-deep-blue/20">
                 <div className="text-6xl mb-2 drop-shadow-lg">📦</div>
                 <div className="text-center">
                    <div className="text-white font-bold text-lg drop-shadow-md">Product Model</div>
                    <div className="text-white/80 text-xs">{Math.round(modelScale * 100)}%</div>
                 </div>
               </div>
               
               {/* Anchor Points */}
               <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-1 h-12 bg-gradient-to-b from-white/50 to-transparent" />
               <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-24 h-24 bg-white/20 blur-xl rounded-full transform scale-y-50" />
            </div>
          </div>
        </motion.div>
      )}

      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 p-4 z-20 flex justify-between items-start bg-gradient-to-b from-black/60 via-black/30 to-transparent pt-8 pb-12 pointer-events-none">
        <div className="pointer-events-auto">
          <button
            onClick={handleExit}
            className="w-10 h-10 flex items-center justify-center bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white hover:bg-white/20 transition-all active:scale-95"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-col items-center gap-1 pointer-events-auto">
           <div className="px-4 py-1.5 bg-black/40 backdrop-blur-lg rounded-full border border-white/10 flex items-center gap-2 shadow-lg">
             <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
             <span className="text-white text-xs font-semibold tracking-wide">AR ACTIVE</span>
           </div>
           {!isScanning && (
             <motion.div 
               initial={{ opacity: 0, y: -10 }}
               animate={{ opacity: 1, y: 0 }}
               className="text-white/70 text-[10px]"
             >
               15cm × 5cm
             </motion.div>
           )}
        </div>

        <div className="pointer-events-auto">
          <button
            onClick={() => setShowControlPanel(true)}
            className="w-10 h-10 flex items-center justify-center bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white hover:bg-white/20 transition-all active:scale-95"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-0 left-0 right-0 p-8 z-20 bg-gradient-to-t from-black/80 via-black/40 to-transparent pb-10">
        <div className="max-w-md mx-auto flex items-center justify-between gap-6">
          
          {/* Zoom/Rotate Controls */}
          <div className="flex gap-3">
             <ControlBtn onClick={handleZoomOut} icon={ZoomOut} />
             <ControlBtn onClick={handleRotate} icon={RotateCw} />
          </div>

          {/* Shutter Button */}
          <button
            onClick={captureScreenshot}
            className="relative group cursor-pointer"
          >
            <div className="w-16 h-16 rounded-full border-4 border-white/80 bg-white/20 backdrop-blur-sm group-active:scale-95 transition-transform duration-200" />
            <div className="absolute inset-2 rounded-full bg-white group-hover:bg-brand-light-blue transition-colors duration-200" />
          </button>

          {/* More Controls */}
          <div className="flex gap-3">
             <ControlBtn onClick={handleReset} icon={RefreshCw} />
             <ControlBtn onClick={handleZoomIn} icon={ZoomIn} />
          </div>
        </div>
        
        <p className="text-center text-white/40 text-xs mt-6 font-medium">
          Tap shutter to capture • Drag to move
        </p>
      </div>

      {/* Side Panels (Modals) */}
      {!isScanning && <ARSmartShopOverlay />}
      
      <AnimatePresence>
        {showControlPanel && (
          <ARControlPanel
            onClose={() => setShowControlPanel(false)}
            selectedColor={selectedColor}
            onColorChange={setSelectedColor}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showScreenshotPanel && screenshot && (
          <ARScreenshotPanel
            screenshot={screenshot}
            onClose={() => {
              setShowScreenshotPanel(false);
              setScreenshot(null);
            }}
          />
        )}
      </AnimatePresence>

      {showExitConfirm && (
        <ARExitConfirm
          onConfirm={confirmExit}
          onCancel={() => setShowExitConfirm(false)}
        />
      )}
    </div>
  );
}

function ControlBtn({ onClick, icon: Icon }: { onClick: () => void, icon: any }) {
  return (
    <button
      onClick={onClick}
      className="w-10 h-10 flex items-center justify-center bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white hover:bg-white/20 transition-all active:scale-95"
    >
      <Icon className="w-4 h-4" />
    </button>
  );
}
