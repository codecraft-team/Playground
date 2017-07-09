using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.Extensions.Configuration;

namespace SimpleEf
{
  public class DbContextFactory : IDbContextFactory<DataContext>
  {
    public DataContext Create(DbContextFactoryOptions options)
    {

      Console.WriteLine($"ContentRootPath: {options.ContentRootPath}");
      Console.WriteLine($"EnvironmentName: {options.EnvironmentName}");
      Console.WriteLine($"ApplikationBasePath: {options.ApplicationBasePath}");


      IConfigurationRoot configuration = new ConfigurationBuilder()
        .SetBasePath(options.ContentRootPath)
        .AddJsonFile($"appsettings.{options.EnvironmentName}.json")
        .Build()
        ;

      string connectionString = configuration.GetConnectionString("(default)");
      Console.WriteLine($"ConnectionString: {connectionString}");

      return Create(connectionString);
    }



    private DataContext Create(string connectionString)
    {
      var optionsBuilder = new DbContextOptionsBuilder<DataContext>();
      optionsBuilder.UseSqlServer(connectionString);
       
      return new DataContext(optionsBuilder.Options);

    }

  }
}