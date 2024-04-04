import { create, get } from "sortablejs";
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

      expect(createTask(title, description, dueDate, priority)).toMatchObject({
        title,
        description,
        dueDate,
        priority,
      });
    });

    it("Make different kinds of tasks", () => {
      const title = "New Task";
      const description = "This is a different description";
      const dueDate = new Date();
      const priority = 1;

      expect(createTask(title, description, dueDate, priority)).toMatchObject({
        title,
        description,
        dueDate,
        priority,
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
    let tasks, someTask, anotherTask;
    beforeEach(() => {
      tasks = [];
      someTask = createTask("Some task");
      anotherTask = createTask("Another task");
    });

    it("Will save a task to inbox by default", () => {
      saveTask(tasks, someTask);
      expect(tasks.inbox).toEqual([someTask]);
    });

    it("Will save another task to inbox by default", () => {
      saveTask(tasks, anotherTask);
      expect(tasks.inbox).toEqual([anotherTask]);
    });

    it("Will not save the same task twice", () => {
      saveTask(tasks, someTask);
      saveTask(tasks, someTask);
      expect(tasks.inbox).toEqual([someTask]);
    });

    it("Will save to a certain project", () => {
      saveTask(tasks, someTask, "swords");
      saveTask(tasks, anotherTask, "swords");
      expect(tasks.swords).toEqual([someTask, anotherTask]);
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
      for (let i = 0; i < 10; ++i) saveTask(tasks, createTask());
      const randomIndex = randomNumber(0, tasks.inbox.length - 1);
      const randomTask = tasks.inbox[randomIndex];
      const randomID = randomTask.id;

      expect(tasks.inbox.length).toBe(10);
      expect(getTask(tasks, randomID)).toEqual(randomTask);

      removeTask(tasks, randomID);

      expect(tasks.inbox.length).toBe(9);
      expect(getTask(tasks, randomID)).toBeUndefined();
    });

    it("Remove a task from any project", () => {
      const tasks = [];
      for (let i = 0; i < 5; ++i) {
        saveTask(tasks, createTask(), "games");
        saveTask(tasks, createTask(), "swords");
        saveTask(tasks, createTask(), "gems");
      }

      const projectList = ["games", "swords", "gems"];
      const randomProject =
        projectList[randomNumber(0, projectList.length - 1)];
      const randomIndex = randomNumber(0, tasks[randomProject].length - 1);
      const randomTask = tasks[randomProject][randomIndex];
      const randomID = randomTask.id;

      expect(getTask(tasks, randomID)).toEqual(randomTask);
      removeTask(tasks, randomID);
      expect(getTask(tasks, randomID)).toBeUndefined();
    });
  });

  describe("Complete tasks", () => {
    let task;
    beforeEach(() => {
      task = createTask("Do homework");
    });

    it("Toggle a task's completion", () => {
      toggleTaskCompletion(task);
      expect(task.completed).toBe(true);
    });

    it("Toggle a task's completion #2", () => {
      toggleTaskCompletion(task);
      toggleTaskCompletion(task);
      expect(task.completed).toBe(false);
    });
  });
});
