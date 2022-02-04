function equation(string) {
    console.log(string);

    let numbers = ['0' , '1' , '2' , '3' , '4' , '5' , '6' , '7' , '8' , '9', '.' ];

    let equationString = '';

    for (let i = 0; i < string.length; i++) {
        let char = string[i];

        if (numbers.includes(char)) {
            equationString += char;
        } else {
            equationString += `,${char},`;
        }
    }

    let equationArray = equationString.split(',');

    console.log(equationArray);

    // this part of the function needs to be re-written
    for (let i = 0; i < equationArray.length; i++) {
        let symbol = equationArray[i];

        let numOne = Number(equationArray[i - 1]);
        let numTwo = Number(equationArray[i + 1]);

        switch (symbol) {
            case '+':
                equationArray[i + 1] = add(numOne, numTwo);
                break;
            default:
                break;
        }
    }

    return;
}

// HELPER FUNCTIONS -------------------------------------------
function add(numOne, numTwo) {
    return numOne + numTwo;
}

function subtract(numOne, numTwo) {
    return numOne - numTwo;
}

function multiply(numOne, numTwo) {
    return numOne * numTwo;
}

function divide(numOne, numTwo) {
    return numOne / numTwo;
}
// HELPER FUNCTIONS -------------------------------------------

module.exports = equation;