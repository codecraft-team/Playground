using System;
using Microsoft.AspNetCore.Mvc;

namespace DependencyInjection.Services {
  [AttributeUsage(AttributeTargets.Property | AttributeTargets.Parameter)]
  public class InjectedAttribute : FromServicesAttribute {
  }
}