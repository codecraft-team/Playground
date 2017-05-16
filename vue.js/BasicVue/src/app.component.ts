import * as Vue from 'vue';
import Component from 'vue-class-component';
import { BasicLayout } from './components/layout/basicLayout';
import { samples } from './components/samples.index';

import * as HtmlTemplate from './app.component.html';

@Component({
  template: '<div></div>'
})
class EmptyComponent extends Vue {

}
let components = Object.assign({
  'app': BasicLayout,
  'empty': EmptyComponent
}, samples);


@Component({
  template: HtmlTemplate,
  components: components
})
export class AppComponent extends Vue {
  currentView: string = 'empty';
  sampleDataFromParent: string = "Parent Data"

  show(view: string) {
    this.currentView = view;
  }
}
