import { generateRandomID } from "./math.js";

export const tasks = [];

export function saveTask(database, task) {
  const foundIndex = database.findIndex((tsk) => tsk.id === task.id);
  if (foundIndex === -1) database.push(task);
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

export function getTask(database, id) {
  return database.find((task) => task.id === id);
}

export function removeTask(database, id) {
  let removeIndex = database.findIndex((task) => task.id === id);
  if (removeIndex !== -1) database.splice(removeIndex, 1);
}

export function toggleTaskCompletion(task) {
  const newTask = task;
  newTask.completed = !newTask.completed;
  return newTask;
}
