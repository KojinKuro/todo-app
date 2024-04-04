import {
  addProject,
  getProjects,
  mergeProjects,
} from "../src/javascript/projects";

describe("Projects", () => {
  let database, database2;

  beforeEach(() => {
    database = {
      inbox: [1, 2, 3],
      art: [],
      "more art": [4, 5],
    };

    database2 = {
      taco: [6, 7],
      "🥺": [8],
    };
  });

  it("Get projects", () => {
    const projectList = getProjects(database);
    expect(projectList).toEqual(["inbox", "art", "more art"]);
  });

  it("Get projects #2", () => {
    const projectList = getProjects(database2);
    expect(projectList).toEqual(["taco", "🥺"]);
  });

  it("Add projects", () => {
    addProject(database, "taco");
    expect(Object.keys(database)).toEqual(["inbox", "art", "more art", "taco"]);
  });

  it("Add projects #2", () => {
    addProject(database2, "degree");
    addProject(database2, "sword");
    expect(Object.keys(database2)).toEqual(["taco", "🥺", "degree", "sword"]);
  });

  it("Move project", () => {
    mergeProjects(database2, "taco", "🥺");
    expect(database2).toEqual({
      "🥺": [8, 6, 7],
    });
  });

  it("Move project #2", () => {
    mergeProjects(database, "inbox", "art");
    expect(database).toEqual({
      art: [1, 2, 3],
      "more art": [4, 5],
    });
  });
});
