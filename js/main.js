const task_input = document.querySelector("input");
const date_input = document.querySelector(".schedule-date"); // added date input
const add_btn = document.querySelector(".add-task-button");
const todos_list_body = document.querySelector(".todos-list-body");
const alert_message = document.querySelector(".alert-message");
const delete_all_btn = document.querySelector(".delete-all-btn");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

window.addEventListener("DOMContentLoaded", () => {
  showAllTodos();
  if (!todos.length) {
    displayTodos([]);
  }
});

//get random unique id
function getRandomId() {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}

function addToDo(task_input, date_input) {
  let task = {
    id: getRandomId(),
    task: task_input.value,
    dueDate: date_input.value, // added due date
    completed: false,
    status: "pending", // adding initial status as 'pending'
  };
  todos.push(task);
}

task_input.addEventListener("keyup", (e) => {
  if (e.keyCode === 13 && task_input.value.length > 0) {
    addToDo(task_input, date_input); // Added date input
    saveToLocalStorage();
    task_input.value = "";
    showAllTodos();
  }
});

add_btn.addEventListener("click", () => {
  if (task_input.value === "") {
    showAlertMessage("Please enter a task", "error");
  } else {
    addToDo(task_input, date_input); // Added date input
    saveToLocalStorage();
    showAllTodos();
    task_input.value = "";
    date_input.value = ""; // Added date input
    showAlertMessage("Task added successfully", "success");
  }
});

delete_all_btn.addEventListener("click", clearAllTodos);

//show all todos
function showAllTodos() {
  todos_list_body.innerHTML = "";
  if (todos.length === 0) {
    todos_list_body.innerHTML = `<tr><td colspan="5" class="text-center">No task found</td></tr>`;
    return;
  }