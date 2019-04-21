const fs = require("fs");

const open = "(".charCodeAt(0);
const closed = ")".charCodeAt(0);
fs.readFile(`./input.txt`, (err, data) => {
	console.time("solution");
	if (err) {
		console.log("Read Error!");
		return;
	}

	let posOfBasement = -1;
	const finFloor = data.reduce((counter, c) => {
		return c === open
			? ++counter
			: c === closed
				? --counter
				: counter -= 100

		// if (counter < 0 && posOfBasement === -1) {
		// 	posOfBasement = ndx + 1;
		// }
	}, 0)

	console.timeEnd("solution");
	console.log(`Ending floor: ${finFloor}`);
	console.log(`Entered basement on Instruction #${posOfBasement}`);
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
