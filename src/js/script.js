const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button"); // Select all buttons
const historyField = document.getElementById("history");
const historyRecords = document.getElementById("hst_records");
const toggleHistoryButton = document.getElementById("toggle-history");
const specialChars = ["%", "*", "/", "-", "+", "="];
let output = "";

// Load history from localStorage
// function loadHistory() {
//   const history = JSON.parse(localStorage.getItem("calcHistory")) || [];
//   history.forEach(addToHistoryDisplay);
// };

// Load history from localStorage
function loadHistory() {
  const history = JSON.parse(localStorage.getItem("calcHistory")) || [];
  for (let i = history.length - 1; i >= 0; i--) {
    addToHistoryDisplay(history[i]);
  }
}

// Load history on page load
document.addEventListener("DOMContentLoaded", loadHistory);

// Show/Hide history functionality
toggleHistoryButton.addEventListener("click", () => {
  const isHidden = historyField.style.display === "none";
  historyField.style.display = isHidden ? "block" : "none";
  toggleHistoryButton.textContent = isHidden ? "Hide History" : "Show History";
});

// Example function to add a new calculation to history
function addCalculationToHistory(calculation) {
  const history = JSON.parse(localStorage.getItem("calcHistory")) || [];
  history.push(calculation);
  localStorage.setItem("calcHistory", JSON.stringify(history));
  addToHistoryDisplay(calculation);
}

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
function addToHistory(example) {
  const history = JSON.parse(localStorage.getItem("calcHistory")) || [];
  history.push(example);
  localStorage.setItem("calcHistory", JSON.stringify(history));
  addToHistoryDisplay(example);
};

// Add a new history item to the display
function addToHistoryDisplay(item) {
  const historyItem = document.createElement("div");
  historyItem.textContent = item;
  historyRecords.prepend(historyItem); // Prepend the new item to the top
}

// function addDeleteHistoryButton() {
//   const delHistButton = document.createElement("button");
//   delHistButton.textContent = "Delete history";

// }
