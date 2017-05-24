import * as Vue from 'vue';
import Component from 'vue-class-component';

import { filterPlugin } from './filters';

let filters = new filterPlugin()

Vue.use(filters);

@Component({
  template: `<div>
  Template Value: {{templateValue}} => <mark>{{templateValue | capitalize}}</mark>
  </div>`
})
export class PluginUsageComponent extends Vue {
  templateValue: string = "templateValue"
}