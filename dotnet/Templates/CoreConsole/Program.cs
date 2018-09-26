using System;
using Microsoft.Extensions.DependencyInjection;

namespace CoreConsole {
  internal class Program {
    private static int Main(string[] args) {
      string environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");

      if (string.IsNullOrWhiteSpace(environment)) {
        ConsoleColor color = Console.ForegroundColor;
        Console.ForegroundColor = ConsoleColor.Red;
        Console.WriteLine("ASPNETCORE_ENVIRONMENT not set. Set environment variable to corresponding environment like 'development', 'test', 'production', ... .");
        Console.ForegroundColor = color;
        return -1;
      }

      ServiceCollection services = new ServiceCollection();

      Startup startup = new Startup(environment, args);
      startup.ConfigureServices(services);

      using (ServiceProvider buildServiceProvider = services.BuildServiceProvider()) {
        return startup.Run(buildServiceProvider);
      }
    }
  }
}