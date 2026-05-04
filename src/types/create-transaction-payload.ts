import type { ETransactionType } from "./transaction-type";

export interface CreateTransactionPayload {
  categoria: ETransactionType;
  data: string;
  descricao: string;
  usuarioId: number;
  valor: number;
}
