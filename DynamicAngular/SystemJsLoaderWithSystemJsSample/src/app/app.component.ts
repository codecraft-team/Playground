import { Component, NgModule, SystemJsNgModuleLoader, NgModuleFactory } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `<h1>Hello {{name}}</h1>`,
})
export class AppComponent {
  constructor(private loader: SystemJsNgModuleLoader) { }
  ngOnInit() {
    this.loader.load('./test.module.js#MyModule').then((factory: NgModuleFactory<any>) => {
      console.log(factory);
    });
  }

  name = 'Angular';
}
