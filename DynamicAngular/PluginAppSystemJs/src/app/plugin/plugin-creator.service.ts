import {
    ViewContainerRef,
    ComponentFactoryResolver,
    Compiler, ModuleWithComponentFactories,
    ComponentRef, NgModuleFactory, OnChanges, OnDestroy, Injectable
} from '@angular/core';

import { PluginMetaData } from './plugin-metadata';
import { PluginService } from './plugin.service';

@Injectable()
export class PluginCreatorService {
    componentRefs: ComponentRef<any>[];
    pluginChangeSubscription: any;
    moduleFactory: NgModuleFactory<any>;
    viewContainerRef: ViewContainerRef;

    constructor(
        private componentResolver: ComponentFactoryResolver,
        private pluginService: PluginService,
        private compiler: Compiler
    ) {
        this.componentRefs = [];
    }

    initialize(name, viewContainerRef: ViewContainerRef) {
        this.viewContainerRef = viewContainerRef;

        if (this.componentRefs.length > 0) {
            this.componentRefs.forEach(
                (componentRef) => componentRef.destroy()
            );
            this.componentRefs = [];
        }

        const pluginData = this.pluginService.getPluginData(name);
        return Promise.all(pluginData.map((pluginData) => this.createAndShowComponent(pluginData)));
    }

    createAndShowComponent(pluginData: PluginMetaData) {
        var _this = this;
        var _moduleInfo = pluginData.modulePath.split('#'), module = _moduleInfo[0], exportName = _moduleInfo[1];
        System.import(module).then(
            function () {
                System.import(pluginData.bundleName).then((moduleObject) => {
                    var ngmodel = moduleObject[exportName];
                    _this.moduleFactory = _this.compiler.compileModuleSync(ngmodel);

                    _this.compiler.compileModuleAndAllComponentsAsync<any>(_this.moduleFactory.moduleType)

                        .then((factory: ModuleWithComponentFactories<any>) => {
                            return factory.componentFactories.find(x => x.componentType.name === pluginData.componentName);
                        })
                        .then(cmpFactory => {
                            // need to instantiate the Module so we can use it as the provider for the new component
                            let modRef = _this.moduleFactory.create(_this.viewContainerRef.parentInjector);
                            const componentRefs = _this.viewContainerRef.createComponent(cmpFactory, 0, modRef.injector);
                            // done, now Module and main Component are known to NG2
                            _this.componentRefs.push(componentRefs);
                        });
                })
            })
    }
}