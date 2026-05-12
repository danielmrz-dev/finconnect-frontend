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
import { MapperSpecialistArea } from "@/utils/mapper-specialist-area";
import { useMemo, useState } from "react";

export const ProfessionalsPage: React.FC = () => {
  const { specialists, specialistsAreas } = useTransactionsContext();
  const { isSpecialistsLoading } = useSpecialists();

  const [selectedArea, setSelectedArea] = useState<string>("Todas");

  const filteredSpecialists = useMemo(() => {
    if (selectedArea === "Todas") return specialists;
    return specialists.filter(
      (s) => s.areaAtuacaoId.toString() === selectedArea,
    );
  }, [specialists, selectedArea]);

  return (
    <div className="p-4 flex flex-col gap-4 mb-25 md:ml-32">
      <h1 className="font-bold text-3xl">Profissionais</h1>
      <div className="flex flex-col gap-4 p-6 rounded-lg shadow bg-white">
        <Select onValueChange={(v) => setSelectedArea(v)}>
          <SelectTrigger className="self-start">
            <SelectValue placeholder="Filtrar por área de atuação" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="Todas">Todas</SelectItem>
              {specialistsAreas.map((area) => (
                <SelectItem key={area.id} value={area.id.toString()}>
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
