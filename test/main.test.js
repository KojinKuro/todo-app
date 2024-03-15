import { completeTask, createTask } from "../src/main";

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

      expect(createTask(title, description, dueDate, priority)).toEqual({
        title: "Some Task",
        description: "Some description",
        dueDate: new Date(),
        priority: 4,
        completed: false,
      });
    });

    it("Make different kinds of tasks", () => {
      const title = "New Task";
      const description = "This is a different description";
      const dueDate = new Date();
      const priority = 1;

      expect(createTask(title, description, dueDate, priority)).toEqual({
        title: "New Task",
        description: "This is a different description",
        dueDate: new Date(),
        priority: 1,
        completed: false,
      });
    });

    it("createTask defaults", () => {
      expect(createTask()).toEqual({
        title: undefined,
        description: undefined,
        dueDate: -1,
        priority: 1,
        completed: false,
      });
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
    it.todo("Remove a task");
  });

  describe("Complete tasks", () => {
    it("Complete a task", () => {
      const task = createTask("Do homework");
      const newTask = completeTask(task);
      expect(newTask.completed).toBe(true);
    });
  });
});
