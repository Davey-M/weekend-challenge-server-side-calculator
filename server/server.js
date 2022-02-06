const express = require("express");
const app = express();

const port = 5000;

app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

// this is the function the will do all the calculations on the incoming data
const equation = require('./modules/equation');

// holds the current state of the application
let pastEquations = [];

// ENDPOINTS --------------------------------------------------
app.post('/calculate', (req, res) => {

    let { calculation } = req.body;

    // do the actual calculations (done in the equation.js file)
    let result = equation(calculation);
    
    // send the calculation that was just done to the state of the application
    pastEquations.unshift({
        equation: calculation,
        result: result,
    })

    res.sendStatus(201);
})

app.get('/equations', (req, res) => {
    res.send({
        equations: pastEquations,
    })
})

app.delete('/equations', (req, res) => {
    // reset the state of the application
    pastEquations = [];

    res.sendStatus(200);
})
// ENDPOINTS --------------------------------------------------

app.listen(process.env.PORT || port, (err) => {
	if (err) {
		console.log(err);
	}
	console.log("App hosted on port:", port);
});
