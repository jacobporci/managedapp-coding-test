const isLeapYear = (year) => year % 4 === 0;
const daysInFebruary = (year) => (isLeapYear(year) ? 29 : 28);
const daysInMonth = (year) => [
  null,
  31,
  daysInFebruary(year),
  31,
  30,
  31,
  30,
  30,
  31,
  30,
  31,
  30,
  31,
];

const parseDate = (date) => {
  const temp1 = date.split("/");
  const day = parseInt(temp1[0]);
  const month = parseInt(temp1[1]);
  const year = parseInt(temp1[2]);

  return [day, month, year];
};

const getDaysBetweenJSDateUtil = (date1, date2) => {
  const [monthX, dayX, yearX] = parseDate(date1);
  const [monthY, dayY, yearY] = parseDate(date2);

  const formattedDate1 = `${dayX}/${monthX}/${yearX}`;
  const formattedDate2 = `${dayY}/${monthY}/${yearY}`;

  return (
    Math.abs(
      new Date(formattedDate1).getTime() - new Date(formattedDate2).getTime()
    ) /
      (1000 * 60 * 60 * 24) -
    1
  );
};

const getDates = (date1, date2) => {
  const [dayX, monthX, yearX] = parseDate(date1);
  const [dayY, monthY, yearY] = parseDate(date2);

  const reversed = [
    [dayY, monthY, yearY],
    [dayX, monthX, yearX],
  ];
  if (yearX > yearY) {
    return reversed;
  }
  if (yearX === yearY) {
    if (monthX > monthY) {
      return reversed;
    }
    if (monthX === monthY) {
      if (dayX > dayY) {
        return reversed;
      }
    }
  }

  return reversed.reverse();
};

const getDaysBetween = (date1, date2) => {
  const [[dayX, monthX, yearX], [dayY, monthY, yearY]] = getDates(date1, date2);
  // get year diff
  let yearDiff = yearY - yearX;
  // exclude current years
  if (yearDiff > 1) {
    yearDiff = yearDiff - 1;
  }
  console.log("yearDiff: ", yearDiff);
  let yearDiffInDays = 0;
  for (let i = yearX + 1; i < yearY; i++) {
    yearDiffInDays = yearDiffInDays + (isLeapYear(i) ? 366 : 365);
  }
  console.log("yearDiffInDays: ", yearDiffInDays);

  // get month diff
  let monthDiff = monthY < monthX ? 12 - monthX + monthY : monthY - monthX;
  // exclude current months
  if (monthDiff > 1) {
    monthDiff = monthDiff - 1;
  }
  console.log("monthDiff: ", monthDiff);
  let monthDiffInDays = 0;
  for (let i = 1; i <= monthDiff; i++) {
    const month = monthX + i;
    monthDiffInDays =
      monthDiffInDays +
      daysInMonth(month <= 12 ? yearX : yearY)[
        month === 12 ? month : month % 12
      ];
  }
  console.log("monthDiffInDays: ", monthDiffInDays);
  let dayDiff =
    monthX === monthY
      ? dayY - dayX - 1
      : daysInMonth(yearX)[monthX] - dayX + dayY;

  return dayDiff + monthDiffInDays + yearDiffInDays;
};

const validate = (date) => {
  const dateArray = date.split("/");
  if (dateArray.length === 3) {
    const day = parseInt(dateArray[0]);
    const month = parseInt(dateArray[1]);
    const year = parseInt(dateArray[2]);
    if (
      [day, month, year].every((check) => !!check && typeof check === "number")
    ) {
      if (year >= 1900 && year <= 2999) {
        if (month >= 1 && month <= 12) {
          if (day >= 1 && day <= daysInMonth(year)[month]) {
            return true;
          }
        }
      }
    }
  }
  return false;
};

module.exports = {
  getDaysBetween,
  parseDate,
  getDaysBetweenJSDateUtil,
  validate,
};
