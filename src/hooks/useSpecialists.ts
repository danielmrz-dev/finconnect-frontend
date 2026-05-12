import { useTransactionsContext } from "@/contexts/transactions-context";
import { SpecialistsService } from "@/services/specialists-service";
import { useQuery } from "@tanstack/react-query";

export const useSpecialists = () => {
  const { 
    setSpecialists, 
    specialists, 
    setSpecialistsAreas, 
    specialistsAreas
  } =
    useTransactionsContext();

  const fetchSpecialists = async () => {
    const { data } = await SpecialistsService.getSpecialists();
    setSpecialists(data);
  };

  const { isLoading: isSpecialistsLoading, isError: isSpecialistsError } =
    useQuery({
      queryKey: ["especialistas"],
      queryFn: fetchSpecialists,
    });

  const fetchSpecialistsAreas = async () => {
    const { data } = await SpecialistsService.getSpecialistsAreas();
    setSpecialistsAreas(data);
  };

  const {
    isLoading: isSpecialistsAreasLoading,
    isError: isSpecialistsAreasError,
  } = useQuery({
    queryKey: ["especialistas-areas"],
    queryFn: fetchSpecialistsAreas,
  });

  return {
    specialists,
    isSpecialistsLoading,
    isSpecialistsError,
    specialistsAreas,
    isSpecialistsAreasLoading,
    isSpecialistsAreasError,
  };
};
