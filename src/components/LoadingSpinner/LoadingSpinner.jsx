import './LoadingSpinner.css';

function LoadingSpinner() {
  return (
    <div className="loading-spinner__overlay" role="status" aria-label="Loading rewards data">
      <div className="loading-spinner__ring" aria-hidden="true">
        <div />
        <div />
        <div />
        <div />
      </div>
      <p className="loading-spinner__text">Loading rewards data…</p>
    </div>
  );
}

export default LoadingSpinner;
