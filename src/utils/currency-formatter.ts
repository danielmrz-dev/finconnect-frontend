export const formatToBRL = (value: number): string => {
  return Intl.NumberFormat("pt-BR", {
    currency: "BRL",
    style: "currency",
  }).format(value);
};
