import PropTypes from 'prop-types';
import './ErrorMessage.css';

function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error-message" role="alert" aria-live="assertive">
      <div className="error-message__icon" aria-hidden="true">
        ⚠️
      </div>
      <h2 className="error-message__title">Something went wrong</h2>
      <p className="error-message__body">{message}</p>
      {onRetry && (
        <button className="error-message__retry-btn" onClick={onRetry} type="button">
          Try again
        </button>
      )}
    </div>
  );
}

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
  onRetry: PropTypes.func,
};

ErrorMessage.defaultProps = {
  onRetry: undefined,
};

export default ErrorMessage;
