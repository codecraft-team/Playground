using System.IO;
using Microsoft.Extensions.Configuration;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Tests {
  [TestClass]
  public class UntypedAccessTests {
    [TestMethod]
    public void TestGetSingleValue() {
      IConfigurationRoot configuration = new ConfigurationBuilder()
        .SetBasePath(Directory.GetCurrentDirectory())
        .AddJsonFile("appsettings.json")
        .Build();

      string option1 = configuration["option1"];

      Assert.AreEqual("value1", option1);
    }

    [TestMethod]
    public void TestGetHierarchicalValue() {
      IConfigurationRoot configuration = new ConfigurationBuilder()
        .SetBasePath(Directory.GetCurrentDirectory())
        .AddJsonFile("appsettings.json")
        .Build();

      string firstLevelSetting = configuration["FirstLevelSection:Setting"];
      string secondLevelSetting = configuration["FirstLevelSection:SecondLevelSection:Setting"];

      Assert.AreEqual("Setting1", firstLevelSetting);
      Assert.AreEqual("Setting2", secondLevelSetting);
    }
  }
}