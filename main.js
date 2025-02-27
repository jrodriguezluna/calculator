import * as utils from "./utilities.js";

function handleOperator(element) {
  // we add an operator or replace it.
  operator = element.textContent;
  if (!operandA) operandA = NO_CONTENT;
  toggleOperatorDisplay(element.textContent)
}

function handleEquals() {
  console.log(operandA);
  console.log(operandB);
  if (!operator && !operandB) return; // do nothing
  
  let a = operandA;
  let b = operandB || operandA; //if B was not pressed then use A
  let result = (utils.isDecimal(a) || utils.isDecimal(b))
    ? utils.operateFloats(operator, a, b) 
    : utils.operate(operator, a, b);
  if (result === "Infinity" || result === "NaN") result = "HISS"; // divisions with 0

  operandA = result.toString();
  operandB = operator = null;
  clearOperandDisplay();
  setDisplayTo(operandA);
}

function populateScreen(element) {
  let value = element.textContent;
  // new value comming, either A or B
  if (display.textContent == NO_CONTENT || operandA && operator && !operandB) {
    if (!operandA) operandA = value;
    else operandB = value;
    setDisplayTo(value);
  } // value is either added to A or B
  else {
    if (display.textContent.length < MAX_DIGITS + 
      (display.textContent.includes(".") ? 1 : 0) +
      (display.textContent.includes("-") ? 1 : 0)) {
      if (operandA && !operator && !operandB) {
        operandA += value;
        value = operandA;
      }
      else {
        operandB += value;
        value = operandB;
      }
      setDisplayTo(value);
    }
  } 
}

function handleClear() {
  setDisplayTo(NO_CONTENT);
  operandA = operandB = operator = null;
  clearOperandDisplay();
}

function clearOperandDisplay() {
  displayOperandsList.forEach((el) => el.style.color = "#505050");
}

function handleSign() {
  let operand = + ((operandA && !operandB) ? Number(operandA): Number(operandB)) * -1;
  if (operandA && !operandB) operandA = operand;
  else if (operandB) operandB = operand;
  setDisplayTo(operand);
}
  
function handlePercentage() {
  const operand = Number(operandA || operandB);
  const result = (operand * 0.01).toString();
  if (operandA && !operandB) operandA = result;
  else if (operandB) operandB = result;
  setDisplayTo(result);
}

function handleDot(operand="ERROR") {
  if (!display.textContent.includes(".")) {
    if (!operandB && !operator) {
      operand = operandA = (operandA) ? operandA + "." : "0.";}
    else operand = operandB = (operandB) ? operandB + "." : "0."; 
    setDisplayTo(operand);
    console.log(operand)
  }
}

function setDisplayTo(value) {
  display.textContent = value;
}

function toggleOperatorDisplay(currentOperator) {
  for (const el of displayOperandsList) {
    if (el.textContent === currentOperator) {
      el.style.color = "#000000";
    }
    else {
      el.style.color = "#505050";
    }
  }
}

// calculator setup ///////////////////////////////////////////////////////////
const display = document.querySelector(".display__numbers");
const calculatorBody = document.querySelector(".calculator__body");
const displayOperandsList = [...document.querySelectorAll("li")].slice(0, -1);

let operandA, operandB, operator = null;
const MAX_DIGITS = 8;
const NO_CONTENT = "0";
setDisplayTo(NO_CONTENT);

calculatorBody.addEventListener("click", (e) => {
  if (e.target.tagName !== "BUTTON") return;
  else if (e.target.className === "operation") handleOperator(e.target);
  else if (e.target.className === "equals") handleEquals();
  else if (e.target.id === "clear") handleClear();
  else if (e.target.id === "sign") handleSign();
  else if (e.target.id === "percentage") handlePercentage();
  else if (e.target.id === "dot") handleDot();
  else if (e.target.id) populateScreen(e.target);
})