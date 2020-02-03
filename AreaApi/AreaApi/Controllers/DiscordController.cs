using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace AreaApi.Controllers
{
[Route("Discord/[controller]")]
    public class DiscordController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}