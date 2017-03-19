import { Component, NgModule } from '@angular/core'
import { CommonModule } from '@angular/common';

@Component({
    selector: 'my-test',
    template: '<h1>Hi I am a dynamic module</h1>'
})
export class DynComponent { }


@NgModule({
    imports: [CommonModule],
    declarations: [DynComponent],
    exports: [DynComponent]
})
export class DynamicModule { }