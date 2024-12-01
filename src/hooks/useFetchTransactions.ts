import { useState, useEffect, useCallback } from "react";
import { Transaction } from "../types";
import { fetchFirstPage } from "../services/api";

/**
 * Custom hook to fetch transactions from the API
 * @returns {Object} transactions, isLoading, error, refetch
 * @returns {Transaction[]} transactions - The fetched transactions
 * @returns {boolean} isLoading - Whether the data is loading
 * @returns {string | null} error - The error message
 */

function useFetchTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await fetchFirstPage();
      setTransactions(data);
      setError(null);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { transactions, isLoading, error };
}

export default useFetchTransactions;
