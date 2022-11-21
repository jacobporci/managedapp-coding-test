const readline = require("readline/promises");
const { stdin: input, stdout: output, stdout } = require("process");
const { getDaysBetween, validate } = require("./utils.js");

const getDateInput = async (question) => {
  const rl = readline.createInterface({ input, output });
  const cin = await rl.question(question);

  if (validate(cin)) {
    rl.close();
    return cin;
  } else {
    console.log("Invalid date, please try again.");
    rl.close();
    return getDateInput(question);
  }
};

(async () => {
  const date1 = await getDateInput("Date 1: ");
  const date2 = await getDateInput("Date 2: ");

  const daysBetween = getDaysBetween(date1, date2);
  console.log("Days between ", date1, " and ", date2, " is ", daysBetween);

  process.exit();
})();
