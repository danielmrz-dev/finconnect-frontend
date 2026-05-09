import { ProfessionalsList } from "@/components/professionals";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const ProfessionalsPage: React.FC = () => {
  return (
    <div className="p-4 flex flex-col gap-4 mb-25">
      <h1 className="font-bold text-3xl">Profissionais</h1>
      <div className="flex flex-col gap-4 p-6 rounded-lg shadow bg-white">
        <Select>
          <SelectTrigger className="self-end w-full">
            <SelectValue placeholder="Filtrar por área de atuação" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="Todas">Todas</SelectItem>
              <SelectItem value="planejador">Planejamento Financeiro</SelectItem>
              <SelectItem value="seguros">Seguros</SelectItem>
              <SelectItem value="investimentos">Investimentos</SelectItem>
              <SelectItem value="tributario">Planejamento Tributário</SelectItem>
              <SelectItem value="sucessorio">Planejador Sucessório</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <ProfessionalsList />
      </div>
    </div>
  );
};
