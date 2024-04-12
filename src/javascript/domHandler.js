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

const sidebar = document.querySelector(".sidebar");
const sidebarContent = document.querySelector(".sidebar-content");
const handle = document.querySelector(".sidebar-handle");

const modalProject = document.querySelector(".projects-modal");
const modalsContainer = document.querySelector(".modals-container");
const projectInput = document.querySelector("#project-input");

const init = () => {
  updateProjects(tasks);
  updateTasks(tasks);
};

const extractTaskForm = (element) => {
  const taskData = new FormData(element);

  const title = taskData.get("title");
  const description = taskData.get("description");
  const dueTime = `${taskData.get("due-date")} ${taskData.get("due-time")}`;
  const dueDate = new Date(dueTime);
  const priority = taskData.get("priority");
  const project = taskData.get("project");

  taskForm.reset();

  return { title, description, dueDate, priority, project };
};

const updateProjects = (database) => {
  projectsDisplay.innerHTML = "";
  projectSelect.innerHTML = "";
  getProjects(database).forEach((project) => {
    projectsDisplay.innerHTML += `<li>${project}</li>`;
    projectSelect.innerHTML += `<option value="${project}">${project}</option>`;
  });
  projectsDisplay.innerHTML +=
    '<li><button class="add-projects-button">Add projects</button></li>';
};

// todo: update this to not require an element parameter and just return it
const updateTasks = (function () {
  let currentProject = "inbox";

  return function (database, project) {
    if (!project) project = currentProject;
    else currentProject = project;
    if (!Object.keys(database).includes(project))
      throw Error("Not a valid project");

    tasksDisplay.innerHTML = `<h1>${project}</h1>`;
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

      tasksDisplay.appendChild(taskDiv);
    });
  };
})();

const resize = (e) => {
  const width = clamp(e.x, 200, 600);
  sidebar.style.width = `${width}px`;
};

// EVENT LISTENERS
addEventListener("load", init);
sidebarContent.addEventListener("click", (e) => {
  e.preventDefault();

  if (e.target.classList.contains("project")) {
  } else if (e.target.classList.contains("add-tasks-button")) {
    if (e.target.classList.contains("disabled")) return;

    const taskData = extractTaskForm(taskForm);
    const task = createTask(
      taskData.title,
      taskData.description,
      taskData.dueDate,
      taskData.priority
    );
    saveTask(tasks, task, taskData.project);
    updateTasks(tasks);
    addTasksButton.classList.add("disabled");
  } else if (e.target.classList.contains("add-projects-button")) {
    console.log("added a project");
    modalProject.showModal();
  }
});
modalsContainer.addEventListener("click", (e) => {
  e.preventDefault();

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
  updateTasks(tasks);
});
titleBox.addEventListener("input", (e) => {
  e.target.value === ""
    ? addTasksButton.classList.add("disabled")
    : addTasksButton.classList.remove("disabled");
});
handle.addEventListener("mousedown", () => {
  document.addEventListener("mousemove", resize);
  document.addEventListener("mouseup", () => {
    document.removeEventListener("mousemove", resize);
  });
});
