import * as Vue from 'vue';
import * as HtmlTemplate from './app.html';
import { TaskDetailsViewComponent } from './components/taskDetailsView';
import { TaskController } from './model/tasks/index';

export class App {
  start(target: string | Element): void {
    console.log("Application was started");

    let taskController = new TaskController();
    taskController.init();

    // load the first three  task and select the first one
    taskController.loadTasks();
    taskController.selectTask(1);

    let vue = new Vue({
      el: target,
      template: HtmlTemplate,
      data: function () {
        return {
          tasks: taskController
        }
      },
      components: {
        'task-details': TaskDetailsViewComponent
      }
    });
  }
}