@model Stankins.Interfaces.IDataToSent
@{
    

string ClassNameFromTableName(string tableName){
		return tableName.Replace(" ","").Replace(".","").Replace("(","").Replace(")","");
	}

	
var ds= Model.FindAfterName("DataSource").Value;
    
    var nrRowsDS=ds.Rows.Count;
    var dtOptions= Model.FindAfterName("@@Options@@").Value;
    var dataSource = dtOptions.Rows.Find("DataSource")[1].ToString();
    var conString = dtOptions.Rows.Find("DataSourceConnectionString")[1].ToString();
    var nameTablesToRender = new string[nrRowsDS];
    var tables=new System.Data.DataTable[nrRowsDS];
    for (int iRowDS = 0; iRowDS < nrRowsDS; iRowDS++)
    {
        var nameTable = ds.Rows[iRowDS]["TableName"].ToString();
        var renderTable = Model.FindAfterName(nameTable).Value;
        nameTablesToRender[iRowDS] = nameTable;
        tables[iRowDS]=renderTable;
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using NetCore2Blockly;
using TestWebAPI_BL;
using TestWebAPI_DAL;

namespace TestWebAPI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            // add swagger
            // add blockly 
			services.AddBlockly();
            // add logging
            services.AddCors();
            services.AddControllers();

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "MyApplication", Version = "v1" });
            });


            services.AddDbContext<DatabaseContext>(options => 

            @switch(dataSource){
                case "SqlServerInMemory":
                case "MSSQL":
                    <text>{
                        var conStr = Configuration.GetConnectionString("DefaultConnection");
                        if(string.IsNullOrWhiteSpace(conStr)){
                            options.UseInMemoryDatabase("myInMemory");
                        }
                        else{
                            options.UseSqlServer(conStr);
                        }
                    
                    
                            
                    });
                    </text>
                break;
                case "MariaDB":
                case "MYSQL":
                    <text>
                           options.UseMySql(Configuration.GetConnectionString("DefaultConnection"))); 
                    </text>
                break;
                case "Postgres":
                    <text>
                           options.UseNpgsql(Configuration.GetConnectionString("DefaultConnection"))); 
                    </text>
                    break;
                default:
                    <text>
                    NO SUCH DATABASE @(dataSource)
                    </text>
                    break;
            }

        services.AddTransient<IDatabaseContext>(sp=>sp.GetRequiredService<DatabaseContext>());

        services.AddSingleton<AllTables>(); 

       @foreach(var nameTable in nameTablesToRender){
		   string nameClass= ClassNameFromTableName(nameTable);
            var nrPK = (int.Parse(dtOptions.Rows.Find(nameTable +"_PK_Number")[1].ToString())  );
            
            string idTable ="", idType = "" ,idTableSecond = "",idTypeSecond = "";
            if(nrPK > 0 ){

                idType = dtOptions.Rows.Find(nameTable +"_PK_0_Type")[1].ToString();      
            }
            if( nrPK > 1 ) { 
                    // just 2 PK
                    idTypeSecond = dtOptions.Rows.Find(nameTable +"_PK_1_Type")[1].ToString();
            }

            string textToRender="";
            switch(nrPK){
                case 1:
                    textToRender="services.AddTransient<IRepository<"+nameClass+","+ idType +">, "+nameClass+"_Repository>();";

                    break;
                    
                case 0:
                    textToRender="services.AddTransient<IRepositoryView<"+nameClass +">, "+nameClass+"_Repository>();";

                    break;
                default:
                    textToRender="services.AddTransient<IRepository<"+nameClass+","+ idType +"," + idTypeSecond + ">, "+nameClass+"_Repository>();";

                    break;
            }
            <text>
			@Raw(textToRender)
            </text>
        }
 
         }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
			
			app.UseBlockly();
            app.UseBlocklyUI();
            app.UseSwagger();
            app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "WebApplication1 v1"));

            
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
//put in a json settings file
            app
                .UseCors(opt =>
                {
                    opt.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
                });
            
            app.UseHttpsRedirection();

            app.UseDefaultFiles();
            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                
       @foreach(var nameTable in nameTablesToRender){
           string nameClass= ClassNameFromTableName(nameTable);
     
            <text>
			endpoints.MapFallbackToFile("/crud/@(nameClass.ToLower())/{**slug}","/index.html");
            </text>
        }
                endpoints.MapFallbackToFile("/crud/{**slug}", "/index.html");
                endpoints.MapControllers();
                endpoints.MapFallbackToFile("{**slug}", "/index.html");
            });
            CreateDatabase(app);
            
        }
        private void CreateDatabase(IApplicationBuilder app){
            using var scope = app.ApplicationServices.CreateScope();
            using var context = scope.ServiceProvider.GetService<DatabaseContext>();
            context.Database.EnsureCreated();
        }
    }
}
