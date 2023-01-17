export const formatDate = (date: Date) => {
  const toFormatDate = new Date(date);
  return toFormatDate.toLocaleDateString();
};
