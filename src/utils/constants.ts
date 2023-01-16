export const formatDate = (date: string) => {
  const toFormatDate = new Date(date);
  return toFormatDate.toLocaleDateString();
};
