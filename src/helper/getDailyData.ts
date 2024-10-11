export const getDailyData = (resForecast) => {
  return resForecast.data.list.filter((_, index) => index % 8 === 0);
};