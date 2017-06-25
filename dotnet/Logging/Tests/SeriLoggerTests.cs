using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Serilog;
using ILogger = Microsoft.Extensions.Logging.ILogger;

namespace Tests {
  [TestClass]
  public class SeriLoggerTests {
    [TestMethod]
    public void TestSeriLog() {
      Log.Logger = new LoggerConfiguration()
        .MinimumLevel.Debug()
        .WriteTo.LiterateConsole()
        .WriteTo.Trace()
        .Enrich.FromLogContext()
        .CreateLogger();

      using (ILoggerFactory factory = new LoggerFactory()) {
        factory.AddSerilog();

        ILogger logger = factory.CreateLogger("anyotherlogger");
        logger.LogInformation("Message should not be logged due to configured LogLevel.");
        logger.LogWarning("Message should be logged.");
        logger.LogError("Message should be logged.");
      }
    }

    [TestMethod]
    public void TestSeriLogConfiguration() {
      IConfigurationRoot configuration = new ConfigurationBuilder()
        .AddJsonFile("appsettings.json")
        .Build();

      Log.Logger = new LoggerConfiguration()
        .ReadFrom.Configuration(configuration)
        .CreateLogger();

      using (ILoggerFactory factory = new LoggerFactory()) {
        factory.AddSerilog();

        ILogger logger = factory.CreateLogger("anyotherlogger");
        logger.LogInformation("Message should not be logged due to configured LogLevel.");
        logger.LogWarning("Message should be logged.");
        logger.LogError("Message should be logged.");
      }
    }
  }
}