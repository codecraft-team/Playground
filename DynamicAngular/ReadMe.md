# Dynamic loading Modules in Angular

This is a serie of examples to collecting experience in what it is necessary to load Angular Modules absolutely dynamically.

The samples are created in following order and with the described intention to get a idea of a small part of the whole cake :-)

1. DynamicComponentSimpleLoadSample
  * Loading a Angular Component with ViewContainerRef  
  * Webpack Environment
  * Result - Basic function how to add in DOM something in Angular
2. DynamicNgComponentOutletSample
  * Excursion to Angular 4 new function NgComponentOutlet to load a componet  
  * Webpack Environment
3. DynamicComponentSimpleCompilerSample
  * Loading a whole Angular Module (NgModule) with the Angular Compiler  
  * Webpack Environment
  * Result - not loading only a component also a whole Module
4. SystemJsLoaderWithSystemJsSample
  * Loading a NgModule from a external Javascript file (without references in AppModule class)  
  * switching to SystemJs environment (with Webpack it was not possible to load a file without creating a chunk file (using through Angular-Cli))  
  * Result - With the Angular Service function SystemJsNgModuleLoader it is possible to load a javascript file and to get the Module inside as a NgModuleFactory. 
  