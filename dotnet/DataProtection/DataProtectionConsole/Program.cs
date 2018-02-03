using System;
using System.IO;
using System.Security.Cryptography.X509Certificates;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.Extensions.DependencyInjection;

namespace DataProtectionConsole {
  public class Program {
    public static void Main(string[] args) {
      X509Certificate2 certificate;

      X509Store x509Store = new X509Store(StoreName.My, StoreLocation.CurrentUser);
      x509Store.Open(OpenFlags.ReadOnly);

      if (args.Length > 0 && args[0] == "-i") {
        certificate = new X509Certificate2(args[1], args[2]);

        x509Store.Close();
        x509Store.Open(OpenFlags.ReadWrite);
        x509Store.Add(certificate);
      }

      X509Certificate2Collection certificates = x509Store.Certificates.Find(X509FindType.FindByThumbprint, "b3efa09fb30022479a9d03d164b49729f74064da", false);

      if (certificates.Count == 0) {
        Console.WriteLine("Certificate not found.");
        Console.ReadLine();
        return;
      }

      certificate = certificates[0];

      ServiceCollection services = new ServiceCollection();
      services.AddDataProtection()
        .SetApplicationName("DataProtection")
        .PersistKeysToFileSystem(new DirectoryInfo("./keys"))
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