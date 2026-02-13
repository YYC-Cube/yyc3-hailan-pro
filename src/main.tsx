import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import App from './app/App'
import './styles/index.css'

console.log('[v0] Main.tsx execution starting');

// Global error capture
window.onerror = function(message, source, lineno, colno, error) {
  console.error('[Global Error]', { message, source, lineno, colno, error });
  return false;
};

window.onunhandledrejection = function(event) {
  console.error('[Unhandled Rejection]', event.reason);
  event.preventDefault();
};

try {
  console.log('[v0] Looking for root element');
  const rootElement = document.getElementById('root');

  if (!rootElement) {
    console.error('[v0] Fatal: Root element not found');
    document.body.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: center; height: 100vh; background: #1a1a1a; color: #ff4444; font-family: system-ui;">
        <div style="text-align: center;">
          <h1 style="font-size: 24px; margin-bottom: 16px;">初始化失败</h1>
          <p style="font-size: 14px; opacity: 0.7;">Root element not found. Please check index.html</p>
        </div>
      </div>
    `;
  } else {
    console.log('[v0] Root element found, creating React root');
    const root = ReactDOM.createRoot(rootElement);
    
    console.log('[v0] Rendering App component');
    root.render(<App />);
    
    console.log('[v0] App rendered successfully');
  }
} catch (error) {
  console.error('[v0] Fatal initialization error:', error);
  document.body.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: center; height: 100vh; background: #1a1a1a; color: #ff4444; font-family: system-ui;">
      <div style="text-align: center; max-width: 500px; padding: 20px;">
        <h1 style="font-size: 24px; margin-bottom: 16px;">初始化失败</h1>
        <p style="font-size: 14px; opacity: 0.7; margin-bottom: 12px;">Fatal error during initialization.</p>
        <pre style="background: rgba(255,255,255,0.1); padding: 12px; border-radius: 8px; text-align: left; overflow: auto; font-size: 12px;">${error instanceof Error ? error.stack || error.message : String(error)}</pre>
        <button onclick="location.reload()" style="margin-top: 16px; padding: 8px 24px; background: #0056b3; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 14px;">
          重试
        </button>
      </div>
    </div>
  `;
}
