import { addProject, getProjects } from "../src/javascript/projects";

describe("Projects", () => {
  let database, database2;

  beforeEach(() => {
    database = {
      inbox: [],
      art: [],
      "more art": [],
    };

    database2 = {
      taco: [],
      "🥺": [],
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
});
