const express = require("express");
const app = express();

const port = 5000;

app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

// this is the function the will do all the calculations on the incoming data
const equation = require('./modules/equation');

const pastEquations = [];

// ENDPOINTS --------------------------------------------------
app.post('/calculate', (req, res) => {

    let { calculation } = req.body;

    let result = equation(calculation);
    
    pastEquations.push({
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
// ENDPOINTS --------------------------------------------------

app.listen(port, (err) => {
	if (err) {
		console.log(err);
	}
	console.log("App hosted on port:", port);
});
