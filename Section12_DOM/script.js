var button = document.getElementById("enter");
var input = document.getElementById("userinput");
var ul = document.querySelector("ul");

function inputLength() {
	return input.value.length;
}

/** MY CODE **/
function crossOffItem() {
	this.classList.toggle("done");
}

function deleteItem() {
	var listElement = this.parentNode;
	if (!listElement) {
		console.error("listElement does not exist while attempting to delete.");
		return;
	}

	listElement.parentNode.removeChild(listElement);
}

function addDeleteEvent(button) {
	if (!button) {
		console.error("button is undefined while trying to create event.");
		return;
	}

	button.addEventListener("click", deleteItem);
}

function addCrossOffEvent(li) {
	li.addEventListener("click", crossOffItem);
}

/** end my code **/

function createListElement() {
	var li = document.createElement("li");
	var del = document.createElement("button");
	del.appendChild(document.createTextNode("X"));
	del.className = "btn-delete";
	addDeleteEvent(del);

	li.appendChild(del);
	li.appendChild(document.createTextNode(input.value));
	addCrossOffEvent(li);
	ul.appendChild(li);
	input.value = "";
}

/** MY CODE **/
//Add Delete listener to all existing buttons
document.querySelectorAll("button.btn-delete").forEach(function(item) {
	addDeleteEvent(item);
});

//Add cross off listener to existing list items;
document.querySelectorAll("li").forEach(function(item) {
	addCrossOffEvent(item);
});

/** END MY CODE **/

function addListAfterClick() {
	if (inputLength() > 0) {
		createListElement();
	}
}

function addListAfterKeypress(event) {
	if (inputLength() > 0 && event.keyCode === 13) {
		createListElement();
	}
}

button.addEventListener("click", addListAfterClick);
input.addEventListener("keypress", addListAfterKeypress);