function equation(string) {
    console.log(string);

    let numbers = ['0' , '1' , '2' , '3' , '4' , '5' , '6' , '7' , '8' , '9', '.' ];
    let operators = ['*','/','+','-'];

    // separate the string into an array
    let equationString = '';

    // this loop adds commas in the right spot so we can split the string afterwords
    for (let i = 0; i < string.length; i++) {
        let char = string[i];

        if (numbers.includes(char)) {
            equationString += char;
        } else {
            equationString += `,${char},`;
        }
    }

    // the string is split into numbers and operators
    let equationArray = equationString.split(',');
    
    // now we loop through the numbers and operators and change the numbers from strings to number types
    for (let i = 0; i < equationArray.length; i++) {
        let numberString = equationArray[i];
        
        if (operators.includes(numberString)) {
            continue
        }
        
        equationArray[i] = Number(numberString);
    }

    console.log(equationArray);

    let result = multiply(equationArray);

    console.log(result);

    // this must return the final answer after all the recursive functions run
    return result;
}

// RECURSIVE FUNCTIONS -------------------------------------------
function add(array) {
}

function subtract(array) {
}

function multiply(array) {

    let equationArray = [];

    for (let i = 0; i < array.length; i++) {
        let number = array[i];
        let operator = array[i - 1];

        if (operator && operator === '*') {
            equationArray.pop();
            let numOne = equationArray.pop();

            equationArray.push(number * numOne);
        } else {
            equationArray.push(number);
        }
    }

    return equationArray;
}

function divide(array) {
}
// RECURSIVE FUNCTIONS -------------------------------------------

module.exports = equation;