$(main)

// get input on click
// display history on DOM
// set input field with buttons

let equationHistory = [];

let lastResult = 0;

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

    if (inputString === '') {
        return;
    }

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
    
    let buttonVal = $(this).data().value;

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

    let calcInputText = $('#calculatorInput').val();

    if (operators.includes(e.key) && $('#calculatorInput').val() === '') {
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

    let options = {
        method: 'GET',
        url: '/equations'
    }

    $.ajax(options)
        .then(response => {
            renderCalcHistory(response);
        })
        .catch(error => {
            console.error(error);
        })
}

function clearHistory() {

    let options = {
        method: 'DELETE',
        url: '/equations',
    }

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

    console.log(history.equations);

    equationHistory = history.equations;

    if (history.equations[0]) {
        $('#calcResults').text(history.equations[0].result);
        lastResult = history.equations[0].result;
    }
    else {
        $('#calcResults').text('0');
        lastResult = 0;
    }
    
    $('#resultContainer').empty();
    
    history.equations.forEach((item, index) => {
        $('#resultContainer').append(`
            <li class="result" data-index="${index}" ><p>${item.equation} = <b>${item.result}</b></p></li>
        `)
    });
}

function reloadEquation() {
    let index = $(this).data().index;
    
    console.log(index);
    
    lastResult = equationHistory[index].result;

    $('#calcResults').text(equationHistory[index].result);
    
    $('#calculatorInput').val(equationHistory[index].equation);
}

// HELPER FUNCTIONS -------------------------------------------
function checkString(input) {
    let numbers = ['0' , '1' , '2' , '3' , '4' , '5' , '6' , '7' , '8' , '9' ];
    
    // check that the last number of the string is a number
    if (!numbers.includes(input[input.length - 1])) return false;
    
    // check that the first number of the string is a number
    if (!numbers.includes(input[0])) return false;
    
    return true;
}
// HELPER FUNCTIONS -------------------------------------------