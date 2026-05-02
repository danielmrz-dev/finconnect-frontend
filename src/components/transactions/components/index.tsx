import { GoArrowDownLeft, GoArrowUpRight } from "react-icons/go";
import profilePicture from "../../../assets/profile-picture.png";
import { formatToBRL } from "../../../utils/currency-formatter";

type TransactionItemProps = {
  type: "Receita" | "Despesa";
}

export const TransactionItem: React.FC<TransactionItemProps> = ({ type }) => {

  const isReceita = type === "Receita";

  return (
    <div className="flex items-center justify-between gap-2">
      <img src={profilePicture} alt="" />
      <div className="mr-auto">
        <p className="text-xs font-bold">Fulaninha</p>
        <p className="text-xs flex items-center gap-1 opacity-60">
          { isReceita ? <GoArrowDownLeft/> : <GoArrowUpRight /> }
          { isReceita ? "Recebido" : "Enviado" }
        </p>
      </div>
      <div>
        <p className={`text-xs font-extrabold justify-self-end ${isReceita ? "text-green-500" : "text-red-400"}`}>
          {isReceita ? "+" : "-"} {formatToBRL(250)}
        </p>
        <p className="text-xs justify-self-end opacity-60">
          19 ago 2024
        </p>
      </div>
    </div>
  );
}
