import { useTransactionsContext } from "@/contexts/transactions-context";
import { TransactionsService } from "@/services/transactions-service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";

export const useTransactions = () => {

  const { setTransactions } = useTransactionsContext();

  const [deletionTrigger, setDeletionTrigger] = useState<number>(0);

  const fetchTransactions = async () => {
    const { data } = await TransactionsService.getTransactions();
    setTransactions(data);
    return data;
  };

  const {
    isLoading: isTransactionsLoading,
    isError: isTransactionsError,
  } = useQuery({
    queryKey: ["transacoes", deletionTrigger],
    queryFn: fetchTransactions,
  });

  const { 
    mutateAsync: deleteTransaction,
    isPending: isDeleteTransactionPending,
    isError: isDeleteTransactionError
  } = useMutation({
    mutationFn: async (id: number) => {
      await TransactionsService.deleteTransaction(id);
    },
    onSuccess: () => {
      setDeletionTrigger(prev => prev + 1);
    },
    onError: () => {},
  });

  return {
    isTransactionsLoading,
    isTransactionsError,
    deleteTransaction,
    isDeleteTransactionPending,
    isDeleteTransactionError
  };
};
