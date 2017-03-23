import { Component, ModuleWithComponentFactories, Compiler, NgModule, ViewContainerRef, ViewChild, ComponentRef, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DynamicModule, DynComponent } from './dyn.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('headingRef', { read: ViewContainerRef })
  viewref: ViewContainerRef;
  componentRef: ComponentRef<any>;

  constructor(private compiler: Compiler) { }
  title = 'app works!';

  ngOnInit() {
    this.create()
  }

  ngOnDestroy() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

  create() {
    this.compiler.compileModuleAndAllComponentsAsync(DynamicModule)
      .then((moduleWithFactories: ModuleWithComponentFactories<any>) => {
        return moduleWithFactories.componentFactories.find(x => x.componentType === DynComponent);
      })
      .then(
      componentFactory => {
        setTimeout(() => {
          this.componentRef = this.viewref.createComponent(componentFactory);
        }, 2000);
      });
  }
}