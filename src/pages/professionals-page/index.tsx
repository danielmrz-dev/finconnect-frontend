import { ProfessionalsList } from "@/components/professionals";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTransactionsContext } from "@/contexts/transactions-context";
import { useSpecialists } from "@/hooks/useSpecialists";
import type { ISpecialist } from "@/types/specialist";
import { MapperSpecialistArea } from "@/utils/mapper-specialist-area";
import { useState } from "react";

export const ProfessionalsPage: React.FC = () => {
  const { specialists, specialistsAreas } = useTransactionsContext();
  const { isSpecialistsLoading } = useSpecialists();

  const [filteredSpecialists, setFilteredSpecialists] =
    useState<ISpecialist[]>(specialists);

  const filterSpecialistsByArea = (areaDeAtuacaoId: string) => {
    if (areaDeAtuacaoId === "Todas") {
      setFilteredSpecialists(specialists);
    } else {
      const filteredSpecialists = specialists.filter((specialist) => {
        return specialist.areaAtuacaoId === +areaDeAtuacaoId;
      });
      setFilteredSpecialists(filteredSpecialists);
    }
  };

  return (
    <div className="p-4 flex flex-col gap-4 mb-25">
      <h1 className="font-bold text-3xl">Profissionais</h1>
      <div className="flex flex-col gap-4 p-6 rounded-lg shadow bg-white">
        <Select onValueChange={(v) => filterSpecialistsByArea(v)}>
          <SelectTrigger className="self-start">
            <SelectValue placeholder="Filtrar por área de atuação" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="Todas">Todas</SelectItem>
              {specialistsAreas.map((area) => (
                <SelectItem value={area.id.toString()}>
                  {MapperSpecialistArea[area.nome]}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <ProfessionalsList
          specialists={filteredSpecialists}
          isSpecialistsLoading={isSpecialistsLoading}
        />
      </div>
    </div>
  );
};
