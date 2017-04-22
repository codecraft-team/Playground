using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.Owin.Testing;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Newtonsoft.Json.Linq;
using Owin.Logging.Services.Controllers;

namespace Owin.Logging.Services.Tests {
  [TestClass]
  public class LoggingTests {
    [TestMethod]
    public async Task TestMethodName() {
      using (TestServer server = TestServer.Create<Startup>()) {
        using (HttpClient client = new HttpClient(server.Handler)) {
          HttpResponseMessage response = await client.GetAsync($"http://testserver/{ServerTimeController.RoutePrefix}");

          string responseContent = await response.Content.ReadAsStringAsync();
          JToken actualResult = JToken.Parse(responseContent);

          Assert.AreEqual(JTokenType.Date, actualResult.Type);
        }
      }
    }
  }
}