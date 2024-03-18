import { isEverythingUnique } from "../src/javascript/array";
import { randomNumber } from "../src/javascript/math";
import {
  completeTask,
  createTask,
  removeTask,
  saveTask,
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

      expect(createTask(title, description, dueDate, priority)).toMatchObject({
        title: "Some Task",
        description: "Some description",
        dueDate: new Date(),
        priority: 4,
      });
    });

    it("Make different kinds of tasks", () => {
      const title = "New Task";
      const description = "This is a different description";
      const dueDate = new Date();
      const priority = 1;

      expect(createTask(title, description, dueDate, priority)).toMatchObject({
        title: "New Task",
        description: "This is a different description",
        dueDate: new Date(),
        priority: 1,
      });
    });

    it("createTask defaults", () => {
      expect(createTask()).toMatchObject({
        title: undefined,
        description: undefined,
        dueDate: -1,
        priority: 1,
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
    it.skip("Will save a task", () => {
      const tasks = [];
      const someTask = createTask("Some task");
      const newTasks = saveTask(tasks, someTask);

      expect(tasks.length).toBe(0);
      expect(newTasks.length).toBe(1);
    });

    it("Will not save the same task twice", () => {});
  });

  describe("Get a task", () => {
    it.skip("Grab a task from an ID", () => {
      // const tasks = [];
      // for (let i = 0; i < 1000; ++i) saveTask(tasks, createTask());
      // const randomIndex = randomNumber(0, tasks.length - 1);
      // const randomID = tasks[randomIndex].id;
      // getTask(dataBase, id);
    });
  });

  describe("Add subtasks", () => {
    it.todo("Add subtasks");
  });

  describe("Change priority of tasks", () => {
    it.todo("Change task priority");
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

      const beforeRemoveLength = tasks.length;
      removeTask(tasks, randomID);
      const afterRemoveLength = tasks.length;
      expect(afterRemoveLength).toBe(beforeRemoveLength - 1);
      expect(tasks.find((task) => task.id === randomID)).toBeUndefined();
    });
  });

  describe("Complete tasks", () => {
    it("Complete a task", () => {
      const task = createTask("Do homework");
      const newTask = completeTask(task);
      expect(newTask.completed).toBe(true);
    });
  });
});
