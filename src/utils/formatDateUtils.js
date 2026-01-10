import dayjs from "dayjs";

const pattern = "YYYY-MM-DD";
const patternYYYYMMDDHHMMSS = "YYYY-MM-DD HH:mm:ss";

const formatToString = (pattern) => {
  return dayjs().format(pattern ? pattern : patternYYYYMMDDHHMMSS);
};

export const formatDateUtils = {
  formatToString,
  pattern,
  patternYYYYMMDDHHMMSS,
};
