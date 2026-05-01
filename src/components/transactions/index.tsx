import { GoChevronRight } from "react-icons/go";
import { Link } from "react-router";
import { TransactionItem } from "./components";
import { Paths } from "../../routes";

export const Transactions: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Transações</h2>
        <Link to={Paths.Transactions} className="text-sm flex items-center gap-1">
          Ver tudo
          <GoChevronRight />
        </Link>
      </div>
      <TransactionItem/>
      <TransactionItem/>
      <TransactionItem/>
      <TransactionItem/>
    </div>
  );
};
