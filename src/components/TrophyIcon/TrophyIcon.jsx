import PropTypes from 'prop-types';

const TrophyIcon = ({ size = 48, className = '', title = 'Rewards Program' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      role="img"
      aria-labelledby="trophyTitle"
    >
      <title id="trophyTitle">{title}</title>
      <path d="M8 21h8" />
      <path d="M12 17v4" />
      <path d="M17 4h3v3a5 5 0 0 1-5 5" />
      <path d="M7 4H4v3a5 5 0 0 0 5 5" />
      <path d="M8 4h8v4a4 4 0 0 1-8 0V4z" />
    </svg>
  );
};

TrophyIcon.propTypes = {
  size: PropTypes.number,
  className: PropTypes.string,
  title: PropTypes.string,
};

export default TrophyIcon;
