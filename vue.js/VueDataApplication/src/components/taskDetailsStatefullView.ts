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

  /** Livecycle Hooks */
  created() {
    // during creating watchers on props should be registered
    // to react on external changes
    this.$watch("task", this.watchTask);
  }

  mounted() {
    // during mount of the component the props-values should be copied to local state
    console.log(`${this.$options.name} - state initialized and copied to local state`)
    this.taskData = this.copy(this.task!);
  }

  /** watchers */
  watchTask() {
    console.log(`${this.$options.name} - state changed outside and copied to local state`);
    this.taskData = this.copy(this.task!);
  }

  /** event handlers */
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

  private copy(value: Task): Task {
    return new Task(value.id, value.taskName, value.description);
  }

}
