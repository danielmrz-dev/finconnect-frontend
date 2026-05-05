import { useTransactionsContext } from "@/contexts/transactions-context";
import { ETransactionType } from "@/types/transaction-type";
import { useMemo } from "react";
import { BalanceCard } from "../../components/balance-card";
import { Transactions } from "../../components/transactions";
import { useTransactions } from "@/hooks/useTransactions";

export const HomePage = () => {
  const { isTransactionsLoading } = useTransactions();
  const { transactions } = useTransactionsContext();

  const balance = useMemo(() => {
    const receitas = transactions.reduce((total, transaction) => {
      if (transaction.categoria === ETransactionType.RECEITA) {
        return transaction.valor + total;
      } else return total;
    }, 0);
    const despesas = transactions.reduce((total, transaction) => {
      if (transaction.categoria === ETransactionType.DESPESA) {
        return transaction.valor + total;
      } else return total;
    }, 0);
    const saldo = receitas - despesas;

    return {
      receitas,
      despesas,
      saldo,
    };
  }, [transactions]);

  return (
    <div className="p-4 flex flex-col gap-4">
      <h1 className="font-bold text-3xl">Resumo</h1>
      <div className="flex flex-col gap-3">
        <BalanceCard
          amount={balance.saldo.toString()}
          title="Saldo atual"
          cardBgColor="dark"
        />
        <BalanceCard
          amount={balance.receitas.toString()}
          title="Receitas"
          cardBgColor="light"
        />
        <BalanceCard
          amount={balance.despesas.toString()}
          title="Despesas"
          cardBgColor="light"
        />
      </div>
      <Transactions transactions={transactions} isLoading={isTransactionsLoading}/>
    </div>
  );
};
