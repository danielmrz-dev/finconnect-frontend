import { EmptyState } from "@/components/empty-state";
import { Loader } from "@/components/loader";
import { TransactionDialog } from "@/components/transaction-dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTransactionsContext } from "@/contexts/transactions-context";
import { useTransactions } from "@/hooks/useTransactions";
import { ETransactionType } from "@/types/transaction-type";
import { useMemo, useState } from "react";
import { Toaster } from "sonner";
import { TransactionItem } from "../../components/transactions/components/transaction-item";

export const TransactionsPage: React.FC = () => {
  const { transactions } = useTransactionsContext();
  const { isTransactionsLoading } = useTransactions();
  const [category, setCategory] = useState<ETransactionType | string>("Todas");

  const filteredTransactions = useMemo(() => {
    if (category === ETransactionType.RECEITA) {
      return transactions.filter(
        (t) => t.categoria === ETransactionType.RECEITA,
      );
    } else if (category === ETransactionType.DESPESA) {
      return transactions.filter(
        (t) => t.categoria === ETransactionType.DESPESA,
      );
    } else {
      return transactions;
    }
  }, [transactions, category]);

  return (
    <>
      <Toaster />
      <div className="p-4 flex flex-col gap-4 mb-25">
        <h1 className="font-bold text-3xl">Transações</h1>
        <div className="flex flex-col gap-6 bg-white p-6 rounded-lg shadow">
          <div className="flex flex-wrap items-center justify-between">
            <Select onValueChange={(v) => setCategory(v)}>
              <SelectTrigger className="self-end">
                <SelectValue placeholder="Filtrar" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Todas">Todas</SelectItem>
                  <SelectItem value={ETransactionType.RECEITA}>
                    Receitas
                  </SelectItem>
                  <SelectItem value={ETransactionType.DESPESA}>
                    Despesas
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <div className="self-end">
              <TransactionDialog
                action="create"
                buttonText="Criar nova transação"
              />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            {isTransactionsLoading ? (
              <Loader
                title="Carregando transações..."
                description="Por favor, aguarde."
              />
            ) : (
              filteredTransactions &&
              filteredTransactions.length > 0 &&
              filteredTransactions.map((transaction) => {
                return (
                  <TransactionItem
                    key={transaction.id}
                    transaction={transaction}
                    page="Transacoes"
                  />
                );
              })
            )}
            {!isTransactionsLoading &&
              filteredTransactions &&
              filteredTransactions.length <= 0 && <EmptyState />}
          </div>
        </div>
      </div>
    </>
  );
};
