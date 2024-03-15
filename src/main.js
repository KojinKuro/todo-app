import "normalize.css";
import { displayTasks } from "./javascript/domHandler";
import "./scss/style.scss";

export const tasks = [];
global.tasks = tasks;
global.createTask = createTask;
global.saveTask = saveTask;

function saveTask(task) {
  tasks.push(task);
}

export function createTask(title, description, dueDate = -1, priority = 1) {
  if (title == undefined) throw new Error("Must provide a task title!");
  return { title, description, dueDate, priority, completed: false };
}

export function completeTask(task) {
  const newTask = task;
  newTask.completed = true;
  return newTask;
}
