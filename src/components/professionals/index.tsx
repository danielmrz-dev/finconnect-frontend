import { Separator } from "../ui/separator";
import { ProfessionalItem } from "./professional-item";

export const ProfessionalsList: React.FC = () => {
  return (
    <div className="flex flex-col gap-3">
      <ProfessionalItem />
      <Separator />
      <ProfessionalItem />
      <Separator />
      <ProfessionalItem />
      <Separator />
      <ProfessionalItem />
      <Separator />
      <ProfessionalItem />
      <Separator />
      <ProfessionalItem />
      {/* <Loader title="Carregando..." description="Por favor, aguarde." /> */}
    </div>
  );
};
