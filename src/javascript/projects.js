export function getProjects(database) {
  return Object.keys(database);
}

export function addProject(database, project) {
  if (!database.hasOwnProperty(project)) database[project] = [];
}
