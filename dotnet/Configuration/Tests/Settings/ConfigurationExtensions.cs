using Microsoft.Extensions.Configuration;

namespace Tests.Settings {
  public static class ConfigurationExtensions {
    public static TSection GetSection<TSection>(this IConfiguration configuration) where TSection : class {
      string sectionName = typeof(TSection).Name;

      IConfigurationSection configurationSection = configuration.GetSection(sectionName);

      return configurationSection.Get<TSection>();
    }
  }
}