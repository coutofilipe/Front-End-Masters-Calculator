let runningTotal = 0;
// Variable that waits for the user input and the stores it;
let buffer = "0";
// This variable is for keeping track o the opertation selected by the user before he presses "=";
let previousOperator = null;

const screen = document.querySelector('.screen');

// bind eventListener to the HTML buttons:
document.querySelector('.calc-buttons')
    // Once a click event occurs call the function buttonClick
    .addEventListener('click', function (event) {
        // buttonClick is defined below and gets the event.target(which is the button).innerText(which is the actual number or symbol the user selected)
        buttonClick(event.target.innerText);
    });

// this will control the flow of the code; Either a Symbol was pressed OR a Number
function buttonClick(value) {
    if (isNaN(parseInt(value))) {
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
    rerender();
}

function handleSymbol(value) {
    switch (value) {
        case 'C':
            buffer = "0"
            runningTotal = 0;
            previousOperator = null;
            break;

        case "=":
            if (previousOperator === null) {
                return;
            }
            // flushOperation commits the previous operator;
            flushOperation(parseInt(buffer));
            previousOperator = null;
            // turns runningTotal into a string by concatenation with "";
            buffer = "" + runningTotal;
            runningTotal = 0;
            break;

        case '←':
            if(buffer.length === 1) {
                buffer = "0";
            } else {
                buffer = buffer.substring(0, buffer.length - 1);
            }
    
        default:
            handleMath(value);
            break;
    }

};

function handleNumber(value) {
    if (buffer === "0") {
        buffer = value;
    } else {
        buffer += value;
    }
};
function handleMath(value) {
    const intBuffer = parseInt(buffer);
    if (runningTotal === 0) {
        runningTotal = intBuffer
    } else {
        flushOperation(intBuffer);
    }

    previousOperator = value;

    buffer = "0";
};

function flushOperation (intBuffer) {
    if(previousOperator === "+") {
        runningTotal += intBuffer;
    } else if (previousOperator === "-") {
        runningTotal -= intBuffer;
    } else if (previousOperator === "×") {
        runningTotal *= intBuffer;
    } else {
        runningTotal /= intBuffer;
    }
}

function rerender() {
    screen.innerText = buffer;
};