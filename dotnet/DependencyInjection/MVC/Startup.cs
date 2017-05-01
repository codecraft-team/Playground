using System;
using DependencyInjection.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace DependencyInjection {
  public class Startup {
    public Startup(IHostingEnvironment env) {
      IConfigurationBuilder builder = new ConfigurationBuilder()
        .SetBasePath(env.ContentRootPath)
        .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
        .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
        .AddEnvironmentVariables();

      Configuration = builder.Build();
    }

    public IConfigurationRoot Configuration { get; }

    // This method gets called by the runtime. Use this method to add services to the container.

    public void ConfigureServices(IServiceCollection services) {
      // Core types used to register services.
      ServiceDescriptor descriptor = new ServiceDescriptor(typeof(IService), typeof(Service), ServiceLifetime.Transient);
      services.Add(descriptor);

      // Extension method used to register services.
      services.AddTransient<Func<IService>>(provider => () => new Service());

      // Add framework services.
      services.AddMvc();
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory, IService service) {
      IServiceProvider appServices = app.ApplicationServices;
      IService appService = appServices.GetService<IService>();

      app.Use(next => httpContext => {
        IServiceProvider requestServices = httpContext.RequestServices;
        IService requestService = requestServices.GetService<IService>();

        return next(httpContext);
      });

      app.Use(next => httpContext => {
        IServiceProvider requestServices = httpContext.RequestServices;
        Func<IService> requestServiceFactory = requestServices.GetService<Func<IService>>();

        IService resolvedService = requestServiceFactory();

        return next(httpContext);
      });
      
      loggerFactory.AddConsole(Configuration.GetSection("Logging"));
      loggerFactory.AddDebug();

      if(env.IsDevelopment()) {
        app.UseDeveloperExceptionPage();
        app.UseBrowserLink();
      }
      else {
        app.UseExceptionHandler("/Home/Error");
      }

      app.UseStaticFiles();
      app.UseMvcWithDefaultRoute();
    }
  }
}