const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button"); // Select all buttons
const historyField = document.getElementById("history");
const historyRecords = document.getElementById("hst_records");
const toggleHistoryButton = document.getElementById("toggle-history");
const specialChars = ["%", "*", "/", "-", "+", "="];
let output = "";

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

// Save calculation to history with a unique ID
function addToHistory(example) {
  const history = JSON.parse(localStorage.getItem("calcHistory")) || [];
  
  // Create unique ID for each calculation
  const uniqueId = new Date().getTime();  // Use time mark as unique ID
  
  // Add calculation with ID
  history.push({ id: uniqueId, calculation: example });
  
  localStorage.setItem("calcHistory", JSON.stringify(history));
  addToHistoryDisplay(example, uniqueId);
}

// Add a new history item to the display with unique ID
function addToHistoryDisplay(item, uniqueId) {
  const historyItem = document.createElement("div");
  historyItem.classList.add("history-item");

  // Create text element with calculation
  const itemText = document.createElement("span");
  itemText.textContent = item;
  historyItem.appendChild(itemText);

  // Create X button to delete
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "X";
  deleteButton.classList.add("delete-button");

  // Create handler for X buttons
  deleteButton.addEventListener("click", () => {
    removeHistoryItem(uniqueId); // Delete element after click using unique ID
  });

  historyItem.appendChild(deleteButton); // Add delete button to the element
  historyRecords.prepend(historyItem);  // Add the element to the beginning of the list
}

// Delete all history from localStorage and DOM
function clearHistory() {
  localStorage.removeItem("calcHistory");
  historyRecords.innerHTML = "";
}

// Handler for Delete history button
document.querySelector(".delete-history").addEventListener("click", clearHistory);

// Remove history item from localStorage and DOM by unique ID
function removeHistoryItem(uniqueId) {
  const history = JSON.parse(localStorage.getItem("calcHistory")) || [];
  // Delete the element from array by ID
  const updatedHistory = history.filter(item => item.id !== uniqueId);

  localStorage.setItem("calcHistory", JSON.stringify(updatedHistory));
  reloadHistory();
}

// Reload the history from localStorage and display it
function reloadHistory() {
  // Clear all text in DOM
  historyRecords.innerHTML = "";

  const history = JSON.parse(localStorage.getItem("calcHistory")) || [];

  // Add every calculation
  history.forEach(item => {
    addToHistoryDisplay(item.calculation, item.id);
  });
}

// Load history on page load
document.addEventListener("DOMContentLoaded", reloadHistory);
