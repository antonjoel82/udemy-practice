// Complete the below questions using this array:
const array = [
  {
    username: "john",
    team: "red",
    score: 5,
    items: ["ball", "book", "pen"]
  },
  {
    username: "becky",
    team: "blue",
    score: 10,
    items: ["tape", "backpack", "pen"]
  },
  {
    username: "susy",
    team: "red",
    score: 55,
    items: ["ball", "eraser", "pen"]
  },
  {
    username: "tyson",
    team: "green",
    score: 1,
    items: ["book", "pen"]
  },

];

//Create an array using forEach that has all the usernames with a "!" to each of the usernames
const exclArr = [];
array.forEach((obj) => {
  exclArr.push(`${obj.username}!`);
});
console.log("Exclamation", exclArr);


//Create an array using map that has all the usernames with a "? to each of the usernames
const qArr = array.map((obj) => {
  return `${obj.username}?`;
});
console.log("Question", qArr);

//Filter the array to only include users who are on team: red
const redArr = array.filter((obj) => obj.team === "red");
console.log("Filter", redArr);

//Find out the total score of all users using reduce
console.log("Reduce", array.reduce((acc, obj) => acc + Number(obj.score), 0));

// (1), what is the value of i?
// (2), Make this map function pure:
const arrayNum = [1, 2, 4, 5, 8, 9];
const newArray = arrayNum.map((num, i) => {
	return num * 2;
})

//BONUS: create a new list with all user information, but add "!" to the end of each items they own.
