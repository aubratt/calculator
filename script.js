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
    return a / b;
}

function operate(firstNum, secondNum, operator) {
    switch(operator) {
        case "+":
            console.log(add(firstNum, secondNum));
        case "-":
            subtract(firstNum, secondNum);
        case "*":
            multiply(firstNum, secondNum);
        case "/":
            divide(firstNum, secondNum);
    }
}

function promptUser() {
    const firstNum = parseInt(prompt("Enter first number: "));
    const secondNum = parseInt(prompt("Enter second number: "));
    const operator = prompt("Enter the operator: ");

    operate(firstNum, secondNum, operator);
}

promptUser();
