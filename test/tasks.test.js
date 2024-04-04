import { isEverythingUnique } from "../src/javascript/array";
import { randomNumber } from "../src/javascript/math";
import {
  createTask,
  getTask,
  removeTask,
  saveTask,
  toggleTaskCompletion,
} from "../src/javascript/tasks";

describe("Function tests", () => {
  beforeAll(() => {
    jest.useFakeTimers("modern");
    jest.setSystemTime(new Date(2020, 3, 1));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  describe("Create tasks Tests", () => {
    it("Task Creation", () => {
      const title = "Some Task";
      const description = "Some description";
      const dueDate = new Date();
      const priority = 4;
      const project = "Some project";

      expect(
        createTask(title, description, dueDate, priority, project)
      ).toMatchObject({
        title,
        description,
        dueDate,
        priority,
        project,
      });
    });

    it("Make different kinds of tasks", () => {
      const title = "New Task";
      const description = "This is a different description";
      const dueDate = new Date();
      const priority = 1;
      const project = "Another project";

      expect(
        createTask(title, description, dueDate, priority, project)
      ).toMatchObject({
        title,
        description,
        dueDate,
        priority,
        project,
      });
    });

    it("createTask defaults", () => {
      expect(createTask()).toMatchObject({
        title: undefined,
        description: undefined,
        dueDate: -1,
        priority: 1,
        project: "inbox",
      });
    });

    it("Will generate an ID on create", () => {
      expect(createTask()).toHaveProperty("id");
    });

    it("All IDs are unique", () => {
      const tasks = [];
      for (let i = 0; i < 1000; ++i) saveTask(tasks, createTask());
      expect(isEverythingUnique(tasks, "id")).toBe(true);
    });

    it("Will set task to incomplete on load", () => {
      expect(createTask("").completed).toEqual(false);
    });
  });

  describe("Save task", () => {
    it("Will save a task", () => {
      const tasks = [];
      const someTask = createTask("Some task");

      expect(tasks.length).toBe(0);
      saveTask(tasks, someTask);
      expect(tasks.length).toBe(1);
      // make sure that you can find the task
      expect(getTask(tasks, someTask.id)).toEqual(someTask);
    });

    it("Will not save the same task twice", () => {
      const tasks = [];
      const someTask = createTask("Some task");

      expect(tasks.length).toBe(0);
      saveTask(tasks, someTask);
      saveTask(tasks, someTask);
      expect(tasks.length).toBe(1);
    });
  });

  // describe("Add subtasks", () => {
  //   it.todo("Add subtasks");
  // });

  describe("Change properties of tasks", () => {
    it.todo("Change task title");
    it.todo("Change task description");
    it.todo("Change task due date");
    it.todo("Change task priority");
    it.todo("Change task project");
  });

  describe("Filter tasks", () => {
    it.todo("Filter tasks based on parameters");
  });

  describe("Remove Tasks", () => {
    it("Remove a task", () => {
      const tasks = [];
      for (let i = 0; i < 1000; ++i) saveTask(tasks, createTask());

      const randomIndex = randomNumber(0, tasks.length - 1);
      const randomID = tasks[randomIndex].id;

      expect(tasks.length).toBe(1000);
      removeTask(tasks, randomID);
      expect(tasks.length).toBe(999);
      expect(getTask(tasks, randomID)).toBeUndefined();
    });
  });

  describe("Complete tasks", () => {
    it("Toggle a task's completion", () => {
      const task = createTask("Do homework");
      toggleTaskCompletion(task);
      expect(task.completed).toBe(true);
    });

    it("Toggle a task's completion #2", () => {
      const task = createTask("Do homework");
      toggleTaskCompletion(task);
      toggleTaskCompletion(task);
      expect(task.completed).toBe(false);
    });
  });
});
