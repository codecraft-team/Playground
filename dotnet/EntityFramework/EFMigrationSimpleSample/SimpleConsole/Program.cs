using System;
using System.IO;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using SimpleEf;

namespace SimpleConsole
{
  internal class Program
  {
    private static void Main(string[] args)
    {
      Console.WriteLine("Hello World!");

      IConfigurationRoot configuration = new ConfigurationBuilder()
          .SetBasePath(Directory.GetCurrentDirectory())
          .AddJsonFile($"appsettings.Development.json")
          .Build()
        ;

      string connectionString = configuration.GetConnectionString("(default)");


      var optionsBuilder = new DbContextOptionsBuilder<DataContext>();
      optionsBuilder.UseSqlServer(connectionString);


      using (var dataContext = new DataContext(optionsBuilder.Options))
      {
        dataContext.MemberShips.Add(new MemberShip {Id = Guid.NewGuid(), Name = "Blub"});
        dataContext.SaveChanges();
      }

      Console.ReadKey();
    }
  }
}