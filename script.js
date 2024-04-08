"use strict";

// buttons
const buttons = document.querySelectorAll('.button');

// display-input
const displayInput = document.querySelector('.input');

// display-output
const displayOutput = document.querySelector('.output');

// empty string
let input = "";

// to make buttons work
for (let key of buttons) {
    const value = key.dataset.key;

    key.addEventListener('click', (event) => {
        if (value === "clear") {
            input = "";
            displayInput.innerHTML = "";
            displayOutput.innerHTML = "";
        } else if (value === "delete") {
            input = input.slice(0, -1);
            displayInput.innerHTML = cleanInput(input);
        } else if (value === "=") {
            let result = eval(percent(input));
            displayOutput.innerHTML = cleanOutput(result);
        } else {
            if (validateInput(value)) {
                input += value;
                displayInput.innerHTML = cleanInput(input);
            }
        }
    })
}

// displaying custom values for the operators
function cleanInput(input) {
    let inputArray = input.split("");

    for (let i = 0; i < inputArray.length; i++) {
        if (inputArray[i] === "/") {
            inputArray[i] = `<span class="display-operator">&divide;</span>`
        } else if (inputArray[i] === "*") {
            inputArray[i] = `<span class="display-operator">&times;</span>`
        } else if (inputArray[i] === "-") {
            inputArray[i] = `<span class="display-operator">-</span> `
        } else if (inputArray[i] === "+") {
            inputArray[i] = `<span class="display-operator">+</span>`
        }
    }

    return inputArray.join("");
}


// displaying commas in the output result
function cleanOutput(output) {
    let outputString = output.toString();

    // 123.45
    let decimal = outputString.split(".")[1]; // gets 45
    outputString = outputString.split(".")[0]; // gets 123

    let outputArray = outputString.split(""); // converts into an array

    if (outputArray.length > 3) {
        for (let i = outputArray.length - 3; i > 0; i -= 3) {
            outputArray.splice(i, 0, ",");
        }
    }

    if (decimal) {
        outputArray.push(".");
        outputArray.push(decimal);
    }

    return outputArray.join(""); // converts it back to string
}


// validation of the input operators to make them not repeat
function validateInput(value) {
    let lastInput = input.slice(-1);

    let operators = ["+", "-", "*", "/"];

    if (value === "." && lastInput === ".") {
        return false; // two consecutive decimals are not allowed
    }

    if (input.length === 0 && (operators.includes(value) || value === ".")) {
        return false; // an operator or decimal is not allowed at the start
    }

    if (operators.includes(value) && operators.includes(lastInput)) {
        return false; // two consecutive operators are not allowed
    }

    return true;
}


// to make the percentage work
function percent(input) {
    let inputArray = input.split("");

    for (let i = 0; i < inputArray.length; i++) {
        if (inputArray[i] === "%") {
            inputArray[i] = "/100";
        }
    }

    return inputArray.join("");
}
