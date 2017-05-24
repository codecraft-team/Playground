import * as Vue from 'vue';

function capitalize(value: string): string {
  if (!value) return "";
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export class filterPlugin implements Vue.PluginObject<undefined> {

  install(vue: typeof Vue) {
    vue.filter("capitalize", capitalize)
  }

}