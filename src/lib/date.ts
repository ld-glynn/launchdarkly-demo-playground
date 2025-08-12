export const formatDate = (dateISO: string): string => {
  const date = new Date(dateISO);
  const day = date.getDate().toString().padStart(2, '0');
  const month = date.toLocaleDateString('en-US', { month: 'short' });
  const year = date.getFullYear();
  
  return `${day} ${month} ${year}`;
};

export const formatDateShort = (dateISO: string): string => {
  const date = new Date(dateISO);
  const day = date.getDate().toString().padStart(2, '0');
  const month = date.toLocaleDateString('en-US', { month: 'short' });
  
  return `${day} ${month}`;
};