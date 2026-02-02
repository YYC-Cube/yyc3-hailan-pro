import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/App'
import './styles/theme.css'

// Global error capture
window.onerror = function(message, source, lineno, colno, error) {
  console.error('[Global Error]', { message, source, lineno, colno, error });
};

window.onunhandledrejection = function(event) {
  console.error('[Unhandled Rejection]', event.reason);
};

const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error('Fatal: Root element not found');
} else {
  ReactDOM.createRoot(rootElement).render(
    <App />
  )
}
