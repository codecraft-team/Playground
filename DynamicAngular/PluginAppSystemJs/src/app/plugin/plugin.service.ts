import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs/Rx';
import { PluginMetaData } from './plugin-metadata';

@Injectable()
export class PluginService {
    plugins: any;
    change: any;

    constructor() {
        this.plugins = [];
        this.change = new ReplaySubject(1);
        this.loadPlugins();
    }

    loadPlugins() {
        this.plugins = [];
        System.import('/plugin.list.js').then((pluginsModule) => {
            pluginsModule.default.forEach(
                (pluginUrl: any) => this.loadPlugin(pluginUrl)
            );
        });
    }

    loadPlugin(url) {
        return System.import(url).then((pluginModule) => {
            const Plugin = pluginModule.default;
            const pluginData = {
                url,
                type: Plugin,
                config: Plugin._pluginConfig,
                instance: new Plugin()
            };
            this.plugins = this.plugins.concat([pluginData]);
            this.change.next(this.plugins);

        });
    }

    getPluginData(id) {
        return this.plugins.filter((pluginData) => pluginData.config.id === id)
            .map((data) => new PluginMetaData(data));
    }
}