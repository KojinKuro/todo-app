import { createTask, tasks } from "../main";

var addTasksButton = document.querySelector(".add-tasks-button");
var tasksDisplay = document.querySelector(".tasks-display");

export function displayTasks(tasks) {
  tasksDisplay.innerHTML = "";
  tasks.forEach((task) => {
    tasksDisplay.innerText += `${task.title}\n`;
  });
}

global.displayTasks = displayTasks;
