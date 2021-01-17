using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TestWEBAPI_DAL;

namespace TestWebAPI.Generated.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class MetadataController : ControllerBase
    {
        private readonly AllTables tables;

        public MetadataController(AllTables tables)
        {
            this.tables = tables;
        }

        [HttpGet]
        public TablesDescription[] Tables()
        {
            return tables.Tables;
        }
        [HttpGet]
        public string[] TableNames()
        {
            return tables.TableNames;
        }
    }
}
