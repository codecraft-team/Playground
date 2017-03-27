import { Component } from '@angular/core';
import { PluginService } from './plugin/plugin.service';

@Component({
  selector: 'my-app',
  template: `<h1>Hello {{name}}</h1>
  <button (click)='pluginHero()'>My Hero</button>
  <button (click)='pluginInfo()'>My Info</button>
  <button (click)='reload()'>Reload the moduleList</button>
  <plugin-area name="{{pluginName}}"></plugin-area>
  `,
})
export class AppComponent {
  constructor(private pluginService: PluginService) { }
  name = 'Angular';
  infoPlug = 'info-plug';
  heroPlug = 'hero-plug';
  pluginName;

  pluginHero() {
    this.pluginName = this.heroPlug;
  }

  pluginInfo() {
    this.pluginName = this.infoPlug;
  }

  reload() {
    this.pluginService.loadPlugins();
  }
}
