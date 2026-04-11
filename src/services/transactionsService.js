import mockTransactions from '../data/transactions';
import { isValidTransaction } from '../utils/rewardCalculator';

const DEFAULT_DELAY_MS = 1200;

class TransactionServiceError extends Error {
  constructor(message) {
    super(message);
    this.name = 'TransactionServiceError';
  }
}

const shouldSimulateFailure = () => {
  if (typeof window === 'undefined') return false;
  return new URLSearchParams(window.location.search).has('fail');
};

const logWarning = (...args) => {
  if (process.env.NODE_ENV !== 'production') {
    console.warn(...args);
  }
};

function deduplicateById(transactions = []) {
  const seen = new Set();
  return transactions.filter((txn) => {
    if (!txn?.id) {
      logWarning('[TransactionService] Transaction missing id:', txn);
      return false;
    }
    if (seen.has(txn.id)) return false;
    seen.add(txn.id);
    return true;
  });
}

export async function fetchTransactions({
  delay = DEFAULT_DELAY_MS,
  data = mockTransactions,
  simulateFailure = shouldSimulateFailure(),
} = {}) {
  await new Promise((resolve) => setTimeout(resolve, delay));

  if (simulateFailure) {
    throw new TransactionServiceError(
      'Failed to fetch transactions. Please try again later.'
    );
  }

  return deduplicateById(data).filter((txn) => {
    const ok = isValidTransaction(txn);
    if (!ok) {
      logWarning('[TransactionService] Skipping invalid transaction record:', txn);
    }
    return ok;
  });
}