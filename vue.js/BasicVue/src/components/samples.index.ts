import { PlainComponent } from './samples/plainComponent';
import { VueClassComponent } from './samples/vueClassComponent';
import { VuePropertyComponent } from './samples/vuePropertyDecoratedComponent';
import { ValueFormattingComponent } from './samples/valueFormattingComponent';

export let samples = {
  'plain': PlainComponent,
  'vueClass': VueClassComponent,
  'vueProperty-Class': VuePropertyComponent,
  'formatting': ValueFormattingComponent
}