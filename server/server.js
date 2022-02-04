const express = require("express");
const app = express();

const port = 5000;

app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

// this is the function the will do all the calculations on the incoming data
const equation = require('./modules/equation');

// ENDPOINTS --------------------------------------------------
app.post('/calculate', (req, res) => {

    let { calculation } = req.body;
    console.log(calculation);

    let result = equation(calculation);
    console.log(result);

    res.sendStatus(201);
})
// ENDPOINTS --------------------------------------------------

app.listen(port, (err) => {
	if (err) {
		console.log(err);
	}
	console.log("App hosted on port:", port);
});
