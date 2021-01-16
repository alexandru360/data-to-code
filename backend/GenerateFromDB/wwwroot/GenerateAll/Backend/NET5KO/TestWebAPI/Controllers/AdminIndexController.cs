using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TestWEBAPI_DAL;
using TestWebAPI_BL;
using TestWebAPI_Searches;
using Microsoft.Extensions.Logging;
namespace TestWebAPI.Controllers
{
    public class AdminIndexController : Controller
    {

        private readonly ILogger<AdminIndexController> _logger;

        public AdminIndexController(ILogger<AdminIndexController> logger)
        {
            _logger = logger;
        }

        public  ActionResult Index()
        {
            @@ViewData["Title"]="list of tables";
            return View("AdminIndex_List");
        }
    }
}