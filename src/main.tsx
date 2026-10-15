import React, { StrictMode, Component, ErrorInfo, ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Application error caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          minHeight: '100vh', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          padding: '24px', 
          fontFamily: 'system-ui, sans-serif', 
          backgroundColor: '#ffffff', 
          color: '#18181b', 
          textAlign: 'center' 
        }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>ARM · System Notice</h1>
          <p style={{ color: '#71717a', maxWidth: '440px', fontSize: '14px', marginBottom: '20px', lineHeight: '1.5' }}>
            The website is undergoing active calibration. If you are seeing this screen, please reload the page.
          </p>
          <button 
            onClick={() => window.location.reload()}
            style={{ 
              padding: '10px 20px', 
              background: '#18181b', 
              color: '#ffffff', 
              border: 'none', 
              borderRadius: '2px', 
              cursor: 'pointer', 
              fontSize: '12px', 
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}
          >
            Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
