function updateDisplayOnBtnClick(clickedBtn) {
    const mainDisplay = document.getElementById("main-display");
    const currentMainDisplayText = mainDisplay.textContent;

    mainDisplay.textContent = currentMainDisplayText.concat(clickedBtn.textContent);
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
//          - Basic Operator click: Append operator to equation string (15%+)
//          - Modulo Operator click: Do nothing (15%)
//          - Evaluator click: Evaluate equation string(*1) (Calculate 15/100), replace equation string with evaluation answer (0.15), push evaluated equation string to display history (15%=0.15)
//          - All Clear click: Reset equation string to 0 (0)

//      - Numbers on Either Side of Basic Operator (15+5)
//          - Digit click: Append digit value to equation string (15+51)
//          - Basic Operator OR Modulo Operator click: Evaluate equation string(*4) (Calculate 15+5), replace equation string with evaluation answer and clicked operater appended (20-), push evaluated equation string to display history (15+5=20)
//          - Evaluator click: Evaluate equation string (Calculate 15+5), replace equation string with evaluation answer (20), push evaluated equation string to display history (15+5=20)
//          - All Clear click: Reset equation string to 0 (0)

//      - Numbers on Either Side of Modulo Operator (15%6)
//          - Digit click: Append digit value to equation string (15%69)
//          - Basic Operator:

// * Note: Modulo (%) does different operations depending on the context of the equation string. See examples below.
//          *1 One number with trailing modulo: Evaluates to the decimal value of the number as a percent (15%=0.15)
//          *2 Numbers on either side of modulo: Evaluates to the modulo of the equation (15%4=3)
//          *3 Full equation string with trailing modulo on first number: Evaluate equation using decimal value of first number's percentage (60%+15=15.6)
//          *4 Full equation string with trailing modulo on second number: Evaluate equation using second number's percentage of first number as the second number (60% of 15 is 9, so 15+60%=24)
//              *4-a Allows for modulo to be used as the first operator also (6% of 15 is 0.9, so 15%6%=0.06)
