const express = require("express");
const app = express();

const port = 5000;

// this is the function the will do all the calculations on the incoming data
const equation = require('./modules/equation');

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

app.use(express.static(__dirname + "/public"));

app.listen(port, (err) => {
	if (err) {
		console.log(err);
	}
	console.log("App hosted on port:", port);
});
