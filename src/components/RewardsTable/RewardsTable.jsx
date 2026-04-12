import PropTypes from 'prop-types';
import CustomerCard from '../CustomerCard';
import './RewardsTable.css';

function RewardsTable({ customers }) {
  if (customers.length === 0) {
    return (
      <div className="rewards-table__empty" role="status">
        <p>No reward data available for the selected period.</p>
      </div>
    );
  }

  const grandTotal = customers.reduce((sum, c) => sum + c.totalPoints, 0);

  return (
    <section className="rewards-table" aria-label="Customer rewards dashboard">
      <div className="rewards-table__summary" role="region" aria-label="Programme totals">
        <div className="rewards-table__summary-item">
          <span className="rewards-table__summary-value">{customers.length}</span>
          <span className="rewards-table__summary-label">Customers</span>
        </div>
        <div className="rewards-table__summary-divider" aria-hidden="true" />
        <div className="rewards-table__summary-item">
          <span className="rewards-table__summary-value">{grandTotal.toLocaleString()}</span>
          <span className="rewards-table__summary-label">Total Points Awarded</span>
        </div>
      </div>

      <div className="rewards-table__grid">
        {customers.map((customer) => (
          <CustomerCard key={customer.customerId} customer={customer} />
        ))}
      </div>
    </section>
  );
}

RewardsTable.propTypes = {
  customers: PropTypes.arrayOf(
    PropTypes.shape({
      customerId: PropTypes.string.isRequired,
      customerName: PropTypes.string.isRequired,
      totalPoints: PropTypes.number.isRequired,
      months: PropTypes.object.isRequired,
    })
  ).isRequired,
};

export default RewardsTable;
