import { useState, useEffect, useCallback } from 'react';
import { fetchTransactions } from '../services/transactionService';

function useTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadTransactions = useCallback(async (isMountedRef) => {
    try {
      setLoading(true);
      setError(null);

      const data = await fetchTransactions();

      if (isMountedRef.current) {
        setTransactions(data);
      }
    } catch (err) {
      if (isMountedRef.current) {
        setError(
          err instanceof Error
            ? err
            : new Error('An unexpected error occurred.')
        );
      }
    } finally {
      if (isMountedRef.current) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    const isMountedRef = { current: true };
    loadTransactions(isMountedRef);

    return () => {
      isMountedRef.current = false;
    };
  }, [loadTransactions]);

  return { transactions, loading, error, refetch: () => loadTransactions({ current: true }) };
}

export default useTransactions;