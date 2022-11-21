const { getDaysBetween, getDaysBetweenJSDateUtil } = require("./utils.js");

test("get same output as JS Date/time utils", () => {
  [
    ["2/6/1983", "22/6/1983"],
    ["4/7/1984", "25/12/1984"],
    ["3/1/1989", "3/8/1983"],
  ].forEach(([date1, date2]) => {
    expect(getDaysBetween(date1, date2)).toEqual(
      getDaysBetweenJSDateUtil(date1, date2)
    );
  });
});
