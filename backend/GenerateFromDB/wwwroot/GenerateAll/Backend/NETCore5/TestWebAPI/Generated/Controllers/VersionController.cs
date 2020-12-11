using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace TestWebAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class VersionController : ControllerBase
    {
        [HttpGet]
        public string VersionGenerator(){
            return "1.2020.12.11";
        }
        [HttpGet]
        public string VersionBackend(){
            return "NETCore5";
        }
    }
}