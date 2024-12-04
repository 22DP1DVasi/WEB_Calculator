const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");
const historyField = document.getElementById("history");
const specialChars = ["%", "*", "/", "-", "+", "="];
let output = "";

// Load history from localStorage
const loadHistory = () => {
  const history = JSON.parse(localStorage.getItem("calcHistory")) || [];
  history.forEach(addToHistoryDisplay);
};

// Load history from localStorage when the page is opened
document.addEventListener("DOMContentLoaded", loadHistory);

// Function for calculation depending on buttons
const calculate = (btnValue) => {
  display.focus();
  if (btnValue === "=" && output !== "") {
    try {
      // If there is '%' in calculation, replace it with /100
      const result = eval(output.replace("%", "/100"));
      const example = `${output} = ${result}`;
      addToHistory(example);    // add calculation to history
      output = result.toString();
    } catch (error) {
      alert("Error in expression!");
    }
  } else if (btnValue === "AC") {
    output = "";
  } else if (btnValue === "DEL") {
    output = output.toString().slice(0, -1);
  } else {
    // If output is empty и and special key is pressed, do nothing
    if (output === "" && specialChars.includes(btnValue)) return;
    output += btnValue;
  }
  display.value = output;
};

// Add event listener for buttons
buttons.forEach((button) => {
  button.addEventListener("click", (e) => calculate(e.target.dataset.value));
});

// Save equation to history
const addToHistory = (example) => {
  // Get existing history from localStorage
  const history = JSON.parse(localStorage.getItem("calcHistory")) || [];
  // add new calculation
  history.push(example);
  // save updated history to localStorage
  localStorage.setItem("calcHistory", JSON.stringify(history));
  // update history field
  addToHistoryDisplay(example);
};


// show calculations in field
const addToHistoryDisplay = (example) => {
  const div = document.createElement("div");
  div.textContent = example;
  historyField.appendChild(div);
};
