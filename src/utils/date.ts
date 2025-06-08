export const getRandomTimeFromPastDays = (daysAgo = 0) => {
  const date = new Date();
  date.setHours(Math.floor(Math.random() * 24));
  date.setMinutes(Math.floor(Math.random() * 60));
  date.setSeconds(Math.floor(Math.random() * 60));
  date.setDate(date.getDate() - daysAgo);
  return date;
};

export const daysSince = (ISODate: string) => {
  const date = new Date(ISODate);
  const today = new Date();
  date.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  const daysBetween = Math.floor(
    (today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24),
  );
  return daysBetween;
};
