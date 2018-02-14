using System;
using System.Collections.Generic;
using System.IO;
using CoreConsole.Configuration;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace CoreConsole {
  internal class Startup {
    public IConfiguration Configuration { get; }

    public Startup(string environment, string[] args) {
      IDictionary<string, string> mappings = new Dictionary<string, string> {
        {"-o", "option"},
        {"-s", "setting"}
      };

      Configuration = new ConfigurationBuilder()
        .SetBasePath(Directory.GetCurrentDirectory())
        .AddJsonFile("appsettings.json", true)
        .AddJsonFile($"appsettings.{environment}.json", true)
        .AddEnvironmentVariables()
        .AddCommandLine(args, mappings)
        .Build();
    }

    public void ConfigureServices(IServiceCollection services) {
      services
        .AddOptions()
        .Configure<CoreConsoleSettings>(Configuration.GetSection(nameof(CoreConsoleSettings)))
        .AddLogging(loggingBuilder => {
          loggingBuilder.AddConfiguration(Configuration.GetSection("Logging"))
            .AddDebug()
            .AddConsole();
        });
    }

    public int Run(IServiceProvider serviceProvider) {
      Console.WriteLine("Hello World");

      return 0;
    }
  }
}