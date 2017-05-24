import { PlainComponent } from './samples/components/plainComponent';
import { VueClassComponent } from './samples/components/vueClassComponent';
import { VuePropertyComponent } from './samples/components/vuePropertyDecoratedComponent';
import { ValueFormattingComponent } from './samples/filter/valueFormattingComponent';
import { PluginUsageComponent } from './samples/plugin/pluginUsageComponent';
import { MixinUsageComponent } from './samples/mixins/mixinUsageComponent';

export let samples = {
  'plain': PlainComponent,
  'vueClass': VueClassComponent,
  'vueProperty-Class': VuePropertyComponent,
  'formatting': ValueFormattingComponent,
  'plugin': PluginUsageComponent,
  'mixing-Logger': MixinUsageComponent
}