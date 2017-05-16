import * as Vue from 'vue';
import Component from 'vue-class-component'

@Component({
  template: `<div>
    <header>
    <slot name="header">
      <h1>Basic vue.js application</h1>
      <p>
        Demonstrates some practices with vue components
      </p>
      </slot>
    </header>
    <div>Some content</div>
    <footer><slot name="footer"></slot></footer>
  </div>`
})
export class BasicLayout extends Vue {

}