import { useMemo } from 'react';
import useTransactions from './hooks/useTransactions';
import { groupByCustomerAndMonth } from './utils/transactionHelpers';
import RewardsTable from './components/RewardsTable';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import ErrorBoundary from './components/ErrorBoundary';
import TrophyIcon from './components/TrophyIcon/TrophyIcon';
import './App.css';

function App() {
  const { transactions, loading, error } = useTransactions();

  const customers = useMemo(() => groupByCustomerAndMonth(transactions), [transactions]);

  return (
    <div className="app">
      <header className="app__header">
        <div className="app__header-inner">
          <TrophyIcon size={48} className="app__logo" />
          <div>
            <h1 className="app__title">Retailer Rewards Program</h1>
            <p className="app__subtitle">Track customer points earned over the last three months</p>
          </div>
        </div>
      </header>
      <main className="app__main" id="main-content">
        {loading && <LoadingSpinner />}
        {error && <ErrorMessage message={error} />}
        {!loading && !error && (
          <ErrorBoundary>
            <RewardsTable customers={customers} />
          </ErrorBoundary>
        )}
      </main>

      <footer className="app__footer" role="contentinfo">
        <p>Points: $0–$50 = 0 pts &nbsp;|&nbsp; $50–$100 = 1 pt/$ &nbsp;|&nbsp; $100+ = 2 pts/$</p>
      </footer>
    </div>
  );
}

export default App;
