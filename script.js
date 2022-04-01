// Dark Mode
function myFunction() {
	var element = document.body;
	var element2 = document.getElementById("calculator-wrapper");
	var element3 = document.getElementById("number-screen");
	const all = document.getElementsByClassName("btn");
	[...all].forEach((element) => {
		// element.style.background = "#ddd";
		element.classList.toggle("btn-dark-mode");
	});
	element.classList.toggle("body-dark-mode");
	element2.classList.toggle("wrapper-dark-mode");
	element3.classList.toggle("input-dark-mode");
}

// Calculator
const calculator = document.querySelector(".calculator-wrapper");
const keys = calculator.querySelector(".buttons");
const display = document.querySelector(".number-screen");
let prevNumber = "";
let currentNumber = "0";
let calculationOperation = "";

// Menampilkan Angka dan operator ke Screen
keys.addEventListener("click", (e) => {
	if (e.target.matches(".btn")) {
		const key = e.target;
		const action = key.dataset.action;
		const keyContent = key.textContent;

		if (action === "data-plus" || action === "data-minus" || action === "data-times" || action === "data-divided") {
			updateScreen(keyContent);
		} else if (!action) {
			inputNumber(keyContent);
			updateScreen(currentNumber);
			// console.log(currentNumber);
		}
	}
});

// Menginput operator ke variabel
keys.addEventListener("click", (e) => {
	if (e.target.matches(".button-math")) {
		// console.log(e.target.textContent);
		inputOperator(e.target.textContent);
	}
});

// Mengkalkulasi
keys.addEventListener("click", (e) => {
	if (e.target.matches(".button-result")) {
		calculate();
		updateScreen(currentNumber);
	}
});

// Menghapus seluruhnya
keys.addEventListener("click", (e) => {
	if (e.target.matches(".button-delete-all")) {
		// console.log("ini AC");
		clearAll();
	}
});

// Menghapus data terakhir
keys.addEventListener("click", (e) => {
	if (e.target.matches(".button-delete")) {
		deleteLastNumber();
	}
});

// Menambahkan decimal
keys.addEventListener("click", (e) => {
	if (e.target.matches(".button-decimal")) {
		inputDecimal(e.target.textContent);
		updateScreen(currentNumber);
	}
});

// util
const inputNumber = (number) => {
	if (currentNumber === "0") {
		currentNumber = number;
	} else {
		currentNumber += number;
	}
};

const updateScreen = (number) => {
	display.value = number;
};

const inputOperator = (operator) => {
	if (calculationOperation === "") {
		prevNumber = currentNumber;
	}
	calculationOperation = operator;
	currentNumber = "";
};

const calculate = () => {
	let result = "";

	switch (calculationOperation) {
		case "+":
			result = parseFloat(prevNumber) + parseFloat(currentNumber);
			break;
		case "-":
			result = parseFloat(prevNumber) - parseFloat(currentNumber);
			break;
		case "x":
			result = parseFloat(prevNumber) * parseFloat(currentNumber);
			break;
		case "/":
			result = parseFloat(prevNumber) / parseFloat(currentNumber);
			break;
	}
	display.value = "";
	currentNumber = result;
	calculationOperation = "";
};

const deleteLastNumber = () => {
	if (currentNumber.length < 2) {
		currentNumber = "0";
		updateScreen(currentNumber);
	} else {
		let a = currentNumber.replace(/.$/, "");
		currentNumber = a;
		updateScreen(currentNumber);
	}
	// console.log(currentNumber);
};

const clearAll = () => {
	prevNumber = "";
	currentNumber = "0";
	// console.log(currentNumber);
	calculationOperation = "";
	updateScreen(currentNumber);
};

const inputDecimal = (dot) => {
	if (currentNumber.includes(".")) {
		return;
	}
	currentNumber += dot;
};
