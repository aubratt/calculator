function updateDisplayOnBtnClick(clickedBtn) {
    const mainDisplay = document.getElementById("main-display");
    const historyDisplay = document.getElementById("history-display");
    const equationSituation = evaluateCurrentEquationSituation(mainDisplay);
    const clickedBtnCategory = evaluateClickedBtnCategory(clickedBtn);
    const decimalInCurrentNumber = evaluateDecimalOccurences(mainDisplay, equationSituation);
    const answer = evaluateCurrentEquationAnswer(mainDisplay, equationSituation);

    if (clickedBtnCategory === "All Clear") {
        mainDisplay.textContent = "0";
        historyDisplay.textContent = "";
    }

    if (clickedBtnCategory === "Backspace") {
        mainDisplay.textContent = mainDisplay.textContent.slice(0, -1);

        if (mainDisplay.textContent === "") {
            mainDisplay.textContent = "0";
        }
    }

    if (!decimalInCurrentNumber && clickedBtnCategory === "Decimal") {
        mainDisplay.textContent += clickedBtn.textContent;
    }

    if (equationSituation === "Zero" && clickedBtnCategory === "Digit") {
        mainDisplay.textContent = clickedBtn.textContent;
    } else if (clickedBtnCategory === "Digit") {
        mainDisplay.textContent += clickedBtn.textContent;
    }

    if (
        (equationSituation === "Zero" || equationSituation === "One Number" || equationSituation === "One Number with Trailing Modulo Operator") &&
        clickedBtnCategory === "Basic Operator"
    ) {
        mainDisplay.textContent += clickedBtn.textContent;
    }

    if ((equationSituation === "Zero" || equationSituation === "One Number") && clickedBtnCategory === "Modulo Operator") {
        mainDisplay.textContent += clickedBtn.textContent;
    }

    if (
        equationSituation === "One Number with Trailing Basic Operator" &&
        (clickedBtnCategory === "Basic Operator" || clickedBtnCategory === "Modulo Operator")
    ) {
        mainDisplay.textContent = mainDisplay.textContent.slice(0, -1).concat(clickedBtn.textContent);
    }

    if (equationSituation === "One Number with Trailing Modulo Operator" && clickedBtnCategory === "Modulo Operator") {
        mainDisplay.textContent = `(${mainDisplay.textContent})${clickedBtn.textContent}`;
    }

    if (
        (equationSituation === "One Number with Trailing Modulo Operator" ||
            equationSituation === "Numbers on Either Side of Basic Operator" ||
            equationSituation === "Numbers on Either Side of Modulo Operator") &&
        clickedBtnCategory === "Evaluator"
    ) {
        historyDisplay.textContent = mainDisplay.textContent.concat("=", answer);
        mainDisplay.textContent = answer;
    }

    if (
        (equationSituation === "Numbers on Either Side of Basic Operator" || equationSituation === "Numbers on Either Side of Modulo Operator") &&
        (clickedBtnCategory === "Basic Operator" || clickedBtnCategory === "Modulo Operator")
    ) {
        historyDisplay.textContent = mainDisplay.textContent.concat("=", answer);
        mainDisplay.textContent = answer.concat(clickedBtn.textContent);
    }

    mainDisplay.style.fontSize = "64px";
    formatDisplay();
    alternateAllClearBackspace();
}

