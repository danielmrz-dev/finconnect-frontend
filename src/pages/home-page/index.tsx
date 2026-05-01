import { BalanceCard } from "../../components/balance-card";
import { Transactions } from "../../components/transactions";

export const HomePage = () => {
  return (
    <div className="p-4 flex flex-col gap-4">
      <h1 className="font-bold text-3xl">Resumo</h1>
      <div className="flex flex-col gap-3">
        <BalanceCard amount={5000} title="Saldo atual" cardBgColor="dark" />
        <BalanceCard amount={5000} title="Receitas" cardBgColor="light" />
        <BalanceCard amount={5000} title="Despesas" cardBgColor="light" />
      </div>
      <Transactions/>
    </div>
  );
};
