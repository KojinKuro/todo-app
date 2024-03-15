import { createTask, getTasks, saveTask } from "./tasks.js";

const addTasksButton = document.querySelector(".add-tasks-button");
const tasksDisplay = document.querySelector(".tasks-display");
const taskForm = document.querySelector("form.tasks-form");

addTasksButton.addEventListener("click", () => {
  const taskData = extractTaskForm(taskForm);
  const task = createTask(
    taskData.title,
    taskData.description,
    taskData.dueDate,
    taskData.priority
  );
  saveTask(task);
  displayTasks(tasksDisplay);
});

function extractTaskForm(element) {
  const taskData = new FormData(element);

  const title = taskData.get("title");
  const description = taskData.get("description");
  const dueTime = `${taskData.get("due-date")} ${taskData.get("due-time")}`;
  const dueDate = new Date(dueTime);
  const priority = +taskData.get("priority");

  taskForm.reset();

  return { title, description, dueDate, priority };
}

function displayTasks(element) {
  element.innerHTML = "";
  getTasks().forEach((task) => {
    element.innerText += `
    Title: ${task.title}\n
    Description: ${task.description}\n
    Due Date: ${task.dueDate}\n
    Priority: ${task.priority}\n`;
  });
}
