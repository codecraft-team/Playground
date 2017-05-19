import { assert } from 'chai';
import * as mocha from 'mocha';
import { Task, TaskController } from '../../../src/model/tasks/index';


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
      assert.equal(controller.tasks.length, 3);
    });

    test("selects the first task if current is null", () => {
      controller.loadTasks();
      assert.equal(controller.currentTask && controller.currentTask.id, 0);
    });
  })

  suite("selectTask", () => {
    let controller: TaskController;
    setup(() => {
      controller = new TaskController();
      controller.init();
    });

    test("sets the currentTaskProperty", () => {
      controller.loadTasks();
      controller.selectTask(1);

      assert.isNotNull(controller.currentTask)
      assert.equal(controller.currentTask && controller.currentTask.id, 1)
    })
  })

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
      let actualCount = controller.tasks.length;
      let task = new Task(-1, "New Task");
      controller.save(task);

      assert.equal(controller.tasks.length, actualCount + 1);
      assert.equal(controller.tasks[actualCount].id, 11);
    })

  })
});