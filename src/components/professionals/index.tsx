import type { ISpecialist } from "@/types/specialist";
import { EmptyState } from "../empty-state";
import { Loader } from "../loader";
import { Separator } from "../ui/separator";
import { ProfessionalItem } from "./professional-item";

type ProfessionalsListProps = {
  specialists: ISpecialist[];
  isSpecialistsLoading: boolean;
};

export const ProfessionalsList: React.FC<ProfessionalsListProps> = ({
  specialists,
  isSpecialistsLoading,
}) => {
  return (
    <div className="flex flex-col gap-3">
      {specialists &&
        specialists.length > 0 &&
        specialists.map((professional) => (
          <div className="flex flex-col gap-2.5">
            <ProfessionalItem
              key={professional.id}
              professional={professional}
            />
            {professional.id !== specialists[specialists.length - 1].id && (
              <Separator />
            )}
          </div>
        ))}

      {!isSpecialistsLoading && specialists.length <= 0 && (
        <EmptyState
          title="Não há profissionais cadastrados."
          description="Em breve, novos profissionais serão cadastrados."
        />
      )}

      {isSpecialistsLoading && specialists.length <= 0 && (
        <Loader title="Carregando..." description="Por favor, aguarde." />
      )}
    </div>
  );
};
