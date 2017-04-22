using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using System.Net.WebSockets;
using System.Threading;
using System.Text;
using Newtonsoft.Json;

namespace AspNetCoreWebSockets
{
  public class Startup
  {
    // This method gets called by the runtime. Use this method to add services to the container.
    // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
    public void ConfigureServices(IServiceCollection services)
    {
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
    {
      loggerFactory.AddConsole();

      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
      }

      app.UseWebSockets();

      app.Use(async (context, next) =>
      {
        if (context.WebSockets.IsWebSocketRequest)
        {
          WebSocket webSocket = await context.WebSockets.AcceptWebSocketAsync();
          await Echo(context, webSocket);
        }
        else
        {
          context.Response.StatusCode = 400;
        }
      });
    }

    private async Task Echo(HttpContext context, WebSocket webSocket)
    {
      var buffer = new ArraySegment<Byte>(new Byte[4096]);
      var token = CancellationToken.None;

      WebSocketReceiveResult result = await webSocket.ReceiveAsync(buffer, token);
      while (!result.CloseStatus.HasValue)
      {
        switch (result.MessageType)
        {
          case WebSocketMessageType.Text:
            string socketRequest = Encoding.UTF8.GetString(buffer.Array, buffer.Offset, buffer.Count).Trim('\0');

            dynamic request = JsonConvert.DeserializeObject(socketRequest);
            string type = request.type;

            dynamic response = null;
            switch (type)
            {
              case "ping":
                response = new { type = "ping", response = "pong" };
                break;
              case "pong":
                response = new { type = "pong", response = "ping" };
                break;
              default:
                break;
            }

            var data = Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(response));
            var sendBuffer = new ArraySegment<byte>(data);
            await webSocket.SendAsync(sendBuffer, WebSocketMessageType.Text, true, token);
            break;
          default:
            response = new { type = "error", response = "error" };
            break;
        }

        result = await webSocket.ReceiveAsync(buffer, token);
      }
      await webSocket.CloseAsync(result.CloseStatus.Value, result.CloseStatusDescription, CancellationToken.None);
    }

  }
}
