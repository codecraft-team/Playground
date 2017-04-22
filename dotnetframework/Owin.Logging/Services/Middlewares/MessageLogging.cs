using System.Threading.Tasks;
using Microsoft.Owin;
using Microsoft.Owin.Logging;

namespace Owin.Logging.Services.Middlewares {
  public class MessageLogging : OwinMiddleware {
    private readonly ILogger _logger;

    public MessageLogging(OwinMiddleware next, IAppBuilder appBuilder) : base(next) {
      _logger = appBuilder.CreateLogger<MessageLogging>();
    }

    public override Task Invoke(IOwinContext context) {
      _logger.WriteVerbose($"{context.Request.Scheme} {context.Request.Method}: {context.Request.Path}");
      return Next.Invoke(context);
    }
  }
}