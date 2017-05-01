using System;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Tests.Services;

namespace Tests {
  [TestClass]
  public class SingletonTests {
    [TestMethod]
    public void TestSingletonServiceDescriptor() {
      ServiceCollection services = new ServiceCollection();
      services.Add(new ServiceDescriptor(typeof(IService), typeof(DisposableService), ServiceLifetime.Singleton));

      IServiceProvider serviceProvider = services.BuildServiceProvider();

      IService service1 = serviceProvider.GetService<IService>();
      IService service2 = serviceProvider.GetService<IService>();

      Assert.IsNotNull(service1);
      Assert.AreSame(service1, service2);
    }

    [TestMethod]
    public void TestSingletonMapping() {
      ServiceCollection services = new ServiceCollection();
      services.AddSingleton<IService, DisposableService>();

      IServiceProvider serviceProvider = services.BuildServiceProvider();

      IService service1 = serviceProvider.GetService<IService>();
      IService service2 = serviceProvider.GetService<IService>();

      Assert.IsNotNull(service1);
      Assert.AreSame(service1, service2);
    }

    [TestMethod]
    public void TestSingletonInstance() {
      ServiceCollection services = new ServiceCollection();
      services.AddSingleton<DisposableService>();

      IServiceProvider serviceProvider = services.BuildServiceProvider();

      DisposableService service1 = serviceProvider.GetService<DisposableService>();
      DisposableService service2 = serviceProvider.GetService<DisposableService>();
      
      Assert.IsNotNull(service1);
      Assert.AreSame(service1, service2);
    }

    [TestMethod]
    public void TestCustomSingletonInstance() {
      ServiceCollection services = new ServiceCollection();
      services.AddSingleton<IService>(new DisposableService());

      IServiceProvider serviceProvider = services.BuildServiceProvider();

      IService service1 = serviceProvider.GetService<IService>();
      IService service2 = serviceProvider.GetService<IService>();
      
      Assert.IsNotNull(service1);
      Assert.AreSame(service1, service2);
    }
  }
}