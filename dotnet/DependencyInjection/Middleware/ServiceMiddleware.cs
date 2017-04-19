using System.Threading.Tasks;
using DependencyInjection.Services;
using Microsoft.AspNetCore.Http;

namespace DependencyInjection.Middleware {
  public class ServiceMiddleware {
    private readonly RequestDelegate _next;

    public ServiceMiddleware(RequestDelegate next) {
      _next = next;
    }

    public async Task Invoke(HttpContext context, IService service) {
      await _next(context);
    }
  }
}