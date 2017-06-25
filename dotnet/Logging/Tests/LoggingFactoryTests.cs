using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Logging.Console;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Tests {
  [TestClass]
  public class LoggingFactoryTests {
    [TestMethod]
    public void TestCreateLoggerFactory() {
      using (ILoggerFactory factory = new LoggerFactory()) {
        factory.AddDebug();
        factory.AddConsole();

        ILogger logger = factory.CreateLogger("Tests");
        logger.LogInformation("First log message");
      }
    }

    [TestMethod]
    public void TestAddingProvider() {
      using (ILoggerFactory factory = new LoggerFactory()) {
        factory.AddProvider(new ConsoleLoggerProvider((message, logLevel) => logLevel < LogLevel.None, true));

        ILogger logger = factory.CreateLogger<LoggingFactoryTests>();
        logger.LogDebug("This message will be logged");
      }
    }

    [TestMethod]
    public void TestFilter() {
      using (ILoggerFactory factory = new LoggerFactory()) {
        factory.AddConsole((message, logLevel) => logLevel == LogLevel.Information, true);

        ILogger logger = factory.CreateLogger<LoggingFactoryTests>();
        logger.LogDebug("This message will not be logged");
      }
    }
  }
}