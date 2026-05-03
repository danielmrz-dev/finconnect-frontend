import type { Transaction } from "@/types/transaction";
import { endpoints } from "@/utils/endpoints";
import axios from "axios";

export const TransactionsService = {
  getTransactions: async () => {
    const { data } = await axios.get<Transaction[]>(`${endpoints.BASE_URL}/api/transacoes`);
    return { data };
  },
};
