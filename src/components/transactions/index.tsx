import type { ITransaction } from "@/types/transaction";
import { GoChevronRight } from "react-icons/go";
import { Link } from "react-router";
import { Paths } from "../../routes";
import { EmptyState } from "../empty-state";
import { Loader } from "../loader";
import { TransactionItem } from "./components/transaction-item";

type TransactionsProps = {
  transactions: ITransaction[];
  isLoading: boolean;
};

export const Transactions: React.FC<TransactionsProps> = ({
  transactions,
  isLoading,
}) => {

  return (
    <div className="flex flex-col gap-4 bg-white p-6 rounded-lg shadow">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Últimas 5 transações</h2>
        <Link
          to={Paths.Transactions}
          className="text-sm flex items-center gap-1"
        >
          Ver tudo
          <GoChevronRight />
        </Link>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          {isLoading ? (
            <Loader
              title="Carregando transações..."
              description="Por favor, aguarde."
            />
          ) : (
            transactions &&
            transactions.length > 0 &&
            transactions.slice(0, 5).map((transaction) => {
              return (
                <TransactionItem
                  key={transaction.id}
                  transaction={transaction}
                  page="Home"
                />
              );
            })
          )}
          {!isLoading && transactions && transactions.length <= 0 && (
            <EmptyState title="Não há transações cadastradas." description="Cadastre uma nova transação e ela será listada aqui." />
          )}
        </div>
      </div>
    </div>
  );
};
