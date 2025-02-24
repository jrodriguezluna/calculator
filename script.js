// function definitions

function add(a, b) {return a + b};
function subtract(a, b) {return a - b};
function multiply(a, b) {return a * b};
function divide(a, b) {return a / b};

function operate(operator, a, b) {
  a = Number(a);
  b = Number(b);
  switch(operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      return divide(a, b);
  }
}

const isDecimal = function(num) {
  return num % 1 !== 0;
}

const countDecimals = function(value) {
  if (Math.floor(value) !== value)
      return value.toString().split(".")[1].length || 0;
  return 0;
}

function turnFloattoInt(float, decimals) {
  return float * (Math.pow(10, decimals));
}

function turnIntToFloat(int, decimals) {
  return int / (Math.pow(10, decimals));
}

function handleOperation(element) {
  const noParameters = (!operandA && !operator);
  const onlyNoOperator = (operandA && !operator);
  const alreadyHaveOperator = (operandA && operator);
  
  if (noParameters) {
    operandA = display.textContent;
    operator = element.textContent;
  }
  else if (onlyNoOperator) {
    operator = element.textContent;
  }
  else if (alreadyHaveOperator) {
    handleEqualsClick(element);
    operator = element.textContent
  }
}

function handleEqualsClick() {
  const onlyA = (!operator && !operandB);
  const onlyAandOperator = (operator && !operandB);
  const allAvailable = (operator && operandB);
  if (onlyA) {
    return;
  }
  else {
    let a, b;
    if (onlyAandOperator) {
      a = b = operandA;
    }
    else if (allAvailable) {
      a = operandA;
      b = operandB;
    }
    let result;
    if (isDecimal(a) || isDecimal(b)) {
      const aDecimals = countDecimals(a);
      const bDecimals = countDecimals(b);
      if (aDecimals > bDecimals) {
        a = turnFloattoInt(a, aDecimals);
        b = turnFloattoInt(b, aDecimals);
        result = turnIntToFloat(operate(operator, a, b), aDecimals);
      }
      else {
        a = turnFloattoInt(a, bDecimals);
        b = turnFloattoInt(b, bDecimals);
        result = turnIntToFloat(operate(operator, a, b), bDecimals);
      }
      result = result.toString()
    }
    else {
      result = operate(operator, a, b).toString();
    }
    operandA = result;
    operandB = null;
    operator = null;
    setDisplayTo(operandA);
  }
}

function populateScreen(element) {
  const newValueisA = (!operandA);
  const newValueisB = (operandA && operator && !operandB);
  const newValueComes = (display.textContent == NO_CONTENT || newValueisB);
  const valueisA = (operandA && !operator && !operandB);
  const valueisB = (operandA && operator && operandB);

  const value = element.textContent;

  if (newValueComes) {
    setDisplayTo(value);
    if (newValueisA) {
      operandA = value;
    }
    else if (newValueisB) {
      operandB = value;
    }
  }
  else {
    if (valueisA) {
      operandA += value;
      setDisplayTo(operandA);
    }
    else if (valueisB) {
      operandB += value;
      setDisplayTo(operandB);
    }  
  }
}

function clearCalculator() {
  setDisplayTo(NO_CONTENT);
  operandA = null;
  operandB = null;
  operator = null;
}

function toggleSign() {
  if (operandA && !operandB) {
    let operand = Number(operandA);
    operand *= -1;
    operandA = operand.toString();
    setDisplayTo(operandA);
  }
  else if (operandB) {
    let operand = Number(operandB);
    operand *= -1;
    operandB = operand.toString();
    setDisplayTo(operandB)
  }
}

function addPercentage() {
  if (operandA && !operandB) {
    let operand = Number(operandA);
    operand *= 0.01;
    operandA = operand.toString();
    setDisplayTo(operandA);
  }
  else if (operandB) {
    let operand = Number(operandB);
    operand *= 0.01;
    operandB = operand.toString();
    setDisplayTo(operandB)
  }
}

function addDot() {
  noDotAlready = !display.textContent.includes(".");
  if (noDotAlready) {
    if (!operandB && !operator) {
      if (!operandA) {
        operandA = "0."
      }
      else {
        operandA += "."
      }
      setDisplayTo(operandA);
    }
    else {
      if (operator) {
        operandB = "0.";
      }
      else {
        operandB += ".";
      }
      setDisplayTo(operandB)
    }
  }
}

function setDisplayTo(value) {
  display.textContent = value;
}

// calculator setup

let operandA = null;
let operandB = null;
let operator = null;

const display = document.querySelector(".calculator__display");
const calculatorBody = document.querySelector(".calculator__body");
const NO_CONTENT = "0";
setDisplayTo(NO_CONTENT);

calculatorBody.addEventListener("click", (e) => {
  if (e.target.tagName !== "BUTTON") return;
  else if (e.target.className === "operation") handleOperation(e.target);
  else if (e.target.className === "equals") handleEqualsClick();
  else if (e.target.id === "clear") clearCalculator();
  else if (e.target.id === "sign") toggleSign();
  else if (e.target.id === "percentage") addPercentage();
  else if (e.target.id === "dot") addDot();
  else if (e.target.id) populateScreen(e.target);
})