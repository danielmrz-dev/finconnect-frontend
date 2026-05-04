import type { ITransaction } from "@/types/transaction";
import { endpoints } from "@/utils/endpoints";
import axios from "axios";

export const TransactionsService = {
  getTransactions: async () => {
    const { data } = await axios.get<ITransaction[]>(
      `${endpoints.BASE_URL}/api/transacoes`,
    );
    return { data };
  },

  deleteTransaction: async (id: number) => {
    const { data } = await axios.delete(
      `${endpoints.BASE_URL}/api/transacoes/${id}`,
    );
    return { data };
  },
};
