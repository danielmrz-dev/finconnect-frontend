import { ESpecialistArea } from "@/types/specialists-areas";

export const MapperSpecialistArea: Record<ESpecialistArea, string> = {
  [ESpecialistArea.Consorcios]: "Consórcios",
  [ESpecialistArea.Investimentos]: "Investimentos",
  [ESpecialistArea.PlanejamentoFinanceiro]: "Planejamento Financeiro",
  [ESpecialistArea.PlanejamentoSucessorio]: "Planejamento Sucessório",
  [ESpecialistArea.PlanejamentoTributario]: "Planejamento Tributário",
  [ESpecialistArea.PlanejamentoDeAposentadoria]:
    "Planejamento de Aposentadoria",
  [ESpecialistArea.GestaoDeRiscos]: "Gestão de Riscos",
};

export const MapperSpecialistAreaIdToText: Record<string, string> = {
  "8": "Investimentos",
  "9": "Planejamento Financeiro",
  "10": "Consórcios",
  "11": "Gestão de Riscos",
  "12": "Planejamento Tributário",
  "13": "Planejamento Sucessório",
  "21": "Planejamento de Aposentadoria",
};