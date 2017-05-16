import * as Vue from 'vue';
import { BasicLayout } from './components/index';

export class App {
  start(target: string | Element) {
    console.log("Application was started");
    let vue = new Vue({
      el: target,
      render: createElement => createElement(BasicLayout)
    });
  }
}