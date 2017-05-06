using System.IO;
using Microsoft.Extensions.Configuration;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Tests {
  [TestClass]
  public class OrderTests {
    /// <summary>
    /// Test the whether latest loaded configuration overrides preceeding one.
    /// </summary>
    [TestMethod]
    public void TestProductionConfiguration() {
      IConfigurationRoot configuration = new ConfigurationBuilder()
        .SetBasePath(Directory.GetCurrentDirectory())
        .AddJsonFile("appsettings.json")
        .AddJsonFile("appsettings.production.json")
        .Build();

      string option1 = configuration["option1"];

      Assert.AreEqual("prodValue1", option1);
    }

    /// <summary>
    /// Test the whether latest loaded configuration overrides preceeding one.
    /// </summary>
    [TestMethod]
    public void TestProductionOverriden() {
      IConfigurationRoot configuration = new ConfigurationBuilder()
        .SetBasePath(Directory.GetCurrentDirectory())
        .AddJsonFile("appsettings.production.json")
        .AddJsonFile("appsettings.json")
        .Build();

      string option1 = configuration["option1"];

      Assert.AreEqual("value1", option1);
    }

    [TestMethod]
    public void TestProductionOverridenEvenUsingDifferentSources() {
      IConfigurationRoot configuration = new ConfigurationBuilder()
        .SetBasePath(Directory.GetCurrentDirectory())
        .AddJsonFile("appsettings.production.json")
        .AddJsonFile("appsettings.json")
        .AddXmlFile("appsettings.xml")
        .Build();

      string option1 = configuration["option1"];

      Assert.AreEqual("xmlValue1", option1);
    }
  }
}