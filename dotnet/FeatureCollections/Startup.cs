using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Http.Features.Authentication;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace FeatureCollections
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Add framework services.
            services.AddMvc();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();
           
            app.Use(async (context, next) =>
            {
                Guid correlationId = Guid.NewGuid();

                Console.WriteLine($"Register feature with correlation id: {correlationId}");
                
                IFeatureCollection features = context.Features;
                features.Set<CorrelationFeature>(new CorrelationFeature(correlationId));

                await next();
            });

            app.Use(async (context, next) =>
            {
                IFeatureCollection features = context.Features;

                CorrelationFeature correlatinFeature = features.Get<CorrelationFeature>();
                
                Console.WriteLine($"CorrelationId: {correlatinFeature.Id}");

                IServiceProvidersFeature serviceProviderFeature = features.Get<IServiceProvidersFeature>();
                IServiceProvider service = serviceProviderFeature.RequestServices;
                
                await next();
            });

            app.UseMvc();
        }
    }
}
