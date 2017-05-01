using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DependencyInjection.Middleware;
using DependencyInjection.Services;
using Microsoft.AspNetCore.Mvc;

namespace DependencyInjection.Controllers {
  public class HomeController : Controller {
    [Injected]
    public IService Service { get; set; }

    public HomeController(IService service) {

    }

    public IActionResult Index([FromServices]IService service) {
      return View();
    }

    public IActionResult About() {
      ViewData["Message"] = "Your application description page.";

      return View();
    }

    public IActionResult Contact() {
      ViewData["Message"] = "Your contact page.";

      return View();
    }

    public IActionResult Error() {
      return View();
    }
  }
}
