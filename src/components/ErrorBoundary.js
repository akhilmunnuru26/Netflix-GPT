import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: '#1a1a1a',
            color: '#fff',
            fontFamily: 'Arial, sans-serif',
            padding: '20px',
          }}
        >
          <h1 style={{ marginBottom: '20px', fontSize: '2em' }}>
            🎬 Oops! Something went wrong
          </h1>
          <p style={{ marginBottom: '20px', fontSize: '1.1em', maxWidth: '600px', textAlign: 'center' }}>
            We encountered an unexpected error while loading the app. Please try refreshing the page.
          </p>
          {this.state.error && (
            <details
              style={{
                maxWidth: '600px',
                marginBottom: '20px',
                padding: '15px',
                backgroundColor: '#2a2a2a',
                borderRadius: '8px',
                border: '1px solid #444',
                cursor: 'pointer',
              }}
            >
              <summary style={{ fontWeight: 'bold', color: '#e50914', cursor: 'pointer' }}>
                Error Details
              </summary>
              <pre
                style={{
                  marginTop: '10px',
                  overflow: 'auto',
                  fontSize: '0.85em',
                  color: '#aaa',
                }}
              >
                {this.state.error.toString()}
                {'\n\n'}
                {this.state.errorInfo && this.state.errorInfo.componentStack}
              </pre>
            </details>
          )}
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '10px 20px',
              fontSize: '1em',
              backgroundColor: '#e50914',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = '#c40812')}
            onMouseLeave={(e) => (e.target.style.backgroundColor = '#e50914')}
          >
            🔄 Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
