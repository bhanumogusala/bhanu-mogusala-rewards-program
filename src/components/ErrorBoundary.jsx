import { Component } from 'react';
import PropTypes from 'prop-types';
import ErrorMessage from './ErrorMessage';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught a render error:', error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorMessage
          message={
            this.props.fallbackMessage ??
            'Something went wrong displaying the rewards table. Please refresh the page.'
          }
        />
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  fallbackMessage: PropTypes.string,
};

ErrorBoundary.defaultProps = {
  fallbackMessage: 'Something went wrong.',
};

export default ErrorBoundary;
