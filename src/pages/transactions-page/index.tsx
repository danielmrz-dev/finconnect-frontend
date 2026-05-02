import { TransactionDialog } from "@/components/create-transaction-dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TransactionItem } from "../../components/transactions/components";

export const TransactionsPage: React.FC = () => {
  return (
    <div className="p-4 flex flex-col gap-4">
      <h1 className="font-bold text-3xl">Transações</h1>
      <div className="flex flex-col gap-6 bg-white p-6 rounded-lg shadow">
        <div className="flex flex-wrap items-center justify-between">
          <Select onValueChange={() => {}}>
            <SelectTrigger className="w-45 self-end">
              <SelectValue placeholder="Filtrar por categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Todas">Todas</SelectItem>
                <SelectItem value="Receitas">Receitas</SelectItem>
                <SelectItem value="Despesas">Despesas</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-4">
          <TransactionItem type="Receita" />
          <TransactionItem type="Despesa" />
          <TransactionItem type="Receita" />
          <TransactionItem type="Despesa" />
        </div>
        <div className="self-end">
          <TransactionDialog action="edit" />
        </div>
      </div>
    </div>
  );
};
