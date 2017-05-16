import * as Vue from 'vue';
import Component from 'vue-class-component'

@Component({
  template: `<div>
    <header>
    <slot name="header">
      </slot>
    </header>
    <slot>Sample content</slot>
    <footer><slot name="footer"></slot></footer>
  </div>`
})
export class BasicLayout extends Vue {

}