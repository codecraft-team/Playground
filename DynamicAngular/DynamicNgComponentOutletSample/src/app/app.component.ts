import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: '<h1>Hallo World.....</h1>'
})
export class HelloWorld { }

@Component({
  selector: 'my-app',
  template: '<h1>Hello Angular.</h1>'
})
export class HelloAngular { }

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  helloWorldComponent = HelloWorld;

  changeComponent() {
    this.helloWorldComponent = HelloAngular;
  }
}
