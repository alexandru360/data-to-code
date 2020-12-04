using Microsoft.AspNetCore.Authorization.Infrastructure;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Routing;
using Microsoft.AspNetCore.Server.IIS.Core;
using Microsoft.Web.Administration;
using Newtonsoft.Json;
using Stankins.Excel;
using Stankins.FileOps;
using Stankins.Interfaces;
using Stankins.Razor;
using StankinsCommon;
using StankinsObjects;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace GenerateApp.Controllers
{
    public class InfoData
    {

        public static readonly bool InsideIIS;
        static InfoData()
        {
            var str = Environment.GetEnvironmentVariable("APP_POOL_ID");
            InsideIIS = !string.IsNullOrWhiteSpace(str);
        }
        public readonly DateTime startedDate;
        private readonly connTypes sourceData;

        public InfoData(connTypes sourceData)
        {
            startedDate = DateTime.UtcNow;
            this.sourceData = sourceData;
            this.logs = new Logs();
        }
        public bool InProgress()
        {
            return result == null;
        }
        public bool? result;

        public string name { get; set; }
        public string pathFile { get; set; }
        public Logs logs { get; set; }
        public string folderGenerator { get;  set; }

        public Dictionary<string, string> Releases = new Dictionary<string, string>();
        public string RealExeLocation;
        internal GenerateAppV1 GenerateAppV1;

        //private async Task<IDataToSent> ReadCSV()
        //{
        //    logs.AddLog(this.name,"start reading csv");
        //    var recCSV = new ReceiverCSVFile(this.pathFile);
        //    var data= await recCSV.TransformData(null);
        //    logs.AddLog(this.name, "start adding data source");

        //    return data;
        //}
        private async Task<IDataToSent> ReadExcel()
        {
            string excel = pathFile;
            logs.AddLog(this.name, "start reading excel ");

            var recExcel = new ReceiverExcel(excel);

            var data = await recExcel.TransformData(null);
            logs.AddLog(this.name,"start transforming renaming");

            var renameExcel = new TransformerRenameTable("it=>it.Contains(\".xls\")", "DataSource");

            data = await renameExcel.TransformData(data);
            logs.AddLog(this.name,"start change names from sheet");

            var renameCol = new ChangeColumnName("SheetName", "TableName");
            data = await renameCol.TransformData(data);
            return data; ;

        }

        public async Task<string> GenerateApp(string backendFolderName, string frontendFolderName)
        {
            string folderGenerator = this.folderGenerator;
            string generator = Path.Combine(folderGenerator, "describe.txt");
            var stData = JsonConvert.DeserializeObject<StankinsGenerator>(File.ReadAllText(generator));
            //frontendFolderName = @"Angular10.0Full";
            var backend = stData.backend.FirstOrDefault(it => it.folder == backendFolderName);
            var frontEnd = stData.frontend.FirstOrDefault(it => it.folder == frontendFolderName);
            //wt  new-tab -d C:\test\backend\NETCore3.1\TestWebAPI ; split-pane -d C:\test\frontend\Angular10.0
            var g = this.name;

            var outputFolder = Path.Combine(Path.GetDirectoryName(pathFile), g);
            if (!Directory.Exists(outputFolder))
                Directory.CreateDirectory(outputFolder);


            logs.AddLog(this.name,"gathering data");
            IDataToSent data;
            switch (sourceData)
            {
                case connTypes.Excel:
                    data = await ReadExcel();
                    break;
                case connTypes.MariaDB:
                case connTypes.MSSQL:
                case connTypes.MYSQL:
                    data = ReadCustom();
                    break;
                default:
                    throw new ArgumentException($"not supported1 {nameof(sourceData)} {sourceData} ");
            }
            ;
            var ds = data.FindAfterName("DataSource").Value;
            var nrRowsDS = ds.Rows.Count;
            var nameTablesToRender = new List<string>(nrRowsDS);
            for (int iRowDS = nrRowsDS-1; iRowDS >-1; iRowDS--)
            {
                var nameTable = ds.Rows[iRowDS]["TableName"].ToString();
                var dt = data.FindAfterName(nameTable).Value;
                Console.WriteLine(dt.TableName +"=>" + dt.Rows.Count);
                switch (this.sourceData)
                {
                    case connTypes.Excel:
                        if (dt.Rows.Count == 0)
                        {
                            ds.Rows.RemoveAt(iRowDS);
                        }
                        else
                        {
                            nameTablesToRender.Add(dt.TableName);
                        }
                        break;
                    case connTypes.MariaDB:
                    case connTypes.MSSQL:
                    case connTypes.MYSQL:

                        nameTablesToRender.Add(dt.TableName);
                        break;
                    default:
                        throw new ArgumentException($"not supported2 {nameof(sourceData)} {sourceData} ");
                }

            }
            DataTable dtOptions = new DataTable("@@Options@@");
            var dcName = dtOptions.Columns.Add("name", typeof(string));
            dcName.MaxLength = 300;
            dtOptions.Columns.Add("value", typeof(string)).MaxLength=300;
            dtOptions.PrimaryKey = new[] { dcName };

            switch (sourceData)
            {
                case connTypes.Excel:
                    {
                        dtOptions.Rows.Add("GeneratedBy", "http://demo.adces.ro:8080");

                        var dtRels = new DataTable("@@Relations@@");
                        dtRels.Columns.Add("parent_object", typeof(string)).MaxLength = 300;
                        dtRels.Columns.Add("parent_column", typeof(string)).MaxLength = 300;
                        dtRels.Columns.Add("referenced_object", typeof(string)).MaxLength = 300;
                        dtRels.Columns.Add("referenced_column", typeof(string)).MaxLength = 300;

                        int idRel = data.AddNewTable(dtRels);
                        data.Metadata.AddTable(dtRels, idRel);
                        //var x = "<a mat-list-item [routerLink]=\"['/dbocountry/edit', row.idcountry]\" routerLinkActive=\"active\">Go=></a>";
                        var dtNow = DateTime.Now.ToString("yyyyMMddHHmmss");
                        
                        dtOptions.Rows.Add("ApplicationName",Path.GetFileNameWithoutExtension( pathFile));
                        dtOptions.Rows.Add("DataSource", "SqlServerInMemory");
                        dtOptions.Rows.Add("DataSourceConnectionString", "");
                        dtOptions.Rows.Add("ConnectionString", "excel");
                        for (int iRowDS = nrRowsDS - 1; iRowDS > -1; iRowDS--)
                        {
                            var nameTable = ds.Rows[iRowDS]["TableName"].ToString();
                            dtOptions.Rows.Add($"{nameTable}_PK", "id"+dtNow);
                            dtOptions.Rows.Add($"{nameTable}_PK_Type", $"long");
                        }
                    }
                    break;
                case connTypes.MariaDB:
                case connTypes.MSSQL:
                case connTypes.MYSQL:

                    {
                        dtOptions.Rows.Add("GeneratedBy", "http://data-to-code.eu/");

                        dtOptions.Rows.Add("ApplicationName", this.GenerateAppV1.payLoadConn.connDatabase );
                        dtOptions.Rows.Add("DataSource", sourceData.ToString());
                        dtOptions.Rows.Add("DataSourceConnectionString", this.GenerateAppV1.payLoadConn.ConnectionString());
                        string host = this.GenerateAppV1.payLoadConn.connHost;
                        if (host.Contains("."))
                        {
                            switch (sourceData)
                            {
                                case connTypes.MSSQL:
                                    host = host.Replace(".",Environment.MachineName);
                                    break;
                                default:
                                    break;
                            }
                        }
                        dtOptions.Rows.Add("DataSourceConnectionHost", host);
                        dtOptions.Rows.Add("DataSourceConnectionUser", this.GenerateAppV1.payLoadConn.connUser);
                        dtOptions.Rows.Add("DataSourceConnectionPassword", this.GenerateAppV1.payLoadConn.connPassword);
                        dtOptions.Rows.Add("DataSourceConnectionDatabase", this.GenerateAppV1.payLoadConn.connDatabase);
                        dtOptions.Rows.Add("DataSourceIntegratedSecurity", this.GenerateAppV1.payLoadConn.connIntegratedSecurity);
                        string port = this.GenerateAppV1.payLoadConn.connPort;
                        //if (string.IsNullOrWhiteSpace(port))
                        //{
                        //    switch (sourceData)
                        //    {
                        //        case connTypes.MSSQL:                                    
                        //            break;
                        //        default:
                        //            port = $"unknown default port for {sourceData}";
                        //            break;
                        //    }
                        //}
                        dtOptions.Rows.Add("DataSourceConnectionPort", port);
                        // make here the generated id
                        for (int iRowDS = nrRowsDS - 1; iRowDS > -1; iRowDS--)
                        {
                            var nameTable = ds.Rows[iRowDS]["TableName"].ToString();
                            var dtTable = data.FindAfterName(nameTable).Value;
                            if (dtTable.PrimaryKey.Length > 0)
                            {
                                var nameColumnPK = dtTable.PrimaryKey.First().ColumnName;
                                var typeColumnPK = dtTable.Columns[nameColumnPK].DataType;
                                dtOptions.Rows.Add($"{nameTable}_PK", nameColumnPK);
                                dtOptions.Rows.Add($"{nameTable}_PK_Type", typeColumnPK.Name);
                            }
                        }

                        
                    }
                    break;
                default:
                    throw new ArgumentException($"not supported3 {nameof(sourceData)} {sourceData} ");

            }
            
            
            
            int id=  data.AddNewTable(dtOptions);
            data.Metadata.AddTable(dtOptions, id);



            var folderWithTemplates = Path.Combine(outputFolder, g);
            Directory.CreateDirectory(folderWithTemplates);
            try
            {
                logs.AddLog(this.name,"copy generator");

                File.Copy(generator, Path.Combine(outputFolder, "describe.txt"), true);
                File.Copy(Path.Combine(folderGenerator, "generateWin.ps1"), Path.Combine(outputFolder, "generateWin.ps1"), true);
                var backendFolder = Path.Combine(folderWithTemplates, "Backend", backendFolderName);
                string frontendFolder = null;
                if(!string.IsNullOrWhiteSpace(frontendFolderName))
                    frontendFolder = Path.Combine(folderWithTemplates, "FrontEnd", frontendFolderName);
                logs.AddLog(this.name,"copy backend");

                DirectoryCopy(Path.Combine(folderGenerator, "Backend", backendFolderName), backendFolder, true);
                logs.AddLog(this.name,"copy frontend");

                if(!string.IsNullOrWhiteSpace(frontendFolderName))
                    DirectoryCopy(Path.Combine(folderGenerator, "FrontEnd", frontendFolderName), frontendFolder, true);
                logs.AddLog(this.name,"generating files backend");

                foreach (var fileToCopy in backend.copyTableFiles)
                {
                    var pathFile = Path.Combine(backendFolder, fileToCopy);
                    string content = await File.ReadAllTextAsync(pathFile);
                    foreach (DataRow item in ds.Rows)
                    {
                        var nameTable = item["TableName"].ToString();
                        var data1 = data.FindAfterName(nameTable).Value;
                        switch (this.sourceData)
                        {
                            case connTypes.Excel:
                                if (data1.Rows.Count == 0)
                                    continue;
                                break;
                            case connTypes.MariaDB:
                            case connTypes.MSSQL:
                            case connTypes.MYSQL:
                                break;
                            default:
                                throw new ArgumentException($"not supported4 {nameof(sourceData)} {sourceData} ");

                        }
                        string correctNameFile = nameTable.Replace(" ", "").Replace(".", "").Replace("(", "").Replace(")", "");
                        var newFileName = pathFile.Replace("@Name@", correctNameFile, StringComparison.InvariantCultureIgnoreCase);
                        var newContent = content.Replace("@Name@", nameTable, StringComparison.InvariantCultureIgnoreCase);
                        await File.WriteAllTextAsync(newFileName, newContent);

                    }
                    File.Delete(pathFile);
                }
                logs.AddLog(this.name,"generating files frontend");
                if(frontEnd != null)
                foreach (var fileToCopy in frontEnd.copyTableFiles)
                {
                    var pathFile = Path.Combine(frontendFolder, fileToCopy);
                    string content = await File.ReadAllTextAsync(pathFile);
                    foreach (DataRow item in ds.Rows)
                    {
                        var nameTable = item["TableName"].ToString();
                        var data1 = data.FindAfterName(nameTable).Value;
                        switch (this.sourceData)
                        {
                            case connTypes.Excel:
                                if (data1.Rows.Count == 0)
                                    continue;
                                break;
                            case connTypes.MariaDB:
                            case connTypes.MSSQL:
                            case connTypes.MYSQL:
                                break;
                            default:
                                throw new ArgumentException($"not supported5 {nameof(sourceData)} {sourceData} ");

                        }
                        string correctNameFile = nameTable.Replace(" ", "").Replace(".", "").Replace("(", "").Replace(")", "");

                        var newFileName = pathFile.Replace("@Name@", correctNameFile, StringComparison.InvariantCultureIgnoreCase);
                        var newContent = content.Replace("@Name@", nameTable, StringComparison.InvariantCultureIgnoreCase);
                        await File.WriteAllTextAsync(newFileName, newContent);

                    }
                    File.Delete(pathFile);
                }
                Console.WriteLine("in excel:" + data.DataToBeSentFurther.Count);
                var nrTablesExcel = data.DataToBeSentFurther.Count;


                var tableData = data.Metadata.Tables.First();
                logs.AddLog(this.name,"reading files");
                var rec = new ReceiverFilesInFolder(folderWithTemplates, "*.*", SearchOption.AllDirectories);
                data = await rec.TransformData(data);
                Console.WriteLine("after files:" + data.DataToBeSentFurther.Count);
                var razorTables = nameTablesToRender
                    .Union(new[] { "DataSource" })
                    .Union(new[] { "@@Options@@" })
                    .Union(new[] { "@@Relations@@" })
                    .ToArray();
                logs.AddLog(this.name,"razoring files - it will take some time");
                var t = new TransformerOneTableToMulti<SenderToRazorFromFile>("InputTemplate", "FullFileName", razorTables, new CtorDictionary());
                data = await t.TransformData(data);
                Console.WriteLine("after razor:" + data.DataToBeSentFurther.Count);
                logs.AddLog(this.name,"consolidating output string");
                var one = new TransformerToOneTable("it=>it.StartsWith(\"OutputString\")");
                data = await one.TransformData(data);
                //Transformer
                //var outFile = new SenderOutputToFolder(@"C:\test\", false);
                Console.WriteLine("after one table string:" + data.DataToBeSentFurther.Count);
                logs.AddLog(this.name,"consolidating output byte");
                one = new TransformerToOneTable("it=>it.StartsWith(\"OutputByte\")");
                data = await one.TransformData(data);
                Console.WriteLine("after one table byte:" + data.DataToBeSentFurther.Count);
                logs.AddLog(this.name,"renaming");

                var ren = new TransformerRenameTable("it=>it.StartsWith(\"OutputString\")", "OutputString");
                data = await ren.TransformData(data);
                //SenderOutputToFolder
                //TransformerUpdateColumn
                //var up = new TransformerUpdateColumn("FullFileName_origin", data.DataToBeSentFurther[2].TableName, $"'{outputFolder}' + SUBSTRING(FullFileName_origin,{lenTemplateFolder+1},100)");
                Console.WriteLine(data.DataToBeSentFurther[3].TableName);
                var lenTemplateFolder = folderWithTemplates.Length;
                var sep = Path.DirectorySeparatorChar;
                logs.AddLog(this.name,"getting file names");

                var up = new TransformerUpdateColumn("FullFileName_origin", "OutputString", "'Generated" + sep + $"'+SUBSTRING(FullFileName_origin,{lenTemplateFolder + 2},1000)");
                data = await up.TransformData(data);
                var x = data.DataToBeSentFurther;
                logs.AddLog(this.name,"change column name=>key");

                var name = new ChangeColumnName("Name", "Key");

                data = await name.TransformData(data);
                logs.AddLog(this.name,"change column origin=>name");
                name = new ChangeColumnName("FullFileName_origin", "Name");
                data = await name.TransformData(data);
                logs.AddLog(this.name,"remove byte");

                var remByte = new FilterRemoveTable("OutputByte");
                data = await remByte.TransformData(data);
                logs.AddLog(this.name,$"saving to output {outputFolder}");

                var save = new SenderOutputToFolder(outputFolder, false, "OutputString");
                data = await save.TransformData(data);
                if (!string.IsNullOrWhiteSpace(GitOps.CredentialsToken))
                    return (await CreateFromGit(g, outputFolder)?outputFolder: null);


                return outputFolder;
            }
            catch (Exception ex)
            {

                logs.AddLog(this.name,"ERROR!" + ex.Message);
                logs.AddLog(this.name,"ERROR!" + ex.StackTrace);
               return null;
            }
            finally
            {
                try
                {
                    Console.WriteLine($"Deleting {folderWithTemplates}");
                    Directory.Delete(folderWithTemplates, true);
                }
                catch
                {

                }
            }
           



        }

        private async Task<bool> CreateFromGit(string nameBranch, string outputFolder)
        {
            if (string.IsNullOrWhiteSpace(GitOps.CredentialsToken))
                return true;

            logs.AddLog(this.name, $"creating branch {nameBranch}");

            Console.WriteLine($"branch : {nameBranch} ");
            var b = await GitOps.CreateBranch(nameBranch);

            logs.AddLog(this.name, $"sending data {nameBranch}");

            var final = await GitOps.CommitDir(b, outputFolder);
            logs.AddLog(this.name, $"waiting {nameBranch} -it will take some time");

            var ret = await GitOps.waitForRuns(nameBranch);
            logs.AddLog(this.name, $"success?  {ret}");
            await Task.Delay(10 * 1000);//some timeout for finding asserts
                                        //Console.WriteLine(string.Join(Environment.NewLine, ret));
            if (!ret)
                return false;


            var assets = await GitOps.FindAssetsInRelease(nameBranch);
            if (assets.Length != 1)
            {
                logs.AddLog(this.name, $" number of assets {assets.Length}");
                return false;
            }

            var realAssets = assets.First().Assets.ToArray();
            foreach (var item in realAssets)
            {
                logs.AddLog(this.name, $"Release {item.Name} {item.BrowserDownloadUrl}");
                this.Releases.Add(item.Name, item.BrowserDownloadUrl);
            }
            logs.AddLog(this.name, $"getting exes ");
            string output = Path.Combine(outputFolder, "output");
            var zip = await GitOps.DownloadExe(realAssets, output);
            logs.AddLog(this.name, $"getting downloaded {Path.GetFileName(zip)}");
            RealExeLocation = GitOps.UnzipAndFindWin64(zip);
            logs.AddLog(this.name, $"getting {Path.GetDirectoryName(RealExeLocation)}");
            //add here to run file 
            if (!InsideIIS)
            {
                //TODO: run the file
            }
            else
            {
                logs.AddLog(this.name, $"creating VDir {name}");
                CreateVDir(this.name, RealExeLocation);
            }
            return true;

        }

        private IDataToSent ReadCustom()
        {
            
            return this.GenerateAppV1.receiveData;
        }

        public static void CreateVDir(string name, string folder)
        {

            ServerManager manager = new ServerManager();
            //if(manager.Sites.Contains(s=>s. ))
            //Site defaultSite = manager.Sites["AppGenerator"];
            Site defaultSite = manager.Sites.First();
            var appCreated = defaultSite.Applications.Add($"/{name}", folder);
            appCreated.ApplicationPoolName = "NETCore";
            manager.CommitChanges();
        }
        //https://docs.microsoft.com/en-us/dotnet/standard/io/how-to-copy-directories
        private static void DirectoryCopy(string sourceDirName, string destDirName, bool copySubDirs)
        {
            // Get the subdirectories for the specified directory.
            DirectoryInfo dir = new DirectoryInfo(sourceDirName);

            if (!dir.Exists)
            {
                throw new DirectoryNotFoundException(
                    "Source directory does not exist or could not be found: "
                    + sourceDirName);
            }

            DirectoryInfo[] dirs = dir.GetDirectories();
            // If the destination directory doesn't exist, create it.
            if (!Directory.Exists(destDirName))
            {
                Directory.CreateDirectory(destDirName);
            }

            // Get the files in the directory and copy them to the new location.
            FileInfo[] files = dir.GetFiles();
            foreach (FileInfo file in files)
            {
                string temppath = Path.Combine(destDirName, file.Name);
                file.CopyTo(temppath, true);
            }

            // If copying subdirectories, copy them and their contents to new location.
            if (copySubDirs)
            {
                foreach (DirectoryInfo subdir in dirs)
                {
                    string temppath = Path.Combine(destDirName, subdir.Name);
                    DirectoryCopy(subdir.FullName, temppath, copySubDirs);
                }
            }
        }

    }
}
