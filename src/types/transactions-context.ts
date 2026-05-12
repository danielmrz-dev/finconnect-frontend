import type React from "react";
import type { ITransaction } from "./transaction";
import type { ISpecialist } from "./specialist";
import type { ISpecialistArea } from "./specialists-areas";

export interface ITransactionsContext {
  transactions: ITransaction[];
  setTransactions: React.Dispatch<React.SetStateAction<ITransaction[]>>;
  specialists: ISpecialist[];
  setSpecialists: React.Dispatch<React.SetStateAction<ISpecialist[]>>;
  specialistsAreas: ISpecialistArea[];
  setSpecialistsAreas: React.Dispatch<React.SetStateAction<ISpecialistArea[]>>;
}
