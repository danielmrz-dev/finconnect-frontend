import { ETransactionType } from "@/types/transaction-type";
import z from "zod";
import { isNotFutureDate, parseIsoDate } from "../utils";

export const formSchema = z.object({
  tipo: z.enum([ETransactionType.RECEITA, ETransactionType.DESPESA]),
  descricao: z
    .string()
    .min(5, "Descrição deve ter pelo menos 5 caracteres.")
    .max(30, "Descrição deve ter, no máximo, 30 caracteres."),
  valor: z.number().min(0.01, "O valor deve ser maior que R$ 0,01"),
  data: z
    .string()
    .min(1, "A data é obrigatória")
    .refine((value) => Boolean(parseIsoDate(value)), {
      message: "Data inválida",
    })
    .refine(isNotFutureDate, {
      message: "A data não pode ser futura",
    }),
});
