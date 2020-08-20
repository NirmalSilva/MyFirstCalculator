import { calculate } from "./calculate.js";

// test to see if Jest is working
test("test works", () => {
  expect(1).toBe(1);
});

// 2 tests to see if add feature is working
describe("test add operator in caclculator function", () => {
  test("adds 2.5 + 3.6 to equal 6.1", () => {
    expect(calculate(2.5, "add", 3.6)).toBe(6.1);
  });
  test("adds -5 + 30 to equal 25", () => {
    expect(calculate(-5, "add", 30)).toEqual(25);
  });
});
// 2 tests to see if subract feature is working
describe("test subtract operator in caclculator function", () => {
  test("subtracts 7 - (-3) to equal 10", () => {
    expect(calculate(7, "subtract", -3)).toBe(10);
  });
  test("subtracts 25 - 8 to equal 17", () => {
    expect(calculate(25, "subtract", 8)).toEqual(17);
  });
});
// 2 tests to see if multiply feature is working
describe("test calulate multiply function", () => {
  test("multiplies 2.5 * 4 to equal 10", () => {
    expect(calculate(2.5, "multiply", 4)).toBe(10);
  });
  test("multiplies 35 * 3 to equal 105", () => {
    expect(calculate(35, "multiply", 3)).toEqual(105);
  });
});
// 2 tests to see if divide feature is working
describe("test calulate divide function", () => {
  test("divides 24 ÷ 4 to equal 6", () => {
    expect(calculate(24, "divide", 4)).toBe(6);
  });
  test("divides 45 ÷ 12 to equal 3.75", () => {
    expect(calculate(45, "divide", 12)).toBe(3.75);
  });
});
