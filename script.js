function getBtnCategory(btn) {
    const currentEquation = document.getElementById("main-display");

    if (btn.textContent === "=") {
        evaluateCurrentEquation(currentEquation);
    } else if (btn.classList.contains("digit-btn") || btn.classList.contains("operator-btn")) {
        updateCurrentEquation(currentEquation, btn);
        console.log("clicked digit or operator");
    }
}

function updateCurrentEquation(currentEquation, btn) {
    if (currentEquation.textContent === "0" && btn.classList.contains("digit-btn")) {
        currentEquation.textContent = btn.textContent;
    } else if (currentEquation.textContent !== "0" && btn.classList.contains("digit-btn")) {
        currentEquation.textContent += btn.textContent;
    }
}

function evaluateCurrentEquation(currentEquation) {

}

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".keypad-btn").forEach((btn) => {
        btn.addEventListener("click", function (event) {
            getBtnCategory(event.target);
        });
    });
});

// Note: % is a hybrid operator, meaning it can do two different operations depending on the context of the equation in which it is used.
// A number with % at the end will convert that percentage value to its decimal value.
//      For example, hitting '=' after entering '34%' will return '0.34'
// An equation with values on either side of % will calculate the modulo value
//      For example, hitting '=' after entering '10%4' will return '2'

// PRE-INTERACTION - Initial load of page OR after AC is clicked
// 1. Set equation variable to 0
// 1. Calc displays 0 in main display
// 3. Set history display variable to empty
// 4. Wait for FIRST INTERACTION

// FIRST INTERACTION - First user interaction after initial load or after AC is clicked
// 1. User clicks a button
// 2. Calc identifies the button category: Digit, Operator, or Function
// 3. a. If button category is Digit:
//          i. Replace equation variable with corresponding digit value
//          ii. Update display with equation variable value
//          iii. Go to NEXT INTERACTION
//    b. If button category is Operator:
//          i. If button is not =:
//              - Append operator to equation variable
//              - Update display with equation variable value
//              - Go to NEXT INTERACTION
//          ii. If button is =:
//              - Go to PRE-INTERACTION
//    c. If button category is Function:
//          i. If button clicked is AC:
//              - Go to PRE-INTERACTION
//          ii. If button clicked is +/-:
//              - Go to PRE-INTERACTION
//          iii. If button clicked is %:
//              - Append operator to equation variable
//              - Go to NEXT INTERACTION

// NEXT INTERACTION
// 1. User clicks a button
// 2. Calc identifies the button category: Digit, Operator, of Function
// 3. a. If button category is Digit:
//          i. Append digit value to equation variable
//          ii. Update display with equation variable value
//          iii. Go to NEXT INTERACTION
//    b. If button category is Operator:
//          i. If button is not =:
//              - If last character of equation variable is an operator:
//                  ~ Replace it with this operator
//                  ~ Update display with equation variable value
//                  ~ Go to NEXT INTERACTION
//              - If last character of equation variable is not an operator:
//                  ~ If there is another operator in the equation variable already:
//                      * Evaluate the equation
//                      * The result becomes the new equation variable
//                      * Append this operator to the new equation variable
//                      * Update display with the new equation variable
//                      * Update history display with the last evaluation
//                      * Go to NEXT INTERACTION
//                  ~ Append operator to equation variable
//                  ~ Update display with equation variable value
//                  ~ Go to NEXT INTERACTION
//          ii. If button is =:
//              - If there is at least one instance of number values separated by an operator:
                    
