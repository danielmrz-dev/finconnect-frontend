import { FaUsers } from "react-icons/fa6";
import { GoHome } from "react-icons/go";
import { GrTransaction } from "react-icons/gr";

import { Paths } from "@/routes";
import { Link } from "react-router";
import { Button } from "../ui/button";

export const Navbar: React.FC = () => {
  return (
    <div
      className="flex justify-around gap-4 fixed bottom-0 bg-black w-full p-4 
      md:flex-col md:w-30 md:h-full md:justify-start md:gap-3"
    >
      <Link to={Paths.Home} className="flex-1 md:flex-none">
        <Button className="w-full h-full p-2 flex flex-col text-[12px] cursor-pointer md:h-fit">
          <GoHome />
          Início
        </Button>
      </Link>
      <Link to={Paths.Transactions} className="flex-1 md:flex-none">
        <Button className="w-full h-full p-2 flex flex-col text-[12px] cursor-pointer md:h-fit">
          <GrTransaction />
          Transações
        </Button>
      </Link>
      <Link to={Paths.Professionals} className="flex-1 md:flex-none">
        <Button className="w-full h-full p-2 flex flex-col text-[12px] cursor-pointer md:h-fit">
          <FaUsers />
          Profissionais
        </Button>
      </Link>
    </div>
  );
};
