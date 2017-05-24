import * as Vue from 'vue';
import Component from 'vue-class-component';

/** SUB Component */
@Component({
  template: `<div>
  <p>Capitalize filter in subcomponent is not available:<br/>
  {{lowerSubValue}} => <mark>{{lowerSubValue | capitalize}}</mark></p>
  <p>Reverse filter which is registered using Vue.filter is available in all components:<br/>
  {{lowerSubValue}} => <mark>{{lowerSubValue | reverse}}</mark></p>
  </div>`
})
export class SubComponentClass extends Vue {
  lowerSubValue: string = "lowerValueInSubComponent"
}