import * as Vue from 'vue';
import Component from 'vue-class-component';
import { Task } from '../model/tasks/index';
import * as HtmlTemplate from './taskDetailsStatefullView.html'

@Component({
  template: HtmlTemplate,
  name: 'task-state-details',
  props: {
    task: {
      type: Task,
      required: true
    }
  }
})
export class TaskDetailsStatefullViewComponent extends Vue {
  task: Task | null;
  name: string;
  taskData: Task | null = null;

  created() {
    this.$watch("task", this.watchTask);
  }

  mounted() {
    console.log(`${this.$options.name} - state initialized and copied to local state`)
    this.taskData = this.copy(this.task!);
  }

  private copy(task: Task): Task {
    return <Task>JSON.parse(JSON.stringify(task));
  }

  watchTask() {
    console.log(`${this.$options.name} - state changed outside and copied to local state`);
    this.taskData = this.copy(this.task!);
  }

  refreshButtonClick() {
    this.taskData = this.copy(this.task!);
  }

  newButtonClick() {
    this.taskData = new Task(null, "new task");
  }
  saveButtonClick() {
    if (this.taskData != null) {
      this.$emit("task:save", this.copy(this.taskData));
    }
  }
}
