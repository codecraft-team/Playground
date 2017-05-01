using System;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Tests.Services;

namespace Tests {
  [TestClass]
  public class ScopedTests {

    [TestMethod]
    public void TestCreatingScopes() {
      ServiceCollection services = new ServiceCollection();
      services.AddTransient<IService, DisposableService>();

      IServiceProvider serviceProvider = services.BuildServiceProvider();

      IServiceScopeFactory factory = serviceProvider.GetService<IServiceScopeFactory>();

      using(IServiceScope scope = factory.CreateScope()) {
        IService service = scope.ServiceProvider.GetService<IService>();

        Assert.IsNotNull(service);
      }
    }

    [TestMethod]
    public void TestSameInstanceInSameScoped() {
      ServiceCollection services = new ServiceCollection();
      services.Add(new ServiceDescriptor(typeof(IService), typeof(DisposableService), ServiceLifetime.Scoped));

      IServiceProvider serviceProvider = services.BuildServiceProvider();

      IServiceScopeFactory factory = serviceProvider.GetService<IServiceScopeFactory>();

      IService service1;
      IService service2;

      using(var scope = factory.CreateScope()) {
        service1 = scope.ServiceProvider.GetService<IService>();
        service2 = scope.ServiceProvider.GetService<IService>();
      }

      Assert.IsNotNull(service1);
      Assert.AreSame(service1, service2);
    }

    [TestMethod]
    public void TestDifferentInstancesInDifferentScopes() {
      ServiceCollection services = new ServiceCollection();
      services.Add(new ServiceDescriptor(typeof(IService), typeof(DisposableService), ServiceLifetime.Scoped));

      IServiceProvider serviceProvider = services.BuildServiceProvider();

      IServiceScopeFactory factory = serviceProvider.GetService<IServiceScopeFactory>();

      IService service1;

      using(var scope = factory.CreateScope()) {
        service1 = scope.ServiceProvider.GetService<IService>();
      }

      IService service2;

      using(var scope = factory.CreateScope()) {
        service2 = scope.ServiceProvider.GetService<IService>();
      }

      Assert.AreNotSame(service1, service2);
    }

    [TestMethod]
    public void TestDisposing() {
      ServiceCollection services = new ServiceCollection();
      services.AddTransient<IService, DisposableService>();

      IServiceProvider serviceProvider = services.BuildServiceProvider();

      IServiceScopeFactory factory = serviceProvider.GetService<IServiceScopeFactory>();
      bool disposed = false;

      using (IServiceScope scope = factory.CreateScope()) {
        IService service = scope.ServiceProvider.GetService<IService>();
        service.OnDispose = () => disposed = true;

        Assert.IsNotNull(service);
        Assert.IsFalse(disposed);
      }

      Assert.IsTrue(disposed);
    }

    /// <summary>
    /// Demonstrates instances which are not created by the container will not be disposed.
    /// </summary>
    [TestMethod]
    public void TestFactoryInstancesNotDisposed() {
      ServiceCollection services = new ServiceCollection();
      services.AddTransient<Func<IService>>(provider => () => new DisposableService());

      IServiceProvider serviceProvider = services.BuildServiceProvider();

      IServiceScopeFactory factory = serviceProvider.GetService<IServiceScopeFactory>();
      bool disposed = false;

      using (IServiceScope scope = factory.CreateScope()) {
        Func<IService> serviceFactory = scope.ServiceProvider.GetService<Func<IService>>();

        IService service = serviceFactory();
        service.OnDispose = () => disposed = true;

        Assert.IsNotNull(service);
        Assert.IsFalse(disposed);
      }

      Assert.IsFalse(disposed);
    }

    /// <summary>
    /// Although the provider does not create the instance it calls dispose on it!
    /// </summary>
    [TestMethod]
    [ExpectedException(typeof(ObjectDisposedException))]
    public void TestInstanceAlreadyDisposed() {
      IService outerCreatedService = new DisposableService();

      ServiceCollection services = new ServiceCollection();
      services.AddTransient(provider => outerCreatedService);

      IServiceProvider serviceProvider = services.BuildServiceProvider();

      IServiceScopeFactory factory = serviceProvider.GetService<IServiceScopeFactory>();

      bool disposed = false;

      using (IServiceScope scope = factory.CreateScope()) {
        IService service = scope.ServiceProvider.GetService<IService>();
        service.OnDispose = () => disposed = true;

        Assert.IsNotNull(service);
        Assert.IsFalse(disposed);
      }

      Assert.IsTrue(disposed);

      using(IServiceScope scope = factory.CreateScope()) {
        IService service = scope.ServiceProvider.GetService<IService>();
        service.OnDispose = () => disposed = true;

        Assert.IsNotNull(service);
      }
    }
  }
}