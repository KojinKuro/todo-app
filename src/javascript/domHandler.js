import { clamp } from "./math.js";
import { createTask, getTasks, saveTask } from "./tasks.js";

const addTasksButton = document.querySelector(".add-tasks-button");
const tasksDisplay = document.querySelector(".tasks-display");
const taskForm = document.querySelector("form.tasks-form");
const titleBox = taskForm.querySelector("input#title");

const sidebar = document.querySelector(".sidebar");
const handle = document.querySelector(".sidebar-handle");

addTasksButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (addTasksButton.classList.contains("disabled")) return;

  const taskData = extractTaskForm(taskForm);
  const task = createTask(
    taskData.title,
    taskData.description,
    taskData.dueDate,
    taskData.priority
  );
  saveTask(task);
  displayTasks(tasksDisplay);
  addTasksButton.classList.add("disabled");
});

titleBox.addEventListener("input", (event) => addTaskEnable(event));

handle.addEventListener("mousedown", (event) => {
  document.addEventListener("mousemove", resize);
  document.addEventListener("mouseup", () => {
    document.removeEventListener("mousemove", resize);
  });
});

function addTaskEnable(e) {
  e.target.value === ""
    ? addTasksButton.classList.add("disabled")
    : addTasksButton.classList.remove("disabled");
}

function extractTaskForm(element) {
  const taskData = new FormData(element);

  const title = taskData.get("title");
  const description = taskData.get("description");
  const dueTime = `${taskData.get("due-date")} ${taskData.get("due-time")}`;
  const dueDate = new Date(dueTime);
  const priority = taskData.get("priority");

  taskForm.reset();

  return { title, description, dueDate, priority };
}

function displayTasks(element) {
  element.innerHTML = "";
  getTasks().forEach((task) => {
    const taskDiv = document.createElement("li");
    taskDiv.classList.add("task");

    const taskTitle = document.createElement("div");
    taskTitle.classList.add("task-title");
    taskTitle.innerText = `${task.title}`;
    taskDiv.appendChild(taskTitle);

    const taskDescription = document.createElement("div");
    taskDescription.classList.add("task-description");
    taskDescription.innerText = `${task.description}`;
    taskDiv.appendChild(taskDescription);

    // not doing anything with it right now
    // task.dueDate

    taskDiv.classList.add(task.priority);
    element.appendChild(taskDiv);
  });
}

function resize(e) {
  const width = clamp(e.x, 200, 600);
  sidebar.style.width = `${width}px`;
}
