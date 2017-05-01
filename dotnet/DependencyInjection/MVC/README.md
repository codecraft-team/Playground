# Walkthrough
The solution contains an IService interface and a Service implementation (see Services folder). A basic DI container configuration is used to demonstrate core registration and extension methods.  

Registration scenarios:
* Simple type mappings: Interface to class: IService -> Service
* Delegate mappings: Func<IService> -> new Service()

Resolving scenarios:
* Startup.Configure: IService as paramter
* Startup.Configure: accessing ApplicationServices
* app.Use: accessing RequestServices
* Middleware: method DI with custom middleware
* HomeController: Constructor DI, method DI and property DI (custom attribute implemented - see Services/InjectAttribute)
* View: @inject directive used to inject an instance directly into a view