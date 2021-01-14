// const luxon = require("luxon");
const { truncate } = require("fs");
const { isLaterThan } = require("./dates");

test("Dates are later than", () => {
  expect(isLaterThan(2, 3)).toBe(true);
  expect(isLaterThan(4, 3)).toBe(false);
});

const checkDates30Mins = (time1, time2) => {
  const timeDifference = time2 - time1;
  const timeBefore = 30 * 60;
  if (timeDifference < (timeBefore)){
    return true;
  } else {
    return false;
  }
}

test("Dates are within 30 minutes", () => {
  expect(checkDates30Mins(1577880000, 1577881500)).toBe(true);
  expect(checkDates30Mins(1577880000, 1577882100)).toBe(false);
}) 
