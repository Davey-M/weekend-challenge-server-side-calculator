$(main)

// get input on click
// display history on DOM
// set input field with buttons

let equationHistory = [];

let lastResult = 0;

// setup click listeners for buttons on DOM
function main() {
    $('#calculatorForm').on('submit', handleInput);

    $('.calcButton').on('click', handleButtons);

    $('#calculatorInput').on('keydown', handleInputTyping);

    $('#inputClearer').on('click', clearInput);

    $('#resultContainer').on('click', '.result', reloadEquation);

    $('#clearHistoryButton').on('click', clearHistory);

    getCalculatorHistory();
}

// send the incoming input string to the server
function handleInput(e) {
    e.preventDefault();

    let inputString = $('#calculatorInput').val();

    // do not send blank strings to server
    if (inputString === '') {
        return;
    }

    // check the string for the correct format
    if (checkString(inputString) === false) return;

    // post method is used because we are sending a calculation on the server
    let options = {
        method: 'POST',
        url: '/calculate',
        data: {
            calculation: inputString,
        }
    }

    $.ajax(options)
        .then(response => {
            // after data is sent to server we get the new state of the app
            console.log(response);
            getCalculatorHistory();
        })
        .catch(error => {
            console.error(error);
        })

    e.target.reset();
}

function handleButtons(e) {
    e.preventDefault();

    let operators = [ '+', '-', '*', '/', ]
    
    // data allows us to use one function for all the button handling
    let buttonVal = $(this).data().value;

    // sanitize inputs if an operator button is clicked
    if (operators.includes(buttonVal) && $('#calculatorInput').val() === '') {
        $('#calculatorInput').val(lastResult + buttonVal);

        return;
    }

    // each button holds their value in the their data tag
    let calcInputText = $('#calculatorInput').val();
    $('#calculatorInput').val(calcInputText + buttonVal);
}

function handleInputTyping(e) {
    e.preventDefault();
    
    // used for validation so the input can only accept the proper inputs
    let goodKeys = [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '+', '-', '*', '/', ];
    let operators = [ '+', '-', '*', '/', ]

    // get the current calculation from the input field
    let calcInputText = $('#calculatorInput').val();

    // sanitizing inputs:
    if (operators.includes(e.key) && $('#calculatorInput').val() === '') {
        // adds the last result if you type an operator before anything else
        $('#calculatorInput').val(lastResult + e.key);
    } else if (goodKeys.includes(e.key)) {
        $('#calculatorInput').val(calcInputText + e.key);
    } else if (e.key === 'Enter') {
        $('#calculatorForm').submit();
    } else if (e.key === 'Backspace') {
        $('#calculatorInput').val(calcInputText.substring(0, calcInputText.length - 1));
    }
}

function clearInput(e) {
    e.preventDefault();

    $('#calculatorInput').val('');
}

// get the calculator history from the server
function getCalculatorHistory() {

    // get method is used because we are getting the state of the app from the server
    let options = {
        method: 'GET',
        url: '/equations'
    }

    // results are rendered on the page after being collected from the server
    $.ajax(options)
        .then(response => {
            renderCalcHistory(response);
        })
        .catch(error => {
            console.error(error);
        })
}

function clearHistory() {

    // delete method is used because we are clearing the state of the application on the server
    let options = {
        method: 'DELETE',
        url: '/equations',
    }

    // handling response
    $.ajax(options)
        .then(response => {
            console.log(response);
            getCalculatorHistory();
        })
        .catch(error => {
            console.error(error);
        })

}

function renderCalcHistory(history) {

    // console.log(history.equations); // this is a test (can be removed)

    // this is the data coming back from the server
    equationHistory = history.equations;

    // set the state of the last result
    if (history.equations[0]) {
        $('#calcResults').text(history.equations[0].result);
        lastResult = history.equations[0].result;
    }
    else {
        $('#calcResults').text('0');
        lastResult = 0;
    }
    
    $('#resultContainer').empty();
    
    // forEach is used for easy access to the item and its index
    history.equations.forEach((item, index) => {
        $('#resultContainer').append(`
            <li class="result" data-index="${index}" ><p>${item.equation} = <b>${item.result}</b></p></li>
        `)
    });
}

function reloadEquation() {
    let index = $(this).data().index;
    
    // console.log(index); // just a test (can be removed)
    
    // set the state of the last result
    lastResult = equationHistory[index].result;

    $('#calcResults').text(equationHistory[index].result);
    
    $('#calculatorInput').val(equationHistory[index].equation);
}

// HELPER FUNCTIONS -------------------------------------------
function checkString(input) {
    let numbers = ['0' , '1' , '2' , '3' , '4' , '5' , '6' , '7' , '8' , '9', '.' ];
    
    // check that the last number of the string is a number
    if (!numbers.includes(input[input.length - 1])) return false;
    
    // check that the first number of the string is a number
    if (!numbers.includes(input[0])) return false;
    
    return true;
}
// HELPER FUNCTIONS -------------------------------------------