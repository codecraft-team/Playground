using System.IO;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Tests {
  [TestClass]
  public class ConsoleLoggerTests {
    [TestMethod]
    public void TestDefaultConsoleLoggerConfiguration() {
      IConfigurationRoot configuration = new ConfigurationBuilder()
        .SetBasePath(Directory.GetCurrentDirectory())
        .AddJsonFile("appsettings.json")
        .Build();

      using(ILoggerFactory factory = new LoggerFactory()) {
        factory.AddConsole(configuration.GetSection("Logging"));

        ILogger logger = factory.CreateLogger("anyotherlogger");
        logger.LogInformation("Message should not be logged due to configured LogLevel.");
        logger.LogWarning("Message should be logged.");
        logger.LogError("Message should be logged.");
      }
    }

    [TestMethod]
    public void TestConsoleLoggerConfiguration() {
      IConfigurationRoot configuration = new ConfigurationBuilder()
        .SetBasePath(Directory.GetCurrentDirectory())
        .AddJsonFile("appsettings.json")
        .Build();

      using(ILoggerFactory factory = new LoggerFactory()) {
        factory.AddConsole(configuration.GetSection("Logging"));

        ILogger logger = factory.CreateLogger("anyotherlogger");
        logger.LogInformation("Message should not be logged due to configured LogLevel.");
        logger.LogWarning("Message should be logged.");

        ILogger testCategoryLogger = factory.CreateLogger("Test");
        testCategoryLogger.LogDebug("Message should be logged.");
        testCategoryLogger.LogInformation("Message should be logged.");
        testCategoryLogger.LogWarning("Message should be logged.");
        testCategoryLogger.LogError("Message should be logged.");
      }
    }
  }
}