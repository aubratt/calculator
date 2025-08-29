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
