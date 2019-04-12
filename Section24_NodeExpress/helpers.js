const sayHello = () => {
	console.log("Hello on the server!");
	return "Hello on the client!";
}

const getUser = () => {
	return {
		name: "Joel",
		id: 69,
	}
}

module.exports = {
	sayHello : sayHello,
	getUser
}