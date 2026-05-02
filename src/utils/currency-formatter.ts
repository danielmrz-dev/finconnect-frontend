export const formatToBRL = (value: string): string => {
  const digits = value.replace(/\D/g, "");
  const number = (Number(digits) / 100);

  return new Intl.NumberFormat("pt-BR", {
    currency: "BRL",
    style: "currency",
  }).format(number);
};