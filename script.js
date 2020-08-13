// Selecting the outer division of the calculator
const calculator = document.querySelector(".calculator");
// Selecting the division which includes all the inpput key buttons
const keys = calculator.querySelector(".calculator__keys");
// Selecting the display section of the calculator
const display = document.querySelector(".calculator__display");

// Adding an event listener to track the  event triggered when a key is pressed
keys.addEventListener("click", (e) => {
  // Matching whether the even triggered is via a button
  if (e.target.matches("button")) {
    // Assigning the event triggerd to a variable to be used to track which button it is
    const key = e.target;
    // Assigning to see if the event triggered link to a button which has a defined data-action
    const action = key.dataset.action;
    // To check the displayed value of the pressed button key
    const keyContent = key.textContent;
    // To check the display value of the calculater top display placeholder
    const displayedNum = display.textContent;

    // add a key to identify a click after clicking an another button-previous key type
    const previousKeyType = calculator.dataset.previousKeyType;

    // if the display value is 0  or clicked button is a operator replace it with the key press , if not add that value to the existing value
    if (!action) {
      if (
        displayedNum === "0" ||
        previousKeyType === "operator" ||
        previousKeyType === "calculate"
      ) {
        display.textContent = keyContent;
      } else {
        display.textContent = displayedNum + keyContent;
      }
      calculator.dataset.previousKeyType = "number";
    }

    // Remove .is-depressed class from all keys
    Array.from(key.parentNode.children).forEach((k) =>
      k.classList.remove("is-depressed")
    );
    // To check whether its a operator key
    if (
      action === "add" ||
      action === "subtract" ||
      action === "multiply" ||
      action === "divide"
    ) {
      const firstValue = calculator.dataset.firstValue;
      const operator = calculator.dataset.operator;
      const secondValue = displayedNum;

      if (firstValue && operator && previousKeyType !== "operator") {
        const calcValue = calculate(firstValue, operator, secondValue);
        display.textContent = calcValue;
      } else {
        calculator.dataset.firstValue = displayedNum;
      }

      if (
        firstValue &&
        operator &&
        previousKeyType !== "operator" &&
        previousKeyType !== "calculate"
      ) {
        const calcValue = calculate(firstValue, operator, secondValue);
        display.textContent = calcValue;
        calculator.dataset.firstValue = calcValue;
      } else {
        calculator.dataset.firstValue = displayedNum;
      }
      // add a class list defined in css to highlight the clicked button
      key.classList.add("is-depressed");
      // Add custom attribute-To check whether the previous key was an operator
      calculator.dataset.previousKeyType = "operator";

      calculator.dataset.operator = action;
    }

    // Checking whether is a decimal key, clear key or calculate key
    if (action === "decimal") {
      if (!displayedNum.includes(".")) {
        display.textContent = displayedNum + ".";
      } else if (
        previousKeyType === "operator" ||
        previousKeyType === "calculate"
      ) {
        display.textContent = "0.";
      }

      calculator.dataset.previousKeyType = "decimal";
    }
    if (action === "clear") {
      if (key.textContent === "AC") {
        calculator.dataset.firstValue = "";
        calculator.dataset.modValue = "";
        calculator.dataset.operator = "";
        calculator.dataset.previousKeyType = "";
      } else {
        key.textContent = "AC";
      }

      display.textContent = 0;
      calculator.dataset.previousKeyType = "clear";
    }

    if (action !== "clear") {
      const clearButton = calculator.querySelector("[data-action=clear]");
      clearButton.textContent = "CE";
    }

    if (action === "calculate") {
      let firstValue = calculator.dataset.firstValue;
      const operator = calculator.dataset.operator;
      const secondValue = displayedNum;
      if (firstValue) {
        if (previousKeyType === "calculate") {
          firstValue = displayedNum;
          secondValue = calculator.dataset.modValue;
        }
        display.textContent = calculate(firstValue, operator, secondValue);
      }
      calculator.dataset.modValue = secondValue;
      calculator.dataset.previousKeyType = "calculate";
    }
  }
});

const calculate = (n1, operator, n2) => {
  // Perform calculation and return calculated value
  let result = "";

  if (operator === "add") {
    result = parseFloat(n1) + parseFloat(n2);
  } else if (operator === "subtract") {
    result = parseFloat(n1) - parseFloat(n2);
  } else if (operator === "multiply") {
    result = parseFloat(n1) * parseFloat(n2);
  } else if (operator === "divide") {
    result = parseFloat(n1) / parseFloat(n2);
  }

  return result;
};
