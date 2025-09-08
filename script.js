function updateDisplayOnBtnClick(clickedBtn) {
    const mainDisplay = document.getElementById("main-display");
    const historyDisplay = document.getElementById("history-display");
    const equationSituation = evaluateCurrentEquationSituation(mainDisplay, clickedBtn);
    const clickedBtnCategory = evaluateClickedBtnCategory(clickedBtn);
    const answer = evaluateCurrentEquationAnswer(mainDisplay, equationSituation);

    if (clickedBtnCategory === "All Clear") {
        mainDisplay.textContent = "0";
        historyDisplay.textContent = "";
    }

    if (equationSituation === "Zero") {
        if (clickedBtnCategory === "Digit") {
            mainDisplay.textContent = clickedBtn.textContent;
        }

        if (clickedBtnCategory === "Basic Operator" || clickedBtnCategory === "Modulo Operator") {
            mainDisplay.textContent += clickedBtn.textContent;
        }
    }

    if (equationSituation === "One Number") {
        if (clickedBtnCategory === "Digit" || clickedBtnCategory === "Basic Operator" || clickedBtnCategory === "Modulo Operator") {
            mainDisplay.textContent += clickedBtn.textContent;
        }
    }

    if (equationSituation === "One Number with Trailing Basic Operator") {
        if (clickedBtnCategory === "Digit") {
            mainDisplay.textContent += clickedBtn.textContent;
        }

        if (clickedBtnCategory === "Basic Operator" || clickedBtnCategory === "Modulo Operator") {
            mainDisplay.textContent = mainDisplay.textContent.slice(0, -1).concat(clickedBtn.textContent);
        }
    }

    if (equationSituation === "One Number with Trailing Modulo Operator") {
        if (clickedBtnCategory === "Digit" || clickedBtnCategory === "Basic Operator" || clickedBtnCategory === "Modulo Operator") {
            mainDisplay.textContent += clickedBtn.textContent;
        }

        if (clickedBtnCategory === "Evaluator") {
            historyDisplay.textContent = mainDisplay.textContent.concat("=", answer);
            mainDisplay.textContent = answer;
        }
    }

    if (equationSituation === "Numbers on Either Side of Basic Operator") {
        if (clickedBtnCategory === "Digit") {
            mainDisplay.textContent += clickedBtn.textContent;
        }

        if (clickedBtnCategory === "Basic Operator" || clickedBtnCategory === "Modulo Operator") {
            historyDisplay.textContent = mainDisplay.textContent.concat("=", answer);
            mainDisplay.textContent = answer.concat(clickedBtn.textContent);
        }

        if (clickedBtnCategory === "Evaluator") {
            historyDisplay.textContent = mainDisplay.textContent.concat("=", answer);
            mainDisplay.textContent = answer;
        }
    }

    if (equationSituation === "Numbers on Either Side of Modulo Operator") {
        if (clickedBtnCategory === "Digit") {
            mainDisplay.textContent += clickedBtn.textContent;
        }

        if (clickedBtnCategory === "Basic Operator" || clickedBtnCategory === "Modulo Operator") {
            historyDisplay.textContent = mainDisplay.textContent.concat("=", answer);
            mainDisplay.textContent = answer.concat(clickedBtn.textContent);
        }

        if (clickedBtnCategory === "Evaluator") {
            historyDisplay.textContent = mainDisplay.textContent.concat("=", answer);
            mainDisplay.textContent = answer;
        }
    }
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

    if (currentEquationEndsWithModuloOperator) {
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

    if (clickedBtn.id.includes("ac-btn")) {
        return "All Clear";
    }
}

function evaluateCurrentEquationAnswer(mainDisplay, equationSituation) {
    if (equationSituation === "One Number with Trailing Modulo Operator") {
        return calculatePercentage(mainDisplay);
    }
}

function calculatePercentage(mainDisplay) {
    return parseFloat(mainDisplay.textContent.slice(0, -1)) / 100;
}

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".keypad-btn").forEach((btn) => {
        btn.addEventListener("click", function (event) {
            updateDisplayOnBtnClick(event.target);
        });
    });
});

// Button Categories:
//      - Digit (0-9)
//      - Basic Operators (Add, Subtract, Multiply, Divide)
//      - Modulo Operator* (%)
//      - Evaluator (=)
//      - All Clear Function (AC)
//      ( - Change Sign Function (+/-) )
//      ( - Decimal Function (.) )
//      ( - Backspace Function )
//      ( - Info Button (i) )

//      ( Category names in parentheses are future addtions. Not accounted for in equation situations yet. )

// Equation Situations
//      - Zero (0)
//          - Digit click: Replace 0 with digit value (9)
//          - Basic Operator OR Modulo Operator click: Append operator to equation string (0+)
//          - Evaluator OR All Clear click: Do nothing (0)
//
//      - One Number (15)
//          - Digit OR Basic Operator OR Modulo Operator click: Append digit value or operator to equation string (159 or 15+)
//          - Evaluator click: Do nothing (15)
//          - All Clear click: Reset equation string to 0 (0)

//      - One Number with Trailing Basic Operator (15+)
//          - Digit click: Append digit value to equation string (15+5)
//          - Basic Operator OR Modulo Operator click: Replace equation string operator with clicked operator (15-)
//          - Evaluator click: Do nothing (15+)
//          - All Clear click: Reset equation string to 0 (0)

//      - One Number with Trailing Modulo Operator (15%)
//          - Digit click: Append digit value to equation string (15%9)
//          - Basic Operator OR Modulo Operator click: Append operator to equation string (15%+) (On Modulo click, first number becomes percentage: (15%)%)
//          - Evaluator click: Evaluate equation string(*1) (Calculate 15/100), replace equation string with evaluation answer (0.15), push evaluated equation string to display history (15%=0.15)
//          - All Clear click: Reset equation string to 0 (0)

//      - Numbers on Either Side of Basic Operator (15+5)
//          - Digit click: Append digit value to equation string (15+51)
//          - Basic Operator OR Modulo Operator click: Evaluate equation string (Calculate 15+5), replace equation string with evaluation answer and clicked operater appended (20-), push evaluated equation string to display history (15+5=20)
//          - Evaluator click: Evaluate equation string (Calculate 15+5), replace equation string with evaluation answer (20), push evaluated equation string to display history (15+5=20)
//          - All Clear click: Reset equation string to 0 (0)

//      - Numbers on Either Side of Modulo Operator (15%6)
//          - Digit click: Append digit value to equation string (15%69)
//          - Basic Operator OR Modulo Operator click: Evaluate equation string(*4-a) (Calculate 15%6), replace equation string with with evaluation answer and clicked operator appended (3+), push evaluated equation string to display history
//          - Evaluator click: Evaluate equation string (15%6), replace equation string with evaluation answer (3), push evaluated equation string to display history (15%6=3)
//          - All Clear click: Reset equation string to 0 (0)

// * Note: Modulo (%) does different operations depending on the context of the equation string. See examples below.
//          *1 One number with trailing modulo: Evaluates to the decimal value of the number as a percent (15%=0.15)
//          *2 Numbers on either side of modulo: Evaluates to the modulo of the equation (15%4=3)
//          *3 Full equation string with trailing modulo on first number: Evaluate equation using decimal value of first number's percentage (60%+15=15.6)
