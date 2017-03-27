import { PluginConfig } from '../app/plugin/plugin-metadata';

export default function HeroPlugin() { }
PluginConfig(
    {
        id: 'hero-plug',
        name: 'hero',
        description: 'Hero component',
        order: 1,
        componentName: 'MyHeroAppComponent',
        modulePath: 'plugins/hero.bundle#MyHeroAppModule',
        bundleName: 'src/app/hero.module.js'
    }
)(HeroPlugin);
