import { ProfessionalsDialog } from "@/components/professional-dialog";
import { Button } from "@/components/ui/button";
import avatar from "../../../assets/profile-picture.png";

export const ProfessionalItem: React.FC = () => {
  return (
    <div className="flex items-center gap-3 justify-between">
      <img src={avatar} alt="" className="w-9 h-9" />
      <div className="mr-auto flex flex-col">
        <strong className="text-sm">Nome do profissional</strong>
        <p className="text-xs">Área de atuação</p>
      </div>

      <ProfessionalsDialog
        trigger={<Button className="min-h-full">Detalhes</Button>}
      />
    </div>
  );
};
