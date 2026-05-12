export interface ISpecialistArea {
  id: number;
  nome: ESpecialistArea;
}

export enum ESpecialistArea {
  Investimentos = "INVESTIMENTOS",
  PlanejamentoFinanceiro = "PLANEJAMENTO_FINANCEIRO",
  Consorcios = "CONSORCIOS",
  GestaoDeRiscos = "GESTAO_DE_RISCOS",
  PlanejamentoTributario = "PLANEJAMENTO_TRIBUTARIO",
  PlanejamentoSucessorio = "PLANEJAMENTO_SUCESSORIO",
  PlanejamentoDeAposentadoria = "PLANEJAMENTO_APOSENTADORIA",
}
