import type { ITransaction } from "@/types/transaction";
import { useState } from "react";
import { TransactionsContext } from "./transactions-context";

export const TransactionsContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        setTransactions,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};