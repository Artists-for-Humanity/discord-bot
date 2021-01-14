// const luxon = require("luxon");
const { isLaterThan } = require("./dates");

test("Dates are later than", () => {
  expect(isLaterThan(2, 3)).toBe(true);
  expect(isLaterThan(4, 3)).toBe(false);
});
