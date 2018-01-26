using System;
using System.IO;
using System.Security.Cryptography.X509Certificates;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.Extensions.DependencyInjection;

namespace DataProtectionConsole {
  public class Program {
    public static void Main(string[] args) {
      X509Certificate2 certificate = new X509Certificate2(File.ReadAllBytes(args[0]), args[1]);

      ServiceCollection services = new ServiceCollection();
      services.AddDataProtection()
        .SetApplicationName("DataProtection")
        .PersistKeysToFileSystem(new DirectoryInfo(".\\keys"))
        .ProtectKeysWithCertificate(certificate);

      ServiceProvider serviceProvider = services.BuildServiceProvider();

      IDataProtectionProvider protectionProvider = serviceProvider.GetService<IDataProtectionProvider>();
      IDataProtector protector = protectionProvider.CreateProtector("Sample");

      Console.Write("Enter input: ");
      string input = Console.ReadLine();

      string protectedPayload = protector.Protect(input);
      Console.WriteLine($"Protect returned: {protectedPayload}");

      string unprotectedPayload = protector.Unprotect(protectedPayload);
      Console.WriteLine($"Unprotect returned: {unprotectedPayload}");

      Console.ReadLine();
    }
  }
}