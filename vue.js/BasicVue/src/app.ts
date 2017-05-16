import * as Vue from 'vue';
import { AppComponent } from './app.component';
export class App {
  start(target: string | Element): void {
    console.log("Application was started");
    let vue = new Vue({
      el: target,
      render: createElement => createElement(AppComponent)
    });
  }
}