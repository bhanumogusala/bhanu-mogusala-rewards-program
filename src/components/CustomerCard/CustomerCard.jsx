import PropTypes from 'prop-types';
import MonthlyBreakdown from '../MonthlyBreakdown';
import './CustomerCard.css';

function CustomerCard({ customer }) {
  const { customerId, customerName, totalPoints, months } = customer;

  const sortedMonthKeys = Object.keys(months).sort();

  const initials = customerName
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <article className="customer-card" aria-label={`Rewards summary for ${customerName}`}>
      <header className="customer-card__header">
        <div className="customer-card__avatar" aria-hidden="true">
          {initials}
        </div>
        <div className="customer-card__meta">
          <h2 className="customer-card__name">{customerName}</h2>
          <p className="customer-card__subtitle">Customer ID: {customerId}</p>
        </div>
        <div className="customer-card__total-badge">
          <span className="customer-card__total-label">Total</span>
          <span
            className="customer-card__total-points"
            aria-label={`${totalPoints} total reward points`}
          >
            {totalPoints.toLocaleString()}
            <span className="customer-card__pts-unit"> pts</span>
          </span>
        </div>
      </header>

      <section className="customer-card__months" aria-label="Monthly breakdown">
        {sortedMonthKeys.length === 0 ? (
          <p className="customer-card__empty">No transactions recorded.</p>
        ) : (
          sortedMonthKeys.map((monthKey) => (
            <MonthlyBreakdown
              key={monthKey}
              monthKey={monthKey}
              customerId={customerId}
              label={months[monthKey].label}
              points={months[monthKey].points}
              transactions={months[monthKey].transactions}
            />
          ))
        )}
      </section>
    </article>
  );
}

CustomerCard.propTypes = {
  customer: PropTypes.shape({
    customerId: PropTypes.string.isRequired,
    customerName: PropTypes.string.isRequired,
    totalPoints: PropTypes.number.isRequired,
    months: PropTypes.objectOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        points: PropTypes.number.isRequired,
        transactions: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.string.isRequired,
            amount: PropTypes.number.isRequired,
            points: PropTypes.number.isRequired,
          })
        ).isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default CustomerCard;
