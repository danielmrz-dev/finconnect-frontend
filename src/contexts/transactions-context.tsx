import type { ITransactionsContext } from "@/types/transactions-context";
import { createContext, useContext } from "react";
import { TransactionsContextDefaultValues } from "./default-values";

export const TransactionsContext = createContext<ITransactionsContext>(
  TransactionsContextDefaultValues,
);

export const useTransactionsContext = () => {
  const context = useContext(TransactionsContext);
  if (!context) {
    throw new Error(
      "useTransactionsContext must be used within a TransactionsContextProvider",
    );
  }

  return context;
};
