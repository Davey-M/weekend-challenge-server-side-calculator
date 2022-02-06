$(main)

// get input on click
// display history on DOM
// set input field with buttons

function main() {
    $('#calculatorForm').on('submit', handleInput);

    $('.calcButton').on('click', handleButtons);

    $('#calculatorInput').on('keydown', handleInputTyping);

    $('#inputClearer').on('click', clearInput);

    getCalculatorHistory();
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
            getCalculatorHistory();
        })
        .catch(error => {
            console.error(error);
        })

    e.target.reset();
}

function handleButtons(e) {
    e.preventDefault();

    let calcInputText = $('#calculatorInput').val();
    $('#calculatorInput').val(calcInputText + $(this).data().value);
}

function handleInputTyping(e) {
    e.preventDefault();
    
    let goodKeys = [ '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '+', '-', '*', '/', ];
    
    let calcInputText = $('#calculatorInput').val();
    if (goodKeys.includes(e.key)) {
        $('#calculatorInput').val(calcInputText + e.key);
    }
    
    if (e.key === 'Enter') {
        $('#calculatorForm').submit();
    }
    
    if (e.key === 'Backspace') {
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

function renderCalcHistory(history) {

    console.log(history.equations);

    $('#calcResults').text(history.equations[0].result);

    $('#resultContainer').empty();

    history.equations.forEach((item, index) => {
        $('#resultContainer').append(`
            <li class="result" data-index="${index}" ><p>${item.equation} = <b>${item.result}</b></p></li>
        `)
    });
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