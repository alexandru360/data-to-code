using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.IO.Compression;
using System.Linq;
using System.Threading.Tasks;
using GenerateApp.Controllers;
using GenerateAppBL;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace GenerateFromDB.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        private readonly ILogger<HomeController> logger;
        private readonly IWebHostEnvironment environment;

        public HomeController(ILogger<HomeController> logger, IWebHostEnvironment environment)
        {
            this.logger = logger;
            this.environment = environment;
        }
        [HttpGet("{id}")]
        public ActionResult redirect(string id)
        {
            return LocalRedirect("/");
        }
    [HttpGet]
    public string Version()
    {
      return ThisAssembly.Info.Version;
    }
    [HttpPost]
    public async Task<TablesFromDataSource> FindTables([FromBody] PayLoadConn payLoadConn)
    {
            var q=await payLoadConn.FromPayloadConn();
            return q;
    }
    [HttpGet]
    public Output[] Templates()
    {
      var ret = new List<Output>();
      var folder = Path.Combine(environment.WebRootPath, "GenerateAll");
      string generator = Path.Combine(folder, "describe.txt");
      if (!System.IO.File.Exists(generator))
      {
        Console.WriteLine($"cannot find file {generator}");
        return ret.ToArray();
      }
      var stData = JsonConvert.DeserializeObject<StankinsGenerator>(System.IO.File.ReadAllText(generator));
      foreach (var back in stData.backend)
      {
        if (back.worksWithFrontEnd?.Length > 0)
        {
          foreach (var front in back.worksWithFrontEnd)
          {
            var o = new Output();
            o.ApiType = back.folder;
            o.UiType = front;
            ret.Add(o);
          }

        }
        else
        {
          var o = new Output();
          o.ApiType = back.folder;
          ret.Add(o);
        }
      }
      return ret.ToArray();
    }
    [HttpPost]
    public async Task<ReturnData> GenerateApp([FromBody] GenerateAppV1 app)
    {
      await foreach (var item in app.Validate())
      {
        throw new ArgumentException("validation error:" + item.ErrorMessage, string.Join("m", item.MemberNames));
      }
      var typeToLoad = Enum.Parse<connTypes>(app.payLoadConn.connType, true);

      var info = await app.GenerateInfoData(typeToLoad);
      info.folderGenerator = Path.Combine(environment.WebRootPath, "GenerateAll");
      string dateNow = MyDate.UTCFormat();
      //dateNow = "";   
      info.pathFile = Path.Combine(environment.WebRootPath, dateNow, "conection.txt");
      var di = Directory.CreateDirectory(Path.GetDirectoryName(info.pathFile));
      System.IO.File.WriteAllText(info.pathFile, app.payLoadConn.ConnectionString());
      var data = await info.GenerateApp(app.output[0].ApiType, app.output[0].UiType);

      if (string.IsNullOrWhiteSpace(data))
      {
        Console.WriteLine(info.logs[info.logs.Count - 2]);
        Console.WriteLine(info.logs[info.logs.Count - 1]);
        throw new Exception(info.logs[info.logs.Count - 1]);
      }
      string allZip = Path.Combine(environment.WebRootPath, dateNow + "generated.zip");
      Console.WriteLine($"zipping {data} to {allZip}");
      ZipFile.CreateFromDirectory(data, allZip);
      //if (false)
      //{
      //    string pathDir = Path.GetDirectoryName(info.pathFile);
      //    var powershellFile = Directory.GetFiles(pathDir, "generateWin.ps1", SearchOption.AllDirectories).FirstOrDefault();
      //    if (powershellFile == null)
      //        throw new ArgumentException("cannot find powershell docker file");

      //    var ps = new ProcessStartInfo();
      //    ps.FileName = "powershell.exe";
      //    ps.WorkingDirectory = Path.GetDirectoryName(powershellFile);
      //    ps.Arguments = powershellFile;
      //    ps.CreateNoWindow = false;
      //    Process.Start(ps).WaitForExit();

      //    string outDir = Path.Combine(Path.GetDirectoryName(powershellFile), "out", "netcore3.1", "win-x64");
      //    InfoData.CreateVDir(dateNow, outDir);

      //    string generated = Path.Combine(Path.GetDirectoryName(powershellFile), "generated");
      //    string zip = Path.Combine(outDir, "wwwroot", "generated.zip");
      //    ZipFile.CreateFromDirectory(generated, zip);
      //}
      //https://www.data-to-code.eu/data2code/20201102235219generated.zip
      // execute powershell
      return new ReturnData()
      {
        Site = dateNow,
        //ZipGenerated = $"{dateNow}/generated.zip"
        //ZipGenerated = "data2code/"+Path.GetFileName(allZip)
        ZipGenerated = Path.GetFileName(allZip)
      };
    }
    [HttpPost]
    public TableGenerator[] tableGenerator([FromBody] Table[] tables)
    {
      var ret = new TableGenerator[tables.Length];
      for (int i = 0; i < tables.Length; i++)
      {

        var t = new TableGenerator();
        t.table = tables[i];
        t.crudEndpoints = new CrudEndpoints()
        {
          Create = true,
          Delete = true,
          List = true,
          Update = true
        };
        ret[i] = t;
      }
      return ret;
    }
  }
}
