using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Extensions.Configuration;

namespace ConsoleApplication {
  class Program {
    static void Main(string[] args) {
      IDictionary<string, string> mappings = new Dictionary<string, string> {
        { "-option1", "option1"}
      };

      IConfigurationRoot configuration = new ConfigurationBuilder()
        .AddEnvironmentVariables()
        .AddCommandLine(Environment.GetCommandLineArgs().Skip(1).ToArray(), mappings)
        .Build();

      string cmdOption1 = configuration["cmdOption1"];

      Console.WriteLine($"Commandline argument cmdOption1: {cmdOption1}");

      string envOption1 = configuration["EnvOption1"];

      Console.WriteLine($"Commandline argument EnvOption1: {envOption1}");

      string option1 = configuration["option1"];

      Console.WriteLine($"Overriden commandline argument option1: {option1}");

      Console.ReadLine();
    }
  }
}