function evaluateCurrentEquationSituation(mainDisplay) {
    const currentEquationString = mainDisplay.textContent;

    if (currentEquationString === "0") {
        return "Zero";
    }

    const currentEquationIncludesBasicOperator =
        currentEquationString.includes("+") ||
        currentEquationString.includes("−") ||
        currentEquationString.includes("×") ||
        currentEquationString.includes("÷");

    const currentEquationIncludesModuloOperator = currentEquationString.includes("%");

    if (!currentEquationIncludesBasicOperator && !currentEquationIncludesModuloOperator) {
        return "One Number";
    }

    const currentEquationEndsWithBasicOperator =
        currentEquationString.endsWith("+") ||
        currentEquationString.endsWith("−") ||
        currentEquationString.endsWith("×") ||
        currentEquationString.endsWith("÷");

    if (currentEquationEndsWithBasicOperator) {
        return "One Number with Trailing Basic Operator";
    }

    const currentEquationEndsWithModuloOperator = currentEquationString.endsWith("%");
    const moduloOccurences = currentEquationString.split("%").length - 1;

    if (currentEquationEndsWithModuloOperator && moduloOccurences === 1) {
        return "One Number with Trailing Modulo Operator";
    }

    if (currentEquationIncludesBasicOperator) {
        return "Numbers on Either Side of Basic Operator";
    }

    if (currentEquationIncludesModuloOperator) {
        return "Numbers on Either Side of Modulo Operator";
    }
}

function evaluateClickedBtnCategory(clickedBtn) {
    if (clickedBtn.classList.contains("digit-btn")) {
        return "Digit";
    }

    if (clickedBtn.id.includes("equals-btn")) {
        return "Evaluator";
    }

    if (clickedBtn.classList.contains("operator-btn")) {
        return "Basic Operator";
    }

    if (clickedBtn.id.includes("modulo-btn")) {
        return "Modulo Operator";
    }

    if (clickedBtn.id.includes("decimal-btn")) {
        return "Decimal";
    }

    if (clickedBtn.id.includes("ac-btn")) {
        return "All Clear";
    }

    if (clickedBtn.id.includes("bs-btn") || clickedBtn.className === "material-symbols-outlined") {
        return "Backspace";
    }
}

function evaluateDecimalOccurences(mainDisplay, equationSituation) {
    const equationString = mainDisplay.textContent;
    let decimalOccurences;

    if (equationSituation === "Zero" || equationSituation === "One Number") {
        decimalOccurences = equationString.split(".").length - 1;
    }

    if (equationSituation === "Numbers on Either Side of Basic Operator" || equationSituation === "Numbers on Either Side of Modulo Operator") {
        const moduloOccurences = equationString.split("%").length - 1;
        console.log(`modulo occurences: ${moduloOccurences}`);
        const operatorMatch = /[+−×÷%]/;
        let operator;

        if (moduloOccurences < 2) {
            operator = equationString.match(operatorMatch);
        }

        if (moduloOccurences === 2) {
            operator = equationString.match(operatorMatch);
        }

        console.log(`operator: ${operator}`);

        const indexOfOperator = equationString.indexOf(operator);
        const secondNumber = equationString.slice(indexOfOperator, equationString.length);

        decimalOccurences = secondNumber.split(".").length - 1;
    }

    return decimalOccurences > 0 ? true : false;
}

function evaluateCurrentEquationAnswer(mainDisplay, equationSituation) {
    if (equationSituation === "One Number with Trailing Modulo Operator") {
        return calculateDecimal(mainDisplay.textContent);
    }

    if (mainDisplay.textContent.includes("+")) {
        return calculateSum(mainDisplay);
    }

    if (mainDisplay.textContent.includes("−")) {
        return calculateDifference(mainDisplay);
    }

    if (mainDisplay.textContent.includes("×")) {
        return calculateProduct(mainDisplay);
    }

    if (mainDisplay.textContent.includes("÷")) {
        return calculateQuotient(mainDisplay);
    }

    if (equationSituation === "Numbers on Either Side of Modulo Operator") {
        return calculateRemainder(mainDisplay);
    }
}

function calculateDecimal(number) {
    return number.slice(0, -1) / 100;
}

function calculateSum(mainDisplay) {
    const equationString = mainDisplay.textContent;
    const indexOfPlus = equationString.indexOf("+");
    let firstNumber = equationString.slice(0, indexOfPlus);
    const secondNumber = parseFloat(equationString.slice(indexOfPlus + 1, equationString.length));

    if (firstNumber.endsWith("%")) {
        firstNumber = calculateDecimal(firstNumber);
    }

    return (parseFloat(firstNumber) + secondNumber).toString();
}

