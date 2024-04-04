import Sortable from "sortablejs";
import { clamp } from "./math.js";
import {
  createTask,
  getTask,
  removeTask,
  saveTask,
  tasks,
  toggleTaskCompletion,
} from "./tasks.js";

const addTasksButton = document.querySelector(".add-tasks-button");
const tasksDisplay = document.querySelector(".tasks-display");
const taskForm = document.querySelector("form.tasks-form");
const titleBox = taskForm.querySelector("input#title");
const sortable = Sortable.create(tasksDisplay);

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
    taskData.priority,
    taskData.project
  );
  saveTask(tasks, task);
  displayTasks(tasks, tasksDisplay);
  addTasksButton.classList.add("disabled");
});
tasksDisplay.addEventListener("click", (e) => {
  if (!e.target.closest(".task")) return;

  const currentTask = e.target.closest(".task");
  const task = getTask(tasks, currentTask.dataset.id);

  console.log(task);

  if (e.target.closest("box-icon")) {
    const boxIcon = e.target.closest("box-icon");
    switch (boxIcon.getAttribute("name")) {
      case "check-circle":
      case "circle":
        toggleTaskCompletion(task);
        break;
      case "edit":
        console.log("clicked edit for", task.id);
        break;
      case "trash":
        removeTask(tasks, task.id);
        break;
    }
  }
  displayTasks(tasks, tasksDisplay);
});
titleBox.addEventListener("input", (e) => addTaskEnable(e));

handle.addEventListener("mousedown", () => {
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
  const project = taskData.get("project");

  taskForm.reset();

  return { title, description, dueDate, priority, project };
}

function displayTasks(database, element) {
  element.innerHTML = "";
  database.forEach((task) => {
    const taskDiv = document.createElement("li");
    taskDiv.classList.add("task");
    taskDiv.dataset.id = task.id;

    const checkboxIcon = task.completed
      ? "<box-icon type='solid' name='check-circle'></box-icon>"
      : "<box-icon name='circle'></box-icon>";

    const completedClass = task.completed ? "completed" : "";

    taskDiv.innerHTML = `
    ${checkboxIcon}
    <div class="task-info ${task.priority} ${completedClass}">
      <div class="task-title">${task.title}</div>
      <div class="task-description">${task.description}</div>
    </div>
    <div class="task-settings">
      <box-icon name='edit' ></box-icon>
      <box-icon name='trash'></box-icon>
    </div>
    `;

    // not doing anything with it right now
    // task.dueDate

    element.appendChild(taskDiv);
  });
}

function makeForm(task) {}

function resize(e) {
  const width = clamp(e.x, 200, 600);
  sidebar.style.width = `${width}px`;
}
