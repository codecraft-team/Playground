using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Logging;

namespace FileUpload {
  public class Program {
    public static void Main(string[] args) {
      BuildWebHost(args).Run();
    }

    public static IWebHost BuildWebHost(string[] args) {
      return WebHost.CreateDefaultBuilder(args)
        .UseKestrel(options => options.Limits.MaxRequestBodySize = null)
        .UseStartup<Startup>()
        .Build();
    }
  }
}