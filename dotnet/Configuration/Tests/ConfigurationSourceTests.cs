using System;
using System.IO;
using Microsoft.Extensions.Configuration;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Tests {
  [TestClass]
  public class ConfigurationSourceTests {
    [TestMethod]
    public void TestInMemorySource() {
      IConfiguration configuration = new ConfigurationBuilder()
        .AddInMemoryCollection()
        .Build();

      configuration["option1"] = "value1";

      string option1 = configuration["option1"];

      Assert.AreEqual("value1", option1);
    }

    [TestMethod]
    public void TestJsonSource() {
      IConfigurationRoot configuration = new ConfigurationBuilder()
        .SetBasePath(Directory.GetCurrentDirectory())
        .AddJsonFile("appsettings.json")
        .Build();

      string option1 = configuration["option1"];

      Assert.AreEqual("value1", option1);
    }

    [TestMethod]
    public void TestOptionalJsonSource() {
      IConfigurationRoot configuration = new ConfigurationBuilder()
        .SetBasePath(Directory.GetCurrentDirectory())
        .AddJsonFile("appsettings.json")
        .AddJsonFile("appsettings.development.json", optional:true)
        .Build();

      string option1 = configuration["option1"];

      Assert.AreEqual("value1", option1);
    }

    [TestMethod]
    [ExpectedException(typeof(FileNotFoundException))]
    public void TestRequiredJsonSource() {
      IConfigurationRoot configuration = new ConfigurationBuilder()
        .SetBasePath(Directory.GetCurrentDirectory())
        .AddJsonFile("appsettings.json")
        .AddJsonFile("appsettings.development.json")
        .Build();
    }

    [TestMethod]
    public void TestXmlSource() {
      IConfigurationRoot configuration = new ConfigurationBuilder()
        .SetBasePath(Directory.GetCurrentDirectory())
        .AddXmlFile("appsettings.xml")
        .Build();

      string option1 = configuration["option1"];

      Assert.AreEqual("xmlValue1", option1);
    }

    [TestMethod]
    public void TestEnvironmentVariableSource() {
      Environment.SetEnvironmentVariable("EnvOption1", "EnvValue1");

      IConfigurationRoot configuration = new ConfigurationBuilder()
        .SetBasePath(Directory.GetCurrentDirectory())
        .AddEnvironmentVariables()
        .Build();

      string option1 = configuration["EnvOption1"];

      Assert.AreEqual("EnvValue1", option1, "Add a environment variable: option1 value1");
    }

    [TestMethod]
    public void TestCommandLineSource() {
      //string[] commandlineArguments = Environment.GetCommandLineArgs(); // used outside a unit test to access commandline arguments

      string[] commandlineArguments = {"--cmdOption1", "cmdValue1"};

      IConfigurationRoot configuration = new ConfigurationBuilder()
        .SetBasePath(Directory.GetCurrentDirectory())
        .AddCommandLine(commandlineArguments)
        .Build();

      string option1 = configuration["cmdOption1"];

      Assert.AreEqual("cmdValue1", option1);
    }
  }
}