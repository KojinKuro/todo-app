import { generateRandomID } from "./math.js";
import { addProject } from "./projects.js";

export const tasks = [];
global.tasks = tasks;

export function saveTask(database, task, project = "inbox") {
  addProject(database, project);
  const foundIndex = database[project].findIndex((tsk) => tsk.id === task.id);
  if (foundIndex === -1) database[project].push(task);
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
  for (const project in database) {
    const foundTask = database[project].find((task) => task.id === id);
    if (foundTask) return foundTask;
  }
}

export function removeTask(database, id) {
  for (const project in database) {
    let removeIndex = database[project].findIndex((task) => task.id === id);
    if (removeIndex !== -1) {
      database[project].splice(removeIndex, 1);
      break;
    }
  }
}

export function toggleTaskCompletion(task) {
  const newTask = task;
  newTask.completed = !newTask.completed;
  return newTask;
}
