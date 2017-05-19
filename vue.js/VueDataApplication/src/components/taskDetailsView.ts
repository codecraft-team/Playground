import * as Vue from 'vue';
import Component from 'vue-class-component';
import { Task } from '../model/tasks/index';
import * as HtmlTemplate from './taskDetailsView.html'

@Component({
  template: HtmlTemplate,
  name: 'task-details',
  props: {
    task: {
      type: Task,
      required: true
    }
  }
})
export class TaskDetailsViewComponent extends Vue {

}
