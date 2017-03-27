import { PluginConfig } from '../app/plugin/plugin-metadata';

export default function AppPlugin() { }
PluginConfig(
    {
        id: 'info-plug',
        name: 'plug-info',
        description: 'My first plugin',
        order: 1,
        componentName: 'MyAppComponent',
        modulePath: 'plugins/myApp.bundle#MyAppModule',
        bundleName: 'lib/app/app.module.js'
    }
)(AppPlugin);
