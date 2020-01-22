using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Area.Controllers
{
    public class LogInController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}