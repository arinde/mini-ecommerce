'use client'; 

import React, { Component, ErrorInfo, ReactNode } from 'react';
import Link from 'next/link';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error: error, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error in ErrorBoundary:", error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] p-4 text-center bg-red-50 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold text-red-700 mb-4">Oops! Something went wrong.</h2>
          <p className="text-lg text-gray-700 mb-6">
            We're sorry for the inconvenience. Please try refreshing the page or navigating back.
          </p>
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <details className="text-sm text-gray-600 border border-gray-300 p-4 rounded-md bg-gray-100 max-w-lg overflow-auto">
              <summary className="font-semibold cursor-pointer">Error Details (Development Only)</summary>
              <pre className="whitespace-pre-wrap break-words mt-2">
                {this.state.error.toString()}
                <br />
                {this.state.errorInfo?.componentStack}
              </pre>
            </details>
          )}
          {this.props.fallback}
          <button
            onClick={() => this.setState({ hasError: false, error: null, errorInfo: null })}
            className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
          >
            Try Again
          </button>
          <Link href="/" className="text-blue-500 hover:underline mt-4">
            Go to Home Page
          </Link>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;