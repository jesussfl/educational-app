import { ECONOMY } from "@config/economy";
export const calculateProfit = (exercisesLength, mistakes, lessonStatus) => {
  if (lessonStatus === "completed") {
    return ECONOMY.COMPLETED_LESSONS_PROFIT;
  }
  const profit = (ECONOMY.LESSONS_PROFIT - ECONOMY.LESSONS_PRICE) / (exercisesLength / (exercisesLength - mistakes));
  const absoluteProfit = Math.round(profit * 100) / 100;

  return absoluteProfit;
};
