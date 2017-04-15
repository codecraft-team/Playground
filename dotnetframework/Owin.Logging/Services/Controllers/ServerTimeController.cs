using System;
using System.Diagnostics;
using System.Web.Http;
using Microsoft.Owin.Logging;

namespace Owin.Logging.Services.Controllers {
  [RoutePrefix(RoutePrefix)]
  public class ServerTimeController : ApiController {
    public const string RoutePrefix = "servertime";
    private readonly ILogger _logger;

    public ServerTimeController(Func<string, ILogger> createLogger) {
      _logger = createLogger(RoutePrefix);
      Trace.TraceInformation("Time controller created.");
      _logger.WriteInformation("Time controller created (information logger from owin pipeline).");
    }

    [HttpGet, Route("")]
    public IHttpActionResult Get() {
      Trace.TraceInformation("Time controller GET...");
      _logger.WriteInformation("Time controller GET (information logger from owin pipeline)...");
      return Ok(DateTime.Now);
    }
  }
}