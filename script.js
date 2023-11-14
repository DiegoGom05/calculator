let operator = null;
let firstNum = null;
let secondNum = null;

const numbersBtn = document.querySelectorAll('.numbers');
const display = document.querySelector('.display');
const op = document.querySelectorAll('.operator');
const equals = document.querySelector('.equals');
const clear = document.querySelector('.clear');

numbersBtn.forEach(button => {
    button.addEventListener('click', () => { appendNumber(button.textContent) });
});

op.forEach(operation => {
    operation.addEventListener('click', () => { saveOperator(operation.textContent) });
});

equals.addEventListener('click', evaluateExpression);
clear.addEventListener('click', clearCalculator);

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        return 'Cannot divide by zero';
    }
    return a / b;
}

function operate(op, firstNum, secondNum) {
    switch (op) {
        case '+':
            return add(firstNum, secondNum);
        case '-':
            return subtract(firstNum, secondNum);
        case '*':
            return multiply(firstNum, secondNum);
        case '/':
            return divide(firstNum, secondNum);
        default:
            return NaN;
    }
}

function appendNumber(value) {
    display.innerText += value;
}

function saveOperator(op) {
    if (firstNum === null) {
        // If there's no firstNum, set it to the current display value
        firstNum = parseFloat(display.innerText);
        operator = op;
        display.innerText = '';
    } else {
        // If there's already a firstNum, evaluate the expression and update firstNum and operator
        secondNum = parseFloat(display.innerText);
        firstNum = operate(operator, firstNum, secondNum);
        operator = op;
        display.innerText = '';
    }
}

function evaluateExpression() {
    if (firstNum !== null && operator !== null) {
        secondNum = parseFloat(display.innerText);
        const result = operate(operator, firstNum, secondNum);
        display.innerText = roundResult(result);
        // Reset the calculator state
        firstNum = null;
        operator = null;
        secondNum = null;
    }
}

function clearCalculator() {
    display.innerText = '';
    firstNum = null;
    operator = null;
    secondNum = null;
}

function roundResult(result) {
    // Round result to handle long decimals
    return Math.round(result * 100000) / 100000;
}
