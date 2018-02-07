using Microsoft.Extensions.Logging;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Tests {
  [TestClass]
  public class LoggerMessageTests {
    [TestMethod]
    public void TestLoggerMessage() {
      using (ILoggerFactory factory = new LoggerFactory()) {
        factory.AddDebug();
        factory.AddConsole();

        ILogger logger = factory.CreateLogger("Tests");
        logger.LogInformation("Slower log message: {0}", 1); //boxing
        logger.LogInfo(1); // no boxing
      }
    }
  }
}