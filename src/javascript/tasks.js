import { generateRandomID } from "./math.js";

const tasks = [];
global.tasks = tasks;

export function saveTask(dataBase, task) {
  dataBase.push(task);
}

export function getTasks() {
  return tasks;
}

export function createTask(title, description, dueDate = -1, priority = 1) {
  return {
    title,
    description,
    dueDate,
    priority,
    completed: false,
    id: generateRandomID(),
  };
}

export function getTask(dataBase, id) {
  return dataBase.find((task) => task.id === id);
}

export function removeTask(dataBase, id) {
  let removeIndex = dataBase.findIndex((task) => task.id === id);
  if (removeIndex !== -1) dataBase.splice(removeIndex, 1);
}

export function completeTask(task) {
  const newTask = task;
  newTask.completed = true;
  return newTask;
}
