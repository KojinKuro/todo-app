import { generateRandomID } from "./math.js";

export const tasks = [];
global.tasks = tasks;

export function saveTask(dataBase, task) {
  const foundIndex = dataBase.findIndex((tsk) => tsk.id === task.id);
  if (foundIndex === -1) dataBase.push(task);
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

export function toggleTaskCompletion(task) {
  const newTask = task;
  newTask.completed = !newTask.completed;
  return newTask;
}
