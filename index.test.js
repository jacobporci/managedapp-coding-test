const {
  getDaysBetween,
  getDaysBetweenJSDateUtil,
  validate,
  getDates,
  parseDate,
} = require("./utils.js");

describe("getDaysBetween", () => {
  it("should get same output as JS Date/Time utils", () => {
    [
      ["1/1/2000", "1/1/2001"],
      ["2/6/1983", "22/6/1983"],
      ["4/7/1984", "25/12/1984"],
      ["3/1/1989", "3/8/1983"],
    ].forEach(([date1, date2]) => {
      expect(getDaysBetween(date1, date2)).toEqual(
        getDaysBetweenJSDateUtil(date1, date2)
      );
    });
  });
});

describe("validate", () => {
  it("should return false if date is invalid", () => {
    ["1", "a", "$", "1/1/1899", "1/1/3000"].forEach((date) => {
      expect(validate(date)).not.toBeTruthy();
    });
  });
});

describe("getDates", () => {
  it("should return reverse date1 and date2 if date1 is later than date2", () => {
    const date1 = "1/1/2001";
    const date2 = "1/1/2001";
    expect(getDates(date1, date2)).toEqual([
      parseDate(date2),
      parseDate(date1),
    ]);
  });
});
