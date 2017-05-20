import * as Vue from "vue";
import * as HtmlTemplate from "./app.html";
import { TaskDetailsStatefullViewComponent } from "./components/taskDetailsStatefullView";
import { TaskDetailsViewComponent } from "./components/taskDetailsView";
import { TaskController } from "./model/tasks/index";

export class App {
  public start(target: string | Element): void {
    console.log("Application was started");

    const taskController = new TaskController();
    taskController.init();

    // load the first three  task and select the first one
    taskController.loadTasks();
    taskController.selectTask(1);

    const vue = new Vue({
      el: target,
      template: HtmlTemplate,
      data: function (this: Vue) {
        return {
          tasks: taskController
        };
      },
      components: {
        "task-details": TaskDetailsViewComponent,
        "task-statefull-details": TaskDetailsStatefullViewComponent,
      },
    });
  }
}
