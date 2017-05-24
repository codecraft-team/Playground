import * as Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component({
  template: `<div>
    <div>
    This is a vue.js Component written in Typescript with support of the vue-property-decorator decorator
    <p>This kind of component uses a typescript class which will extends the Vue type and will be decorated using vue-property-decorator</p>
    </div>
    <p>Show some data from the Parent Component: {{parentData}}</p>
    <p><button @click="onClick">Clicked me => {{counter}}</button></p>
    <div v-html="message"></div>
  </div>`
})
export class VuePropertyComponent extends Vue {

  @Prop({ required: true }) parentData: string;
  counter: number = 0;
  message: string = '';

  onClick() {
    this.counter++;
    this.message += "<p>button was clicked</p>";
  };
}