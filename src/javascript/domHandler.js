import Sortable from "sortablejs";
import { clamp } from "./math.js";
import { addProject, getProjects } from "./projects.js";
import {
  createTask,
  getTask,
  removeTask,
  saveTask,
  tasks,
  toggleTaskCompletion,
} from "./tasks.js";

const addTasksButton = document.querySelector(".add-tasks-button");
const addProjectsButton = document.querySelector(".add-projects-button");

const projectsDisplay = document.querySelector(".projects-display");
const projectSelect = document.querySelector("#project-select");

const tasksDisplay = document.querySelector(".tasks-display");
const taskForm = document.querySelector("form.tasks-form");
const titleBox = taskForm.querySelector("input#title");
const sortable = Sortable.create(tasksDisplay);

const html = document.querySelector("html");
const sidebar = document.querySelector(".sidebar");
const sidebarContent = document.querySelector(".sidebar-content");
const handle = document.querySelector(".sidebar-handle");

const modalProject = document.querySelector(".projects-modal");
const modalsContainer = document.querySelector(".modals-container");

addEventListener("load", init);
sidebarContent.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.classList.contains("add-tasks-button")) {
    if (e.target.classList.contains("disabled")) return;

    const taskData = extractTaskForm(taskForm);
    const task = createTask(
      taskData.title,
      taskData.description,
      taskData.dueDate,
      taskData.priority
    );
    saveTask(tasks, task, taskData.project);
    displayTasks(tasks, tasksDisplay);
    addTasksButton.classList.add("disabled");
  } else if (e.target.classList.contains("add-projects-button")) {
    console.log("added a project");
    modalProject.showModal();
  }
});
modalsContainer.addEventListener("click", (e) => {
  e.preventDefault();
  const projectInput = document.querySelector("#project");
  if (e.target.classList.contains("projects-submit-button")) {
    addProject(tasks, projectInput.value);
    projectInput.value = "";
    modalProject.close();
  } else if (e.target.classList.contains("projects-cancel-button")) {
    projectInput.value = "";
    modalProject.close();
  }

  updateProjects(tasks);
});
tasksDisplay.addEventListener("click", (e) => {
  if (!e.target.closest(".task")) return;

  const currentTask = e.target.closest(".task");
  const task = getTask(tasks, currentTask.dataset.id);

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
titleBox.addEventListener("input", (e) => enableAddTask(e));

handle.addEventListener("mousedown", () => {
  document.addEventListener("mousemove", resize);
  document.addEventListener("mouseup", () => {
    document.removeEventListener("mousemove", resize);
  });
});

function init() {
  updateProjects(tasks);
}

function enableAddTask(e) {
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

function updateProjects(database) {
  projectsDisplay.innerHTML = "";
  projectSelect.innerHTML = "";
  getProjects(database).forEach((project) => {
    projectsDisplay.innerHTML += `<li>${project}</li>`;
    projectSelect.innerHTML += `<option value="${project}">${project}</option>`;
  });
}

// todo: update this to not require an element parameter and just return it
function displayTasks(database, element) {
  element.innerHTML = "";
  for (const project in database) {
    database[project].forEach((task) => {
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
}

function resize(e) {
  const width = clamp(e.x, 200, 600);
  sidebar.style.width = `${width}px`;
}
