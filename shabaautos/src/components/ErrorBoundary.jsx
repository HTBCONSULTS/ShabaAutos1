import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

/**
 * Prevents a single failing screen from blanking the whole application.
 * Any render error inside a screen is contained here, logged for diagnostics,
 * and replaced with a recoverable message so the visitor can keep browsing.
 *
 * Written as a class component because React only supports error boundaries
 * through getDerivedStateFromError / componentDidCatch.
 */
export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, retryKey: 0 };
    this.handleRetry = this.handleRetry.bind(this);
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('[ShabaAutos] Screen render failed:', error, info && info.componentStack);
  }

  handleRetry() {
    this.setState((prev) => ({ hasError: false, retryKey: prev.retryKey + 1 }));
  }

  render() {
    if (!this.state.hasError) {
      return React.createElement(React.Fragment, { key: this.state.retryKey }, this.props.children);
    }

    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 mb-4">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <h1 className="text-xl font-black text-slate-900 tracking-tight">This section could not be displayed</h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-2">
          Something in this part of the site failed to load. The rest of ShabaAutos is still available, and you can try
          this section again.
        </p>
        <button
          type="button"
          onClick={this.handleRetry}
          className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 bg-[#12492f] hover:bg-[#0b3622] text-white font-bold text-xs rounded-xl transition-all cursor-pointer"
        >
          <RefreshCw className="w-4 h-4" />
          Reload this section
        </button>
      </div>
    );
  }
}
