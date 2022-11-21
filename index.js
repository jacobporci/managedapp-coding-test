const readline = require("readline/promises");
const { stdin: input, stdout: output } = require("process");
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
  try {
  } catch (error) {}
  const input1 = await getDateInput("Date 1: ");
  const input2 = await getDateInput("Date 2: ");
  console.log({ input1, input2 });

  const result = getDaysBetween(input1, input2);
  console.log("Days between: ", result);
  process.exit();
})();
