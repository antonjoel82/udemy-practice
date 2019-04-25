/* Libraries */
const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");

/* Helper files */
const constants = require("./server-constants");

const app = express();
app.listen(constants.PORT, () => {
	console.log(`App is up and running on Port ${constants.PORT}`);
});

const db = constants.database;

//Middleware
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get("/", (req, res) => {
	res.json(db.users);
})

app.post("/signin", (req, res) => {
	console.log("Sign-in request received.")

	// // Load hash from your password DB.
	// bcrypt.compare("bacon", hash, function(err, res) {
	// 	// res == true
	// });

	// bcrypt.compare("veggies", hash, function(err, res) {
	// 	// res = false
	// });

	if (req.body.email === db.users[0].email 
			&& req.body.password === db.users[0].password) {
				res.json("Success!");
	} else {
		res.status(400).json("Sign-in failed...");
	}
	
})

const createUserId = () => {
	return String(Math.ceil(Math.random() * 1000));
}

const createUser = (userInfo) => {
	userInfo.id = createUserId();
	userInfo.entries = 0;
	userInfo.joined = new Date();

	bcrypt.hash(userInfo.password, null, null, function(err, hash) {
		if (err) {
			console.log(err);
		}
		
		// Store hash in your password DB.
		userInfo.password = hash;
	})

	console.log(`Before return`, userInfo);
	return userInfo;
}

app.post("/register", (req, res) => {
	//Create new user
	const userInfo = req.body;

	db.users.push(createUser(userInfo));

	// console.log(db);

	res.json(db.users[db.users.length - 1]);
});

app.get("/profile/:userId", (req, res) => {
	console.log(req.params);
	const id = req.params.userId;
	let userToFind = null;
	db.users.some((user) => {
		if (user.id === id) {
			userToFind = user;
			return true;
		} else {
			return false;
		}
	})

	if (userToFind) {
		res.json(userToFind);
	} else {
		res.status(404).send("User not found.")
	}
	//Retrieve user info
});

app.put("/image", (req, res) => {
	const id = req.body.id;
	let userToFind = null;

	//Update user img count, rank
	db.users.forEach((user) => {
		if (user.id === id) {
			userToFind = user;
			return res.json(++userToFind.entries);
		}
	})

	if (!userToFind) {
		res.status(404).send("User not found.")
	}
});