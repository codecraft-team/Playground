import { PlainComponent } from './samples/plainComponent';
import { VueClassComponent } from './samples/vueClassComponent';
import { VuePropertyComponent } from './samples/vuePropertyDecoratedComponent';
import { ValueFormattingComponent } from './samples/valueFormattingComponent';
import { PluginUsageComponent } from './samples/plugin/pluginUsageComponent';

export let samples = {
  'plain': PlainComponent,
  'vueClass': VueClassComponent,
  'vueProperty-Class': VuePropertyComponent,
  'formatting': ValueFormattingComponent,
  'plugin': PluginUsageComponent
}