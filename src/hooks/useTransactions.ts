import { useTransactionsContext } from "@/contexts/transactions-context";
import { TransactionsService } from "@/services/transactions-service";
import type { ICreateTransactionPayload } from "@/types/create-transaction-payload";
import type { IUpdateTransactionPayload } from "@/types/update-transaction-payload";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";

export const useTransactions = () => {
  const { setTransactions } = useTransactionsContext();

  const [changeTrigger, setChangeTrigger] = useState<number>(0);

  const fetchTransactions = async () => {
    const { data } = await TransactionsService.getTransactions();
    setTransactions(data);
    return data;
  };

  const {
    data: transactionsList,
    isLoading: isTransactionsLoading,
    isError: isTransactionsError,
  } = useQuery({
    queryKey: ["transacoes", changeTrigger],
    queryFn: fetchTransactions,
  });

  const {
    mutateAsync: deleteTransaction,
    isPending: isDeleteTransactionPending,
    isError: isDeleteTransactionError,
  } = useMutation({
    mutationFn: async (id: number) => {
      await TransactionsService.deleteTransaction(id);
    },
    onSuccess: () => {
      setChangeTrigger((prev) => prev + 1);
    },
    onError: () => {},
  });

  type UpdateMutate = {
    id: number;
    payload: IUpdateTransactionPayload;
  };

  const {
    mutateAsync: updateTransaction,
    isPending: isUpdateTransactionPending,
    isError: isUpdateTransactionError,
  } = useMutation({
    mutationFn: async ({ id, payload }: UpdateMutate) => {
      const { data } = await TransactionsService.updateTransaction(id, payload);
      return data;
    },
    onSuccess: () => {
      setChangeTrigger((prev) => prev + 1);
    },
    onError: () => {},
  });

  const {
    mutateAsync: createTransaction,
    isPending: isCreateTransactionPending,
    isError: isCreateTransactionError,
  } = useMutation({
    mutationFn: async (payload: ICreateTransactionPayload) => {
      const { data } = await TransactionsService.createTransaction(payload);
      return data;
    },
    onSuccess: () => {
      setChangeTrigger((prev) => prev + 1);
    },
    onError: () => {},
  });

  return {
    transactionsList,
    isTransactionsLoading,
    isTransactionsError,
    deleteTransaction,
    isDeleteTransactionPending,
    isDeleteTransactionError,
    updateTransaction,
    isUpdateTransactionPending,
    isUpdateTransactionError,
    createTransaction,
    isCreateTransactionPending,
    isCreateTransactionError,
  };
};
