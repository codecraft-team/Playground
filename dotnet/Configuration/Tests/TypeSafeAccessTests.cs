using System.IO;
using Microsoft.Extensions.Configuration;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Tests.Settings;

namespace Tests {
  [TestClass]
  public class TypeSafeAccessTests {
    [TestMethod]
    public void TestAllSettings() {
      IConfigurationRoot configuration = new ConfigurationBuilder()
        .SetBasePath(Directory.GetCurrentDirectory())
        .AddJsonFile("appsettings.json")
        .Build();

      AppSettings settings = configuration.Get<AppSettings>();

      Assert.AreEqual("Setting1", settings.FirstLevelSection.Setting);
      Assert.AreEqual("Setting2", settings.FirstLevelSection.SecondLevelSection.Setting);
    }

    [TestMethod]
    public void TestGetSection() {
      IConfigurationRoot configuration = new ConfigurationBuilder()
        .SetBasePath(Directory.GetCurrentDirectory())
        .AddJsonFile("appsettings.json")
        .Build();

      IConfigurationSection configurationSection = configuration.GetSection(nameof(FirstLevelSection));
      FirstLevelSection firstLevelSection = configurationSection.Get<FirstLevelSection>();

      Assert.AreEqual("Setting1", firstLevelSection.Setting);
      Assert.AreEqual("Setting2", firstLevelSection.SecondLevelSection.Setting);
    }

    /// <summary>
    /// Remark: direct access to lower level sections is not supported.
    /// </summary>
    [TestMethod]
    public void TestGetHierarchicalSection() {
      IConfigurationRoot configuration = new ConfigurationBuilder()
        .SetBasePath(Directory.GetCurrentDirectory())
        .AddJsonFile("appsettings.json")
        .Build();

      IConfigurationSection configurationSection = configuration.GetSection(nameof(SecondLevelSection));
      SecondLevelSection secondLevelSection = configurationSection.Get<SecondLevelSection>();

      Assert.IsNull(secondLevelSection);
    }

    [TestMethod]
    public void TestGetSectionUsingExtensionMethod() {
      IConfigurationRoot configuration = new ConfigurationBuilder()
        .SetBasePath(Directory.GetCurrentDirectory())
        .AddJsonFile("appsettings.json")
        .Build();

      FirstLevelSection firstLevelSection = configuration.GetSection<FirstLevelSection>(); //GetSection<T> is a custom extensionmethod

      Assert.AreEqual("Setting1", firstLevelSection.Setting);
    }

    [TestMethod]
    public void TestGetSectionUsingBind() {
      IConfigurationRoot configuration = new ConfigurationBuilder()
        .SetBasePath(Directory.GetCurrentDirectory())
        .AddJsonFile("appsettings.json")
        .Build();

      FirstLevelSection firstLevelSection = new FirstLevelSection();

      IConfigurationSection configurationSection = configuration.GetSection(nameof(FirstLevelSection));
      configurationSection.Bind(firstLevelSection);

      Assert.AreEqual("Setting1", firstLevelSection.Setting);
    }
  }
}