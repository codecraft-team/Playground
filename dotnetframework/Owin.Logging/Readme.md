# Microsoft.Owin samples under .NET Framework 4.6.1

The following projects contains samples for the following basic scenarios:

- Logging:
  - Microsoft.Owin.Logging
  - System.Diagnostics.TraceSource
  - System.Diagnostics.TraceSwitch
- Dependency Injection
  - Autofac
- Testing
  - Microsoft.Owin.Testing

## Host

Console application project to host the web api. Dependencies:

- Microsoft.Owin.Hosting: required for owin self hosting.
- Microsoft.Owin.Host.HttpListener: required to start listening for http requests.

The self host starts with configuring the Startup class from the Services project.

```csharp
  static void Main(string[] args) {
    string url = "http://+:91";

    using (WebApp.Start<Startup>(url)) {
      Trace.TraceInformation($"Service started: '{url}'.");
      Trace.TraceInformation("Press enter to exit...");
      Console.ReadLine();
    }
  }
```

The Microsoft.Owin logging source configuration can be found in app.config. Please note that this is not equal to the default trace source (used in the main function).

```xml
  <system.diagnostics>
    <sharedListeners>
      <add name="file" type="System.Diagnostics.TextWriterTraceListener" initializeData="Microsoft.OWIN.trace.log"/>
      <add name="console" type="System.Diagnostics.ConsoleTraceListener" traceOutputOptions="Timestamp" />
    </sharedListeners>
    <sources>
      <source name="Microsoft.Owin" switchName="Microsoft.Owin" switchType="System.Diagnostics.SourceSwitch">
        <listeners>
          <add name="file"/>
          <add name="console"/>
        </listeners>
      </source>
    </sources>
    <switches>
      <add name="Microsoft.Owin" value="All" />
    </switches>
    <trace autoflush="true" indentsize="2" />
  </system.diagnostics>
```

## Services

Class library project, which contains the web api implementation. Dependencies:

- Microsoft.AspNet.WebApi.Owin: enables us to host ASP.NET Web API 2 in OWIN server.
- Autofac.WebApi2.Owin: OWIN support for ASP.NET Web API 2 integration for Autofac.

The Startup class configures the application to use Autofac, logging and Web API. Autofac is used for dependency injection. It will inject an ILogger factory function, if necessary. Autofac also knows every ApiController in the current assembly.

```csharp
  public class Startup {
    public void Configuration(IAppBuilder app) {
      ContainerBuilder containerBuilder = new ContainerBuilder();
      containerBuilder.RegisterApiControllers(GetType().Assembly);
      containerBuilder.Register<Func<string, ILogger>>(context => name => app.CreateLogger(name));

      IContainer autofacRootContainer = containerBuilder.Build();

      HttpConfiguration httpConfiguration = new HttpConfiguration {
        DependencyResolver = new AutofacWebApiDependencyResolver(autofacRootContainer)
      };
      httpConfiguration.MapHttpAttributeRoutes();

      app.UseLogging(true);
      app.UseAutofacMiddleware(autofacRootContainer);
      app.UseAutofacWebApi(httpConfiguration);
      app.UseWebApi(httpConfiguration);
    }
  }
```

The ```app.UseLogging(true)``` statement configures request and response logging for the application.

```csharp
  public static void UseLogging(this IAppBuilder appBuilder, bool isEnabled) {
    if (isEnabled) {
      appBuilder.Use<MessageLogging>(appBuilder);
    }
  }
```

The ```MessageLogging``` class is a simple OWIN middleware, which logs few properties of each request. The ```_logger = appBuilder.CreateLogger<MessageLogging>();``` creates a logger with a specific name, obtained from the type ```MessageLogging```.

```csharp
  public class MessageLogging : OwinMiddleware {
    private readonly ILogger _logger;

    public MessageLogging(OwinMiddleware next, IAppBuilder appBuilder) : base(next) {
      _logger = appBuilder.CreateLogger<MessageLogging>();
    }

    public override Task Invoke(IOwinContext context) {
      _logger.WriteVerbose($"{context.Request.Scheme} {context.Request.Method}: {context.Request.Path}");
      return Next.Invoke(context);
    }
  }
```

The application implements a controller, which is able to return the current server time. The controller depends on an ```ILogger``` factory, which will be injected automatically by Autofac (thanks to the ```containerBuilder.Register<Func<string, ILogger>>(context => name => app.CreateLogger(name));``` registration). The controller uses redundant logging, to show the difference between ```Microsoft.Owin``` trace source and the default trace source.

```csharp
  [RoutePrefix(RoutePrefix)]
  public class ServerTimeController : ApiController {
    public const string RoutePrefix = "servertime";
    private readonly ILogger _logger;

    public ServerTimeController(Func<string, ILogger> createLogger) {
      _logger = createLogger(RoutePrefix);
      Trace.TraceInformation("Time controller created.");
      _logger.WriteInformation("Time controller created (information logger from owin pipeline).");
    }

    [HttpGet, Route("")]
    public IHttpActionResult Get() {
      Trace.TraceInformation("Time controller GET...");
      _logger.WriteInformation("Time controller GET (information logger from owin pipeline)...");
      return Ok(DateTime.Now);
    }
  }
```

## Services Tests

Unit test project, which contains tests for the web api implementation using test server, without running IIS or http listener. Dependency:

- Microsoft.Owin.Testing: classes which help us to test OWIN components.

The following test configures the OWIN components in the same way as on application startup. The main difference is, that there is now real http listener which passes the request to the OWIN pipeline.

```csharp
[TestClass]
public class LoggingTests {
  [TestMethod]
  public async Task TestMethodName() {
    using (TestServer server = TestServer.Create<Startup>()) {
      using (HttpClient client = new HttpClient(server.Handler)) {
        HttpResponseMessage response = await client.GetAsync($"http://testserver/{ServerTimeController.RoutePrefix}");

        string responseContent = await response.Content.ReadAsStringAsync();
        JToken actualResult = JToken.Parse(responseContent);

        Assert.AreEqual(JTokenType.Date, actualResult.Type);
      }
    }
  }
}
```