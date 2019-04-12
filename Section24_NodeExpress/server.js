const express = require("express");
const bodyParser = require("body-parser");

/**
 * Express server example
 */
const app = express();

//Middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get("/:id", (req, res) => {
	// console.log(req.query);
	// console.log(req.body);
	// console.log(req.headers);
	console.log(req.params);

	res.status(200).send("Success");
});

app.listen(3000);
