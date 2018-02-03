using System.IO;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Tests {
  [TestClass]
  public class DILoggerTests {
    [TestMethod]
    public void TestDefaultDISetup() {
      IConfiguration configuration = new ConfigurationBuilder()
        .SetBasePath(Directory.GetCurrentDirectory())
        .AddJsonFile("appsettings.json")
        .Build();

      ServiceCollection services = new ServiceCollection();
      services.AddLogging(loggingBuilder => {
        loggingBuilder.AddConfiguration(configuration.GetSection("Logging"))
          .AddDebug()
          .AddConsole();
      });

      ServiceProvider serviceProvider = services.BuildServiceProvider();
      ILogger<DILoggerTests> logger = serviceProvider.GetService<ILogger<DILoggerTests>>();

      logger.LogInformation("Hello from logger");
    }

    [TestMethod]
    public void TestDefaultDIConfiguration() {
      IConfiguration configuration = new ConfigurationBuilder()
        .SetBasePath(Directory.GetCurrentDirectory())
        .AddJsonFile("appsettings.json")
        .Build();

      ServiceCollection services = new ServiceCollection();
      services.AddLogging(loggingBuilder => {
        loggingBuilder.AddConfiguration(configuration.GetSection("Logging"))
          .AddDebug()
          .AddConsole();
      });

      ServiceProvider serviceProvider = services.BuildServiceProvider();
      ILogger<DILoggerTests> logger = serviceProvider.GetService<ILogger<DILoggerTests>>();

      logger.LogInformation("This should be visible due to configuration");
      logger.LogDebug("This should NOT be visible due to configuration");
    }
  }
}