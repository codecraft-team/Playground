using System;
using System.Web.Http;
using Autofac;
using Autofac.Integration.WebApi;
using Microsoft.Owin.Logging;
using Owin.Logging.Services.Middlewares;

namespace Owin.Logging.Services {
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
}