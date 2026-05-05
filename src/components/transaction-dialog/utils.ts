export const parseIsoDate = (value: string) => {
  if (!value) {
    return undefined;
  }

  const dateOnlyRegex = /^(\d{4})-(\d{2})-(\d{2})$/;
  const dateOnlyMatch = value.match(dateOnlyRegex);

  if (dateOnlyMatch) {
    const [, year, month, day] = dateOnlyMatch;
    const parsed = new Date(Number(year), Number(month) - 1, Number(day));
    return Number.isNaN(parsed.getTime()) ? undefined : parsed;
  }

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? undefined : parsed;
};

export const formatIsoDate = (date: Date | undefined) => {
  if (!date) {
    return "";
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
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
    month: "long",
    year: "numeric",
  });
};

export const isValidDate = (date: Date | undefined) => {
  if (!date) {
    return false;
  }
  return !isNaN(date.getTime());
};
