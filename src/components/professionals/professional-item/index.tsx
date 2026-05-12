import { ProfessionalsDialog } from "@/components/professional-dialog";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useSpecialists } from "@/hooks/useSpecialists";
import type { ISpecialist } from "@/types/specialist";
import { MapperSpecialistAreaIdToText } from "@/utils/mapper-specialist-area";
import { FaUserCircle } from "react-icons/fa";

type ProfessionalItemProps = {
  professional: ISpecialist;
};

export const ProfessionalItem: React.FC<ProfessionalItemProps> = ({
  professional,
}) => {
  const { isSpecialistsAreasLoading } = useSpecialists();
  return (
    <div className="flex items-center gap-3 justify-between">
      <FaUserCircle className="w-8 h-8" />

      <div className="mr-auto flex flex-col">
        <strong className="text-sm">{professional.nome}</strong>
        {isSpecialistsAreasLoading ? (
          <Skeleton className="min-w-full h-4" />
        ) : (
          <p className="text-xs">
            {MapperSpecialistAreaIdToText[professional.areaAtuacaoId]}
          </p>
        )}
      </div>

      <ProfessionalsDialog
        professional={professional}
        trigger={<Button className="min-h-full">Detalhes</Button>}
      />
    </div>
  );
};
