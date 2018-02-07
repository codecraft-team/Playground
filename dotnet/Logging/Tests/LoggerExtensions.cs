using System;
using Microsoft.Extensions.Logging;

namespace Tests {
  public static class LoggerExtensions {

    private static readonly Action<ILogger, int, Exception> _logInfo = LoggerMessage.Define<int>(LogLevel.Information, new EventId(0, ""), "High performance log message: {number}");

    public static void LogInfo(this ILogger logger, int number) {
      _logInfo(logger, number, null);
    }
  }
}