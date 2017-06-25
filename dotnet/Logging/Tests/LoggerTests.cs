using System;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Logging.Console;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Tests {
  [TestClass]
  public class LoggerTests {
    [TestMethod]
    public void TestCreateLogger() {
      using (ILoggerFactory factory = new LoggerFactory()) {
        factory.AddDebug();
        factory.AddConsole();

        ILogger logger = factory.CreateLogger("Tests");
        logger.LogInformation("First log message");
      }
    }

    [TestMethod]
    public void TestLog() {
      InvalidOperationException exception = new InvalidOperationException("Logged exception");

      using(ILoggerFactory factory = new LoggerFactory()) {
        factory.AddConsole();

        ILogger logger = factory.CreateLogger<LoggingFactoryTests>();
        logger.LogInformation("This log is written in {0}", nameof(TestLog));
        logger.LogError(2, exception, "Exception logging");
      }
    }

    [TestMethod]
    public void TestLoggerScopes() {
      using (ILoggerFactory factory = new LoggerFactory()) {
        factory.AddConsole(true);

        ILogger logger = factory.CreateLogger<LoggingFactoryTests>();

        logger.LogInformation("Before scope");

        using (logger.BeginScope("First scope")) {
          using (logger.BeginScope("Second scope")) {
            logger.LogInformation("Within scopes");
          }
        }

        logger.LogInformation("After scope");
      }
    }
  }
}