const helpers = require("./helpers.js");
const http = require("http");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

/**
 * Express server example
 */
const app = express();

//Middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get("/", (req, res) => {
	res.send(helpers.getUser());
});
app.get("/profile", (req, res) => {
	res.send("<h1>Getting the profile with Express!</h1>");
});

app.post("/profile", (req, res) => {
	console.log(req.body);
	res.send(helpers.getUser());
})

/**
 * Serves the gradient directory (js, css, html) to the client.
 * Go to /gradient.html to see the page
 */
app.use(express.static("gradient"));

app.listen(3000);

/**
 * HTTP Server example
 */
// const server = http.createServer((req, res) => {
// 	console.log("Method", req.method);
// 	console.log("URL", req.url);

// 	res.setHeader("Content-Type", "application/json");
// 	res.end(`${JSON.stringify(helpers.getUser())}`);	
// });
// server.listen(3000);
