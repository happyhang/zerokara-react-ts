import * as React from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode,
  errorComponent: React.ElementType,
}

interface ErrorBoundaryState {
  hasError: boolean,
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error): void {
    // You can also log the error to an error reporting service
    // eslint-disable-next-line no-console
    console.error(error);
  }

  render(): React.ReactNode {
    const { hasError } = this.state;
    const { children, errorComponent } = this.props;

    const ErrorComponent = errorComponent;

    if (hasError) {
      // You can render any custom fallback UI
      return errorComponent ? (
        <ErrorComponent />
      ) : (
        <div>Something went wrong.</div>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
