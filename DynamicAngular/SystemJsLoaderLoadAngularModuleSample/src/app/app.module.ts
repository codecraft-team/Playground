import { Component, NgModule, SystemJsNgModuleLoader, NgModuleFactory } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

@NgModule({
  imports: [BrowserModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: [SystemJsNgModuleLoader]
})
export class AppModule { }
