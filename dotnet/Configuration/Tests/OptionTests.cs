using System;
using System.IO;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Tests.Settings;

namespace Tests {
  [TestClass]
  public class OptionTests {
    [TestMethod]
    public void TestApplicationSettings() {
      IConfigurationRoot configuration = new ConfigurationBuilder()
        .SetBasePath(Directory.GetCurrentDirectory())
        .AddJsonFile("appsettings.json")
        .Build();

      IServiceProvider serviceProvider = new ServiceCollection()
        .AddOptions()
        .Configure<AppSettings>(configuration)
        .BuildServiceProvider();

      IOptions<AppSettings> options = serviceProvider.GetService<IOptions<AppSettings>>();

      Assert.AreEqual("Setting1", options.Value.FirstLevelSection.Setting);
    }

    [TestMethod]
    public void TestGetSection() {
      IConfigurationRoot configuration = new ConfigurationBuilder()
        .SetBasePath(Directory.GetCurrentDirectory())
        .AddJsonFile("appsettings.json")
        .Build();

      IServiceProvider serviceProvider = new ServiceCollection()
        .AddOptions()
        .Configure<SecondLevelSection>(configuration.GetSection(nameof(FirstLevelSection)))
        .BuildServiceProvider();

      IOptions<SecondLevelSection> options = serviceProvider.GetService<IOptions<SecondLevelSection>>();

      Assert.AreEqual("Setting1", options.Value.Setting);
    }

    [TestMethod]
    public void TestCustomConfiguration() {
      IConfigurationRoot configuration = new ConfigurationBuilder()
        .SetBasePath(Directory.GetCurrentDirectory())
        .AddJsonFile("appsettings.json")
        .Build();

      IServiceProvider serviceProvider = new ServiceCollection()
        .AddOptions()
        .Configure<SecondLevelSection>(option => option.Setting = "CustomSetting")
        .BuildServiceProvider();

      IOptions<SecondLevelSection> options = serviceProvider.GetService<IOptions<SecondLevelSection>>();

      Assert.AreEqual("CustomSetting", options.Value.Setting);
    }
  }
}