import * as Vue from 'vue';


interface ComponentOptions {
  message: string
  counter: number
}

let options: any = {
  template: `<div>
    <div>
    This is a plain vue.js Component written in Typescript
    <p>This kind of component definition needs a workaround for the this-statement, because typeScripts rewrites the this and points it to the module-scope</p>
    </div>
    <p>Show some data from the Parent Component: {{parentData}}</p>
    <p><button @click="onClick">Clicked me => {{counter}}</button></p>
    <div v-html="message"></div>
  </div>`,
  props: {
    parentData: {
      type: String,
      required: true
    }
  },
  data: () => {
    return {
      counter: 0,
      message: ''
    };
  },
  methods: {
    onClick: function (this: ComponentOptions, event: Event) {
      this.counter++;
      this.message += "<p>button was clicked</p>";
    }
  }
}

export let PlainComponent = Vue.component('poco', options);