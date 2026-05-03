import { TransactionDialog } from "@/components/transaction-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Edit, Trash2Icon } from "lucide-react";
import { GoArrowDownLeft, GoArrowUpRight } from "react-icons/go";
import profilePicture from "../../../assets/profile-picture.png";
import { formatToBRL } from "../../../utils/currency-formatter";
import type { Transaction } from "@/types/transaction";
import { TransactionType } from "@/types/transaction-type";

type TransactionItemProps = {
  transaction: Transaction;
};

export const TransactionItem: React.FC<TransactionItemProps> = ({ transaction }) => {
  
  const isReceita = transaction.categoria === TransactionType.RECEITA;

  return (
    <div className="flex items-center justify-between gap-2">
      <img src={profilePicture} alt="" />
      <div className="mr-auto">
        <p className="text-xs font-bold">{transaction.usuarioId}</p>
        <p className="text-xs flex items-center gap-1 opacity-60">
          {isReceita ? <GoArrowDownLeft /> : <GoArrowUpRight />}
          {isReceita ? "Recebido" : "Enviado"}
        </p>
      </div>
      <div>
        <p
          className={`text-xs font-extrabold justify-self-end ${isReceita ? "text-green-500" : "text-red-400"}`}
        >
          {isReceita ? "+" : "-"} {formatToBRL(transaction.valor.toString())}
        </p>
        <p className="text-xs justify-self-end opacity-60">{transaction.data}</p>
      </div>
      <div className="flex items-center gap-2">
        <Tooltip>
          <TooltipTrigger>
            <TransactionDialog action="edit" buttonText={<Edit />} />
          </TooltipTrigger>
          <TooltipContent>
            <p>Editar transação</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger>
            <TransactionDialog action="delete" buttonText={<Trash2Icon />} />
          </TooltipTrigger>
          <TooltipContent>
            <p>Excluir transação</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};