function calculateDifference(mainDisplay) {
    const equationString = mainDisplay.textContent;
    const indexOfMinus = equationString.indexOf("−");
    let firstNumber = equationString.slice(0, indexOfMinus);
    const secondNumber = parseFloat(equationString.slice(indexOfMinus + 1, equationString.length));

    if (firstNumber.endsWith("%")) {
        firstNumber = calculateDecimal(firstNumber);
    }

    return (parseFloat(firstNumber) - secondNumber).toString();
}

function calculateProduct(mainDisplay) {
    const equationString = mainDisplay.textContent;
    const indexOfTimes = equationString.indexOf("×");
    let firstNumber = equationString.slice(0, indexOfTimes);
    const secondNumber = parseFloat(equationString.slice(indexOfTimes + 1, equationString.length));

    if (firstNumber.endsWith("%")) {
        firstNumber = calculateDecimal(firstNumber);
    }

    return (parseFloat(firstNumber) * secondNumber).toString();
}

function calculateQuotient(mainDisplay) {
    const equationString = mainDisplay.textContent;
    const indexOfObelus = equationString.indexOf("÷");
    let firstNumber = equationString.slice(0, indexOfObelus);
    const secondNumber = parseFloat(equationString.slice(indexOfObelus + 1, equationString.length));

    if (firstNumber.endsWith("%")) {
        firstNumber = calculateDecimal(firstNumber);
    }

    return (parseFloat(firstNumber) / secondNumber).toString();
}

function calculateRemainder(mainDisplay) {
    const equationString = mainDisplay.textContent;
    const moduloOccurences = equationString.split("%").length - 1;
    let firstNumber;
    let secondNumber;

    if (moduloOccurences === 1) {
        const indexOfModulo = equationString.indexOf("%");
        firstNumber = parseFloat(equationString.slice(0, indexOfModulo));
        secondNumber = parseFloat(equationString.slice(indexOfModulo + 1, equationString.length));
    } else {
        const indexOfFirstModulo = equationString.indexOf("%");
        const indexOfSecondModulo = equationString.indexOf("%", indexOfFirstModulo + 1);
        firstNumber = equationString.slice(1, indexOfSecondModulo - 1);
        firstNumber = parseFloat(calculateDecimal(firstNumber));
        secondNumber = parseFloat(equationString.slice(indexOfSecondModulo + 1, equationString.length + 1));
    }

    return (firstNumber % secondNumber).toString();
}

function formatDisplay() {
    const displayDiv = document.getElementById("display");
    const mainDisplayDiv = document.getElementById("main-display");
    const displayWidth = displayDiv.offsetWidth;
    let mainDisplayWidth = mainDisplayDiv.offsetWidth;
    let mainDisplayFontSize = parseFloat(window.getComputedStyle(mainDisplayDiv).fontSize);

    while (mainDisplayWidth > displayWidth) {
        mainDisplayDiv.style.fontSize = mainDisplayFontSize - 1 + "px";
        mainDisplayWidth = mainDisplayDiv.offsetWidth;
        mainDisplayFontSize--;
    }
}

function alternateAllClearBackspace() {
    const mainDisplay = document.getElementById("main-display");
    const equationSituation = evaluateCurrentEquationSituation(mainDisplay);
    const acBtn = document.querySelector(".ac-bs-btn");

    if (equationSituation === "Zero") {
        acBtn.id = "ac-btn";
        acBtn.textContent = "AC";

        if (document.querySelector(".material-symbols-outlined")) {
            document.querySelector(".material-symbols-outlined");
        }
    } else {
        acBtn.id = "bs-btn";
        acBtn.textContent = "";

        if (!document.querySelector(".material-symbols-outlined")) {
            const bsSymbol = document.createElement("span");
            bsSymbol.className = "material-symbols-outlined";
            bsSymbol.textContent = "backspace";

            acBtn.appendChild(bsSymbol);
        }
    }
}

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".keypad-btn").forEach((btn) => {
        btn.addEventListener("click", function (event) {
            updateDisplayOnBtnClick(event.target);
        });
    });
});
