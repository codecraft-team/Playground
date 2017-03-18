import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent, HelloWorld, HelloAngular } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    HelloWorld,
    HelloAngular
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  entryComponents: [HelloWorld, HelloAngular],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
