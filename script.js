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
      if (displayedNum === "0" || previousKeyType === "operator") {
        display.textContent = keyContent;
      } else {
        display.textContent = displayedNum + keyContent;
      }
      calculator.dataset.previousKey = "number";
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
        display.textContent = calculate(firstValue, operator, secondValue);
      }

      // add a class list defined in css to highlight the clicked button
      key.classList.add("is-depressed");
      // Add custom attribute-To check whether the previous key was an operator
      calculator.dataset.previousKeyType = "operator";
      calculator.dataset.firstValue = displayedNum;
      calculator.dataset.operator = action;
    }

    // Checking whether is a decimal key, clear key or calculate key
    if (action === "decimal") {
      // add a "." to the displayed number
      if (!displayedNum.includes(".")) {
        display.textContent = displayedNum + ".";
      } else if (previousKeyType === "operator") {
        display.textContent = "0.";
      }
      calculator.dataset.previousKey = "decimal";
    }

    if (action === "clear") {
      calculator.dataset.previousKeyType = "clear";
    }

    if (action === "calculate") {
      const firstValue = calculator.dataset.firstValue;
      const operator = calculator.dataset.operator;
      const secondValue = displayedNum;
      calculator.dataset.previousKeyType = "calculate";
      display.textContent = calculate(firstValue, operator, secondValue);
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
