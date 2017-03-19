import { Component, AfterViewInit, Inject, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';

@Component({
  selector: 'hello-world',
  template: '<h2>Hello World</h2>'
})
export class HelloWorld {
}

@Component({
  selector: 'hello-angular',
  template: '<br><h3>Hello Angular</h3>'
})
export class HelloAngular {
}

@Component({
  selector: 'app-root',
  template: '<h1>Applikation</h1><div #headingRef></div>'
})
export class AppComponent implements AfterViewInit {
  @ViewChild('headingRef', { read: ViewContainerRef }) viewContainer: ViewContainerRef;

  constructor(private resolver: ComponentFactoryResolver) {
    this.resolver = resolver;
  }

  ngAfterViewInit() {
    let comp1 = this.resolver.resolveComponentFactory(HelloWorld);
    let comp2 = this.resolver.resolveComponentFactory(HelloAngular);

    setTimeout(() => { this.viewContainer.createComponent(comp1) }, 1000);
    setTimeout(() => { this.viewContainer.createComponent(comp2) }, 4000);
  }
}