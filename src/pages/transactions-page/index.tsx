import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ActionButton } from "../../components/action-button";
import { TransactionItem } from "../../components/transactions/components";

export const TransactionsPage: React.FC = () => {
  return (
    <div className="p-4 flex flex-col gap-4">
      <h1 className="font-bold text-3xl">Transações</h1>
      <div className="flex flex-col gap-6 bg-white p-6 rounded-lg shadow">
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
        <div className="flex flex-col gap-4">
          <TransactionItem type="Receita" />
          <TransactionItem type="Despesa" />
          <TransactionItem type="Receita" />
          <TransactionItem type="Despesa" />
        </div>
        <ActionButton buttonText="Cadastrar nova transação" />
      </div>
    </div>
  );
};
