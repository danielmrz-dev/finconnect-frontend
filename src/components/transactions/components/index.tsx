import { GoArrowDownLeft, GoArrowUpRight } from "react-icons/go";
import profilePicture from "../../../assets/profile-picture.png";

type TransactionItemProps = {
  type: "Receita" | "Despesa";
}

export const TransactionItem: React.FC<TransactionItemProps> = ({ type }) => {
  return (
    <div className="flex items-center justify-between gap-2">
      <img src={profilePicture} alt="" />
      <div className="mr-auto">
        <p className="text-xs">Teste</p>
        <p className="text-xs flex items-center gap-1 opacity-60">
          { type === "Receita" ? <GoArrowDownLeft/> : <GoArrowUpRight /> }
          { type === "Receita" ? "Recebido" : "Enviado" }
        </p>
      </div>
      <div>
        <p className="text-xs">Teste</p>
        <p className="text-xs">Teste</p>
      </div>
    </div>
  );
}
