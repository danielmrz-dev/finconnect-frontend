import type { ITransaction } from "@/types/transaction";
import { useState } from "react";
import { TransactionsContext } from "./transactions-context";
import type { ISpecialist } from "@/types/specialist";
import type { ISpecialistArea } from "@/types/specialists-areas";

export const TransactionsContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [specialists, setSpecialists] = useState<ISpecialist[]>([]);
  const [specialistsAreas, setSpecialistsAreas] = useState<ISpecialistArea[]>([]);

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        setTransactions,
        specialists,
        setSpecialists,
        specialistsAreas,
        setSpecialistsAreas,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};