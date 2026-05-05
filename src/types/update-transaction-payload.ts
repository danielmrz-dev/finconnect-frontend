import type { ETransactionType } from "./transaction-type";

export interface IUpdateTransactionPayload {
  categoria: ETransactionType;
  descricao: string;
  valor: number;
  data: string
}
