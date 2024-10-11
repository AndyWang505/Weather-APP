interface ResponseItem {
  timestamp: string;
}

export const getSortedQuery = (res: Record<string, ResponseItem>): ResponseItem[] => {
  if (!res) return [];
  return Object.values(res).sort((a: ResponseItem, b: ResponseItem) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
};