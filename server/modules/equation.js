function equation(string) {
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

    let result = multiplyDivide(equationArray)[0];

    // this must return the final answer after all the recursive functions run
    return result;
}

// RECURSIVE FUNCTIONS -------------------------------------------

/*
    The following recursive functions both follow the same pattern

    first they are given an array

    then they create a blank equationArray to hold the results once they have run

    then they loop through the array

        in this loop they check to see if the previous number is an operator

        if it is the operator they are looking for they pull the items from 
        the end of the equationArray and push the result of their equation to the equationArray

    once the loop is finished they send the equationArray to the next operator in line
*/

function addSubtract(array) {

    let equationArray = [];

    for (let i = 0; i < array.length; i++) {
        let number = array[i];
        let operator = array[i - 1];

        if (operator && operator === '+') {
            equationArray.pop();
            let numOne = equationArray.pop();

            equationArray.push(numOne + number);
        } else if (operator && operator === '-') {
            equationArray.pop();
            let numOne = equationArray.pop();

            equationArray.push(numOne - number);
        } else {
            equationArray.push(number);
        }
    }

    let result = equationArray;

    return result;
}

function multiplyDivide(array) {

    let equationArray = [];

    for (let i = 0; i < array.length; i++) {
        let number = array[i];
        let operator = array[i - 1];

        if (operator && operator === '*') {
            equationArray.pop();
            let numOne = equationArray.pop();

            equationArray.push(numOne * number);
        } else if (operator && operator === '/') {
            equationArray.pop();
            let numOne = equationArray.pop();

            equationArray.push(numOne / number);
        } else {
            equationArray.push(number);
        }
    }

    let result = addSubtract(equationArray);

    return result;
}
// RECURSIVE FUNCTIONS -------------------------------------------

module.exports = equation;