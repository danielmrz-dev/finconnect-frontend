import type { TransactionType } from "./transaction-type";

export interface Transaction {
  categoria: TransactionType;
  data: string;
  descricao: string;
  id: number;
  usuarioId: number;
  valor: number;
}
