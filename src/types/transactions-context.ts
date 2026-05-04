import type React from "react";
import type { ITransaction } from "./transaction";

export interface ITransactionsContext {
  transactions: ITransaction[];
  setTransactions: React.Dispatch<React.SetStateAction<ITransaction[]>>;
}
