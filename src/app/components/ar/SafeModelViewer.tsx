import React, { Suspense, lazy, useState, useEffect } from 'react';
import { canLoadThreeJS } from '@/app/utils/safeImport';

// Fallback component for when 3D cannot load
const Fallback3D = ({ message = "3D Preview Unavailable" }: { message?: string }) => (
  <div className="w-full h-full min-h-[300px] bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl overflow-hidden flex items-center justify-center">
    <div className="text-center text-slate-600 px-4">
      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-300/50 flex items-center justify-center">
        <svg className="w-8 h-8 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      </div>
      <p className="text-lg font-medium">{message}</p>
      <p className="text-sm mt-2">Please try refreshing the page</p>
    </div>
  </div>
);

// Lazy load the ModelViewer to prevent React reconciler conflicts
const LazyModelViewer = lazy(() => {
  // Check if we can safely load Three.js
  if (!canLoadThreeJS()) {
    console.warn('Three.js environment check failed');
    return Promise.resolve({
      default: () => <Fallback3D message="3D rendering not supported" />
    });
  }

  return import('./ModelViewer').then(module => ({
    default: module.ModelViewer
  })).catch(err => {
    console.error('Failed to load ModelViewer:', err);
    return {
      default: () => <Fallback3D message="3D loading error" />
    };
  });
});

interface SafeModelViewerProps {
  color?: string;
}

export function SafeModelViewer({ color }: SafeModelViewerProps) {
  const [canLoad, setCanLoad] = useState(false);

  useEffect(() => {
    // Delay loading check to ensure React is fully initialized
    const timer = setTimeout(() => {
      setCanLoad(canLoadThreeJS());
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  if (!canLoad) {
    return (
      <div className="w-full h-full min-h-[300px] bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl overflow-hidden flex items-center justify-center">
        <div className="text-center text-slate-600">
          <p className="text-lg font-medium">Initializing 3D Preview...</p>
        </div>
      </div>
    );
  }

  return (
    <Suspense fallback={
      <div className="w-full h-full min-h-[300px] bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl overflow-hidden flex items-center justify-center">
        <div className="text-center text-slate-600">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-slate-400 border-t-transparent mb-3"></div>
          <p className="text-lg font-medium">Loading 3D Preview...</p>
        </div>
      </div>
    }>
      <LazyModelViewer color={color} />
    </Suspense>
  );
}