const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button"); // Select all buttons
const historyField = document.getElementById("history");
const toggleHistoryButton = document.getElementById("toggle-history");
const specialChars = ["%", "*", "/", "-", "+", "="];
let output = "";

// Load history from localStorage
const loadHistory = () => {
  const history = JSON.parse(localStorage.getItem("calcHistory")) || [];
  history.forEach(addToHistoryDisplay);
};

// Load history on page load
document.addEventListener("DOMContentLoaded", loadHistory);

// Show/Hide history functionality
toggleHistoryButton.addEventListener("click", () => {
  const isHidden = historyField.style.display === "none";
  historyField.style.display = isHidden ? "block" : "none";
  toggleHistoryButton.textContent = isHidden ? "Hide History" : "Show History";
});

// Calculator logic
const calculate = (btnValue) => {
  display.focus();
  if (btnValue === "=" && output !== "") {
    try {
      const result = eval(output.replace("%", "/100"));
      const example = `${output} = ${result}`;
      addToHistory(example);
      output = result.toString();
    } catch (error) {
      alert("Invalid Expression");
    }
  } else if (btnValue === "AC") {
    output = "";
  } else if (btnValue === "DEL") {
    output = output.toString().slice(0, -1);
  } else {
    if (output === "" && specialChars.includes(btnValue)) return;
    output += btnValue;
  }
  display.value = output;
};

// Add event listeners to all buttons
buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const btnValue = e.target.dataset.value; // Get the data-value attribute
    if (btnValue !== undefined) {
      // Only process buttons with data-value
      calculate(btnValue);
    }
  });
});

// Save calculation to history
const addToHistory = (example) => {
  const history = JSON.parse(localStorage.getItem("calcHistory")) || [];
  history.push(example);
  localStorage.setItem("calcHistory", JSON.stringify(history));
  addToHistoryDisplay(example);
};

// Display history item
const addToHistoryDisplay = (example) => {
  const div = document.createElement("div");
  div.textContent = example;
  historyField.appendChild(div);
};
