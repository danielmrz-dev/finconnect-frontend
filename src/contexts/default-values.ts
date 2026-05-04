import type { ITransactionsContext } from "@/types/transactions-context";

export const TransactionsContextDefaultValues: ITransactionsContext = {
  transactions: [],
  setTransactions: () => {}
}