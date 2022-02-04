$(main)

// get input on click
// display history on DOM
// set input field with buttons

function main() {
    $('#calculatorForm').on('submit', handleInput);
}

// send the incoming input string to the server
function handleInput(e) {
    e.preventDefault();

    let inputString = $('#calculatorInput').val();

    // check the string for the correct format
    if (checkString(inputString) === false) return;

    let options = {
        method: 'POST',
        url: '/calculate',
        data: {
            calculation: inputString,
        }
    }

    $.ajax(options)
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        })
}

// get the calculator history from the server
function getCalculatorHistory() {



}

// HELPER FUNCTIONS -------------------------------------------
function checkString(input) {
    let numbers = ['0' , '1' , '2' , '3' , '4' , '5' , '6' , '7' , '8' , '9' ];

    // check that the last number of the string is a number
    if (numbers.includes(input[input.length - 1])) return false;

    // check that the first number of the string is a number
    if (numbers.includes(input[0])) return false;

    return true;
}