import { assert } from "chai";
import * as mocha from "mocha";
import { Task, TaskController } from "../../../src/model/tasks/index";

suite("TaskController", () => {

  suite("initializes", () => {
    let controller: TaskController;
    setup(() => {
      controller = new TaskController();
      controller.init();
    });

    test("with message", () => {
      assert.isDefined(controller.tasks);
      assert.equal(controller.message, "Initial task message");
    });

    test("with empty tasksCollection", () => {
      assert.isDefined(controller.tasks);
      assert.isNotNull(controller.tasks);
      assert.equal(controller.tasks.length, 0);
    });

    test("with null as currentTask", () => {
      assert.isNull(controller.currentTask);
    });
  });

  suite("loadTasks", () => {
    let controller: TaskController;
    setup(() => {
      controller = new TaskController();
      controller.init();
    });

    test("will load first three tasks after init and update message", () => {
      controller.loadTasks();

      assert.equal(controller.message, "Tasks are loaded");
      assert.ok(controller.tasks.length > 0);
    });

    test("selects the first task if current is null", () => {
      controller.loadTasks();
      assert.equal(controller.currentTask && controller.currentTask.id, 1);
    });
  });

  suite("selectTask", () => {
    let controller: TaskController;
    setup(() => {
      controller = new TaskController();
      controller.init();
    });

    test("sets the currentTaskProperty", () => {
      controller.loadTasks();
      controller.selectTask(1);

      assert.isNotNull(controller.currentTask);
      assert.equal(controller.currentTask && controller.currentTask.id, 1);
    });
  });

  suite("Save", () => {
    let controller: TaskController;
    setup(() => {
      controller = new TaskController();
      controller.init();
    });

    test("new Task will be pushed with new Id", () => {
      controller.tasks.push(new Task(8, "existing Task"));
      controller.tasks.push(new Task(6, "existing Task"));
      controller.tasks.push(new Task(4, "existing Task"));
      controller.tasks.push(new Task(10, "existing Task"));
      const actualCount = controller.tasks.length;
      const task = new Task(-1, "New Task");
      controller.save(task);

      assert.equal(controller.tasks.length, actualCount + 1);
      assert.equal(controller.tasks[actualCount].id, 11);
    });

    test("updated Task will update same instance", () => {
      const existingTask = new Task(55, "existing Task", "existing description");
      controller.tasks.push(existingTask);
      controller.save(new Task(55, "updated Name", "updated description"));

      assert.equal(existingTask.taskName, "updated Name");
      assert.equal(existingTask.description, "updated description");
    });
  });

  suite("filterdTasks", () => {
    let controller: TaskController;
    setup(() => {
      controller = new TaskController();
      controller.init();
    });

    test("list all tasks if no searchText ist set", () => {
      controller.tasks.push(new Task(1, "Sample Task"));
      controller.tasks.push(new Task(2, "Sample Task"));
      controller.tasks.push(new Task(3, "Sample Task"));
      controller.tasks.push(new Task(4, "Sample Task"));
      controller.searchText = null;
      assert.equal(controller.tasks.length, controller.filteredTasks.length);
    });

    test("list all tasks if no searchtext ist set", () => {
      controller.tasks.push(new Task(1, "nomatch task 01"));
      controller.tasks.push(new Task(2, "nomatch task 01"));
      controller.tasks.push(new Task(3, "nomatch task 01"));
      controller.tasks.push(new Task(4, "nomatch task 01"));
      controller.tasks.push(new Task(55, "sample test task"));
      controller.searchText = "test";
      assert.equal(controller.filteredTasks.length, 1);
      assert.equal(controller.filteredTasks[0].id, 55);
    });
  });
});
