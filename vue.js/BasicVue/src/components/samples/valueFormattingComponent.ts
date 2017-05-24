import * as Vue from 'vue';
import Component from 'vue-class-component';


function capitalize(value: string) {
  if (!value) return "";
  return value.charAt(0).toUpperCase() + value.slice(1);
}
function reverse(value: string) {
  if (!value) return "";
  return value.split("").reverse().join("");
}

// register a filter to all components used with this Vue-Instance
Vue.filter("reverse", reverse);

/** SUB Component */
@Component({
  template: `<div>
  <p>Capitalize filter in subcomponent is not available:<br/>
  {{lowerSubValue}} => <mark>{{lowerSubValue | capitalize}}</mark></p>
  <p>Reverse filter which is registered using Vue.filter is available in all components:<br/>
  {{lowerSubValue}} => <mark>{{lowerSubValue | reverse}}</mark></p>
  </div>`
})
class SubComponentClass extends Vue {
  lowerSubValue: string = "lowerValueInSubComponent"
}

/** MAIN Sample Component */
@Component({
  template: `<div>
    <p>Captalize filter: {{lowerValue}} =><mark>{{lowerValue | capitalize}}</mark><br/>
    Reverse filter: {{lowerValue}} => <mark>{{lowerValue | reverse}}</mark></p>
    <p><my-subcomponent></my-subcomponent></p>
</div>`,
  filters: {
    'capitalize': capitalize
  },
  components: {
    'my-subcomponent': SubComponentClass
  }
})
export class ValueFormattingComponent extends Vue {
  lowerValue: string = "smallValue";

}

