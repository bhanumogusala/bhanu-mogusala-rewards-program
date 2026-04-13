import PropTypes from 'prop-types';
import './MonthlyBreakdown.css';

function MonthlyBreakdown({ label, points, transactions, customerId, monthKey }) {
  const detailsId = `breakdown-${customerId}-${monthKey}`;

  return (
    <div className="monthly-breakdown">
      <div className="monthly-breakdown__header">
        <h3 className="monthly-breakdown__month" id={detailsId}>
          {label}
        </h3>
        <span className="monthly-breakdown__total" aria-label={`${points} points in ${label}`}>
          {points.toLocaleString()} pts
        </span>
      </div>

      {transactions.length > 0 && (
        <table className="monthly-breakdown__table" aria-labelledby={detailsId} role="table">
          <thead>
            <tr>
              <th scope="col">Transaction ID</th>
              <th scope="col">Amount</th>
              <th scope="col">Points</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((txn) => (
              <tr key={txn.id}>
                <td className="monthly-breakdown__txn-id">{txn.id}</td>
                <td>${txn.amount.toFixed(2)}</td>
                <td>
                  <span
                    className={`monthly-breakdown__points-badge ${
                      txn.points > 0 ? 'monthly-breakdown__points-badge--positive' : ''
                    }`}
                  >
                    {txn.points.toLocaleString()}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

MonthlyBreakdown.propTypes = {
  label: PropTypes.string.isRequired,
  points: PropTypes.number.isRequired,
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      points: PropTypes.number.isRequired,
    })
  ).isRequired,
  customerId: PropTypes.string.isRequired,
  monthKey: PropTypes.string.isRequired,
};

export default MonthlyBreakdown;
