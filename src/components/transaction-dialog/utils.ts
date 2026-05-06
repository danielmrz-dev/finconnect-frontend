export const parseIsoDate = (value: string) => {
  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) {
    return undefined;
  }

  const parsed = new Date(year, month - 1, day);
  return Number.isNaN(parsed.getTime()) ? undefined : parsed;
};

export const isNotFutureDate = (value: string) => {
  const date = parseIsoDate(value);
  if (!date) return false;

  const today = new Date();
  today.setHours(23, 59, 59, 999);
  return date <= today;
};

export const formatDate = (date: Date | undefined) => {
  if (!date) {
    return "";
  }
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

export const isValidDate = (date: Date | undefined) => {
  if (!date) {
    return false;
  }
  return !isNaN(date.getTime());
};