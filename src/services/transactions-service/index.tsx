import type { ITransaction } from "@/types/transaction";
import type { IUpdateTransactionPayload } from "@/types/update-transaction-payload";
import { endpoints } from "@/utils/endpoints";
import axios from "axios";

export const TransactionsService = {
  getTransactions: async () => {
    const { data } = await axios.get<ITransaction[]>(
      `${endpoints.BASE_URL}/api/transacoes`,
    );
    return { data };
  },

  createTransaction: async (
    payload: IUpdateTransactionPayload,
  ) => {
    const { data } = await axios.post(
      `${endpoints.BASE_URL}/api/transacoes`,
      payload,
    );

    return { data };
  },

  deleteTransaction: async (id: number) => {
    const { data } = await axios.delete(
      `${endpoints.BASE_URL}/api/transacoes/${id}`,
    );
    return { data };
  },

  updateTransaction: async (
    transactionId: number,
    payload: IUpdateTransactionPayload,
  ) => {
    const { data } = await axios.put(
      `${endpoints.BASE_URL}/api/transacoes/${transactionId}`,
      payload,
    );

    return { data };
  },

  
};
