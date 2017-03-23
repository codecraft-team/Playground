import {
    Component, NgModule,
    ViewContainerRef,
    Compiler,
    ComponentFactory,
    ComponentFactoryResolver,
    ModuleWithComponentFactories,
    ComponentRef,
    ReflectiveInjector,
    SystemJsNgModuleLoader,
    OnInit
} from '@angular/core';

export class ModuleConfig { modulePath: string; componentName: string; }

@Component({
    selector: 'my-app',
    template: `<h1>Hello {{name}}</h1>`,
})
export class AppComponent implements OnInit {
    module: ModuleConfig;
    componentRef: ComponentRef<any>;
    name = 'Angular';

    constructor(private viewref: ViewContainerRef,
        private loader: SystemJsNgModuleLoader,
        private compiler: Compiler) {
        this.module = new ModuleConfig();
        this.module.modulePath = "ext/test.module.js#DynamicModule";
        this.module.componentName = "TestComponent";
    }

    ngOnInit() {
        this.loadModule(this.module);
    }

    loadModule(module: any) {
        this.loader.load(module.modulePath)  // load the module from the javascript file
            .then((moduleFactory) => {
                this.compiler.compileModuleAndAllComponentsAsync<any>(moduleFactory.moduleType)
                    .then((factory: ModuleWithComponentFactories<any>) => {
                        return factory.componentFactories.find(x => x.componentType.name === module.componentName);
                    })
                    .then(componentFactory => {
                        // instantiate the Module so we can use it as the provider for the new component
                        let moduleReference = moduleFactory.create(this.viewref.parentInjector);
                        // add the componet to the view (settimeout is only to have a short break before demonstrate it)
                        setTimeout(() => {
                            this.componentRef = this.viewref.createComponent(componentFactory, 0, moduleReference.injector);
                        }, 2000);
                    });
            });
    }

    ngOnDestroy() {
        if (this.componentRef) {
            this.componentRef.destroy();
        }
    }
}
