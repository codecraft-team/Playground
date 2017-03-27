export function PluginConfig(config) {
  return (type) => {
    type._pluginConfig = config;
  };
}

export class PluginMetaData {
  id: string;
  name: string;
  description: string;
  order: number;
  componentName: string;
  modulePath: string;
  bundleName: string;
  plugin;
  constructor(plugin) {
    this.plugin = plugin;
    this.id = plugin.config.id;
    this.name = plugin.config.name;
    this.description = plugin.config.description;
    this.order = plugin.config.order;
    this.componentName = plugin.config.componentName;
    this.modulePath = plugin.config.modulePath;
    this.bundleName = plugin.config.bundleName;
  }
}
