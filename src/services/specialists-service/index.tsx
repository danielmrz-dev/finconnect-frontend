import type { ISpecialist } from "@/types/specialist";
import type { ISpecialistArea } from "@/types/specialists-areas";
import { endpoints } from "@/utils/endpoints";
import axios from "axios";

export const SpecialistsService = {
  getSpecialists: async () => {
    const { data } = await axios.get<ISpecialist[]>(
      `${endpoints.BASE_URL}/api/especialistas`,
    );
    return { data };
  },

  getSpecialistsAreas: async () => {
    const { data } = await axios.get<ISpecialistArea[]>(
      `${endpoints.BASE_URL}/api/areas-especialistas`,
    );
    return { data };
  },
}