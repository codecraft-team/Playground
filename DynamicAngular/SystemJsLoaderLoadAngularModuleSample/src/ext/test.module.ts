import { Component, NgModule } from '@angular/core'

@Component({
    selector: 'my-test',
    template: '<h1>Hi I am the dynamic module</h1>'
})
export class TestComponent { }


@NgModule({
    declarations: [TestComponent],
    exports: [TestComponent]
})
export class DynamicModule { }