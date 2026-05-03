import z from "zod";

export const formSchema = z.object({
  tipo: z.enum(["Receita", "Despesa"]),
  descricao: z
    .string()
    .min(5, "Descrição deve ter pelo menos 5 caracteres.")
    .max(20, "Descrição deve ter, no máximo, 20 caracteres."),
  valor: z.number().min(0.01, "O valor deve ser no mínimo R$ 0,01"),
});
