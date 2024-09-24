export const getSortedQuery = (res) => {
  return Object.values(res).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
};