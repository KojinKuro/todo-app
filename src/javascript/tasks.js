const tasks = [];
global.tasks = tasks;

export function saveTask(task) {
  tasks.push(task);
}

export function getTasks() {
  return tasks;
}

export function createTask(title, description, dueDate = -1, priority = 1) {
  if (title == undefined || title == "")
    throw new Error("Must provide a task title!");
  return { title, description, dueDate, priority, completed: false };
}

export function completeTask(task) {
  const newTask = task;
  newTask.completed = true;
  return newTask;
}
