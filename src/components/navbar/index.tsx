import { FaUsers } from "react-icons/fa6";
import { GoHome } from "react-icons/go";
import { GrTransaction } from "react-icons/gr";

import { Paths } from "@/routes";
import { Link } from "react-router";
import { Button } from "../ui/button";

export const Navbar: React.FC = () => {
  return (
    <div className="flex justify-around gap-4 fixed bottom-0 bg-black w-full p-4">
      <Link to={Paths.Home} className="flex-1">
        <Button className="w-full h-full p-2 flex flex-col text-[12px] cursor-pointer">
          <GoHome />
          Início
        </Button>
      </Link>
      <Link to={Paths.Transactions} className="flex-1">
        <Button className="w-full h-full p-2 flex flex-col text-[12px] cursor-pointer">
          <GrTransaction />
          Transações
        </Button>
      </Link>
      <Link to={Paths.Professionals} className="flex-1">
        <Button className="w-full h-full p-2 flex flex-col text-[12px] cursor-pointer">
          <FaUsers />
          Profissionais
        </Button>
      </Link>
    </div>
  );
};
