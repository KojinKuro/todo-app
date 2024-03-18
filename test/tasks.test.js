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

    it("Will autogenerate an ID", () => {
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

      const newTasks = removeTask(tasks, randomID);
      // make sure the new array is smaller by one
      expect(newTasks.length).toBe(tasks.length - 1);
      // search to make sure the id doesn't show up anymore
      expect(newTasks.find((task) => task.id === randomID)).toBeUndefined();
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
