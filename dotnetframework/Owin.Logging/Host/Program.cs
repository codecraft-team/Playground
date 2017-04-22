using System;
using System.Diagnostics;
using Microsoft.Owin.Hosting;
using Owin.Logging.Services;

namespace Owin.Logging.Host {
  // ReSharper disable once ArrangeTypeModifiers
  class Program {
    // ReSharper disable once UnusedParameter.Local
    static void Main(string[] args) {
      string url = "http://+:91";

      using (WebApp.Start<Startup>(url)) {
        Trace.TraceInformation($"Service started: '{url}'.");
        Trace.TraceInformation("Press enter to exit...");
        Console.ReadLine();
      }
    }
  }
}