var h3 = document.querySelector("h3");
var col1 = document.querySelector(".color1");
var col2 = document.querySelector(".color2");
var col3 = document.querySelector(".color3");
var bg = document.getElementById("gradient");

function updateGradient() {
	bg.style.background = 
		"linear-gradient(to right, "
		+ col1.value
		+ ", " + col2.value
		+ ", " + col3.value
		+ ")";

	h3.textContent = bg.style.background + ";";
	h3.style.visibility = "visible";
}

col1.addEventListener("input", updateGradient);
col2.addEventListener("input", updateGradient);
col3.addEventListener("input", updateGradient);