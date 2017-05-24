import * as Vue from 'vue';

function log(vue: Vue, event: string) {
  console.log(`Component ${vue.$options.name} ${event} at ${new Date().toLocaleTimeString()}`)
}

export class LifecycleMixing implements Vue.ComponentOptions<Vue> {
  beforeCreate(this: Vue):void {
    log(this, 'beforeCreate');
  }

  created(this: Vue):void {
    log(this, 'created');
  }

  beforeMount(this: Vue) {
    log(this, 'beforeMount');
  }

  mounted(this: Vue) {
    log(this, 'mounted');
  }

  beforeUpdate(this: Vue) {
    log(this, 'beforeUpdate');
  }
  updated(this: Vue) {
    log(this, 'updated');
  }

  beforeDestroy(this: Vue) {
    log(this, 'beforeDestroy');
  }

  destroyed(this: Vue) {
    log(this, 'destroyed');
  }
}