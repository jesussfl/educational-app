export const calculateTimeSpent = (startTime) => {
  let endTime = new Date().getTime();
  if (startTime && endTime) {
    const timeDifference = (endTime - startTime) / 1000; // En segundos
    const minutes = Math.floor(timeDifference / 60);
    const seconds = Math.floor(timeDifference % 60);

    return `${minutes}m:${seconds}s`;
  }
  return null;
};
