export const getRandomTimeFromPastDays = (daysAgo = 0) => {
  const date = new Date();
  date.setHours(Math.floor(Math.random() * 24));
  date.setMinutes(Math.floor(Math.random() * 60));
  date.setSeconds(Math.floor(Math.random() * 60));
  date.setDate(date.getDate() - daysAgo);
  return date;
};
