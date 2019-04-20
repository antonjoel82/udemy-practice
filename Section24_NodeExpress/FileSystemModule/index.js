const fs = require("fs");

fs.readFile(`./HelloWorld.txt`, (err, data) => {
	if (err) {
		console.log("Read Error!");
		return;
	}
	console.log(data.toString());
});

// fs.writeFile(`./HelloWorld.txt`, "Test write 9.", (err) => {
// 	if (err) {
// 		console.log("Write Error!");
// 	}
// })

// fs.appendFile("./hell.txt", "\nMy name is Jephph!!!", (err) => {
// 	if (err) {
// 		console.log("Append Error!");
// 	}
// });

// fs.unlink("./hell.txt", (err) => {
// 	if (err) {
// 		console.log("Deletion error!")
// 	}
// })
