export function getProjects(database) {
  return Object.keys(database);
}

export function addProject(database, project) {
  if (!database.hasOwnProperty(project)) database[project] = [];
}

export function mergeProjects(database, originalProject, targetProject) {
  database[targetProject].push(...database[originalProject]);
  removeProject(database, originalProject);
}

export function removeProject(database, project) {
  delete database[project];
  if (project === "inbox") addProject(database, project);
}
