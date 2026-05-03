import { TransactionsService } from "@/services/transactions-service";
import { useQuery } from "@tanstack/react-query";

export const useTransactions = () => {
  const fetchTransactions = async () => {
    const { data } = await TransactionsService.getTransactions();
    return data;
  };

  const {
    data: transactions,
    isLoading: isTransactionsLoading,
    isError: isTransactionsError,
  } = useQuery({
    queryKey: ["transacoes"],
    queryFn: fetchTransactions,
  });

  return {
    transactions,
    isTransactionsLoading,
    isTransactionsError,
  };
};
