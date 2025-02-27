export function isDecimal(num) {
  return num % 1 !== 0;
}

function countDecimals(value) {
  value = Number(value);
  if (Math.floor(value) !== value)
      return value.toString().split(".")[1].length || 0;
  return 0;
}

function turnFloatToInt(float, decimals) {
  return float * (Math.pow(10, decimals));
}

function turnIntToFloat(int, decimals, operator) {
  if ("+-".includes(operator)) return int / (Math.pow(10, decimals));
  return int / (Math.pow(10, decimals + 1));
}

function add(a, b) {return a + b};
function subtract(a, b) {return a - b};
function multiply(a, b) {return a * b};
function divide(a, b) {return a / b};

export function operate(operator, a, b) {
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

export function operateFloats(operator, numA, numB) {
  const decimals = Math.max(countDecimals(numA), countDecimals(numB));
  numA = turnFloatToInt(numA, decimals);
  numB = turnFloatToInt(numB, decimals);
  return turnIntToFloat(operate(operator, numA, numB), decimals, operator);
}
