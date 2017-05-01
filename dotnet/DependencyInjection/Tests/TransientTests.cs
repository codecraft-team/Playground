using System;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Tests.Services;

namespace Tests {
  [TestClass]
  public class TransientTests {
    [TestMethod]
    public void TestTransientServiceDescriptor() {
      ServiceCollection services = new ServiceCollection();
      services.Add(new ServiceDescriptor(typeof(IService), typeof(DisposableService), ServiceLifetime.Transient));

      IServiceProvider serviceProvider = services.BuildServiceProvider();

      IService service1 = serviceProvider.GetService<IService>();
      IService service2 = serviceProvider.GetService<IService>();

      Assert.IsNotNull(service1);
      Assert.AreNotSame(service1, service2);
    }

    [TestMethod]
    public void TestTransientMapping() {
      ServiceCollection services = new ServiceCollection();
      services.AddTransient<IService, DisposableService>();

      IServiceProvider serviceProvider = services.BuildServiceProvider();

      IService service1 = serviceProvider.GetService<IService>();
      IService service2 = serviceProvider.GetService<IService>();
      
      Assert.IsNotNull(service1);
      Assert.AreNotSame(service1, service2);
    }

    [TestMethod]
    public void TestTransientInstances() {
      ServiceCollection services = new ServiceCollection();
      services.AddTransient<DisposableService>();

      IServiceProvider serviceProvider = services.BuildServiceProvider();

      DisposableService service1 = serviceProvider.GetService<DisposableService>();
      DisposableService service2 = serviceProvider.GetService<DisposableService>();
      
      Assert.IsNotNull(service1);
      Assert.AreNotSame(service1, service2);
    }

    [TestMethod]
    public void TestTransientCustomCreation() {
      ServiceCollection services = new ServiceCollection();
      services.AddTransient<IService>(provider => new DisposableService());

      IServiceProvider serviceProvider = services.BuildServiceProvider();

      IService service1 = serviceProvider.GetService<IService>();
      IService service2 = serviceProvider.GetService<IService>();
      
      Assert.IsNotNull(service1);
      Assert.AreNotSame(service1, service2);
    }

    [TestMethod]
    public void TestTransientActionDelegates() {
      bool called = false;

      ServiceCollection services = new ServiceCollection();
      services.AddTransient<Action>(provider => () => called = true);

      IServiceProvider serviceProvider = services.BuildServiceProvider();

      Action action = serviceProvider.GetService<Action>();
      action();
      
      Assert.IsTrue(called);
    }

    [TestMethod]
    public void TestTransientFuncDelegates() {
      ServiceCollection services = new ServiceCollection();
      services.AddTransient<Func<IService>>(provider => () => new DisposableService());

      IServiceProvider serviceProvider = services.BuildServiceProvider();

      Func<IService> factory1 = serviceProvider.GetService<Func<IService>>();
      Func<IService> factory2 = serviceProvider.GetService<Func<IService>>();
      
      Assert.AreNotSame(factory1(), factory2());
    }
  }
}