const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("What is your name ? ", function (name) {
  rl.question("Where do you live ? ", function (country) {
    console.log(`${name}, is a citizen of ${country}`);
    rl.close();
  });
});

rl.on("close", function () {
  console.log("\nBYE BYE !!!");
  process.exit(0);
});

const isLeapYear = (year) => {
  return year % 4 === 0;
};
const daysInFebruary = (year) => {
  return isLeapYear(year) ? 29 : 28;
};
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

// const dayX = 3;
// const dayY = 3;

// const monthX = 8;
// const monthY = 1;

// const yearX = 1983;
// const yearY = 1989;

const getDaysBetweenJSDateUtil = (date1, date2) => {
  console.log(new Date(date1), new Date(date2));
  console.log(new Date(date1).getTime() - new Date(date2).getTime());
  return (
    Math.abs(new Date(date1).getTime() - new Date(date2).getTime()) /
    (1000 * 60 * 60 * 24)
  );
};

const getDates = (date1, date2) => {
  const [dayX, monthX, yearX] = date1.split("/");
  const [dayY, monthY, yearY] = date2.split("/");

  const reversed = [
    [parseInt(dayY), parseInt(monthY), parseInt(yearY)],
    [parseInt(dayX), parseInt(monthX), parseInt(yearX)],
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
  if (yearDiff !== 0) {
    yearDiff = yearDiff - 1;
  }
  console.log(yearDiff);
  let yearDiffInDays = 0;
  for (let i = yearX + 1; i < yearY; i++) {
    yearDiffInDays = yearDiffInDays + (isLeapYear(i) ? 366 : 365);
    console.log(yearDiffInDays);
  }

  // get month diff
  let monthDiff = monthY < monthX ? 12 - monthX + monthY : monthY - monthX;
  // exclude current months
  if (monthDiff !== 0) {
    // 2 - 1 = 1
    monthDiff = monthDiff - 1;
  }
  console.log(monthDiff);
  let monthDiffInDays = 0;
  for (let i = 1; i <= monthDiff; i++) {
    const month = monthX + i;
    monthDiffInDays =
      monthDiffInDays +
      daysInMonth(month <= 12 ? yearX : yearY)[
        month === 12 ? month : month % 12
      ];
    console.log(monthDiffInDays);
  }
  let dayDiff =
    monthX === monthY
      ? dayY - dayX - 1
      : daysInMonth(yearX)[monthX] - dayX + dayY;

  console.log(dayDiff, monthDiffInDays, yearDiffInDays);
  return dayDiff + monthDiffInDays + yearDiffInDays;
};

console.log(getDaysBetweenJSDateUtil("08/03/1983", "01/03/1989"));
console.log(getDaysBetween("03/08/1983", "03/01/1989"));
