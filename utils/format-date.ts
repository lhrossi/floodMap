export const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("pt-BR", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  }).format(date);
};
