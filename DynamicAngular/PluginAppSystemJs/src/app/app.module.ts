import { NgModule, SystemJsNgModuleLoader } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PluginService } from './plugin/plugin.service';
import { PluginDirective } from './plugin.directive';
import { PluginCreatorService } from './plugin/plugin-creator.service';


@NgModule({
  imports: [BrowserModule],
  declarations: [AppComponent, PluginDirective],
  bootstrap: [AppComponent],
  providers: [PluginService, SystemJsNgModuleLoader, PluginCreatorService]
})
export class AppModule { }
