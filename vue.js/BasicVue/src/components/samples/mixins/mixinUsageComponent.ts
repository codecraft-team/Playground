import * as Vue from 'vue';
import Component from 'vue-class-component';

import { LifecycleMixing } from './vue-lifecycleLogger';


@Component({
  template: `<div>
  <span>Sample Component usages mixins for logging</span>
  <div><Bound sample Data <mark>{{text}}</mark><br/>
  <button @click="buttonClick">Click me.</button></div>
  </div>`,
  mixins:[new LifecycleMixing()]
})
export class MixinUsageComponent extends Vue {
  text:string = "Sample Data";
  buttonClick(){
    this.text = "Button was clicked";
  }
}