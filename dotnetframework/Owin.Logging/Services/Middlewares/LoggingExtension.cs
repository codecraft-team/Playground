namespace Owin.Logging.Services.Middlewares {
  public static class LoggingExtension {
    public static void UseLogging(this IAppBuilder appBuilder, bool isEnabled) {
      if (isEnabled) {
        appBuilder.Use<MessageLogging>(appBuilder);
      }
    }
  }
}