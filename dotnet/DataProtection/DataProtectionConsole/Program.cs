using System;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.Extensions.DependencyInjection;

namespace DataProtectionConsole {
  public class Program {
    public static void Main(string[] args) {
      ServiceCollection services = new ServiceCollection();
      services.AddDataProtection();

      ServiceProvider serviceProvider = services.BuildServiceProvider();

      IDataProtectionProvider protectionProvider = serviceProvider.GetService<IDataProtectionProvider>();

      IDataProtector protector = protectionProvider.CreateProtector("Sample");

      Console.Write("Enter input: ");
      string input = Console.ReadLine();

      string protectedPayload = protector.Protect(input);
      Console.WriteLine($"Protect returned: {protectedPayload}");

      // unprotect the payload
      string unprotectedPayload = protector.Unprotect(protectedPayload);
      Console.WriteLine($"Unprotect returned: {unprotectedPayload}");

      Console.ReadLine();
    }
  }
}