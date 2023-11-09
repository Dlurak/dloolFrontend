const oneWeekInMs = 1000 * 60 * 60 * 24 * 7;
export const getCurrentDate = () => new Date();
export const getOneWeekFromNow = () => new Date(getCurrentDate().getTime() + oneWeekInMs);
