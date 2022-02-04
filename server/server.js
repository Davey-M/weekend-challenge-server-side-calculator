const express = require("express");
const app = express();

const port = 5000;

app.use(express.static(__dirname + "/public"));

app.listen(port, (err) => {
	if (err) {
		console.log(err);
	}
	console.log("App hosted on port:", port);
});
