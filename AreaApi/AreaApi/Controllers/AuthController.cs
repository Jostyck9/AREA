using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace AreaApi.Controllers
{
    [Route("auth/")]
    public class AuthController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public async Task<IActionResult> getAuthServices()
        {
          //  return authServices;
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {

        }

        [HttpPost]
        [Route("signup")]
        public async Task<IActionResult> Signup([FromBody] LoginModel model)
        {

        }

    }
}