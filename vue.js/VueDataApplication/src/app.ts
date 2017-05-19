import * as Vue from 'vue';
import * as HtmlTemplate from './app.html';
import { TaskController } from './model/tasks/index';

export class App {
  start(target: string | Element): void {
    console.log("Application was started");

    let taskController = new TaskController();
    taskController.init();

    let vue = new Vue({
      el: target,
      template: HtmlTemplate,
      data: function () {
        return {
          tasks: taskController
        }
      }
    });
  }
}