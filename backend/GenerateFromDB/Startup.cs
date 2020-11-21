using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Hellang.Middleware.ProblemDetails;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using NetCore2Blockly;

namespace GenerateFromDB
{
    
    public class Startup
    {

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
            var c = (IConfigurationRoot)configuration;
            var s = c.GetDebugView();
            var x = 1;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            var Site = Configuration["BlocklySite:Site"];
            services.AddCors();
            services.AddControllers();
            services.AddBlockly(Site);
            services.AddProblemDetails(opts =>
            {
                
                // Control when an exception is included
                opts.IncludeExceptionDetails = (ctx, ex) =>
                {
                    // Fetch services from HttpContext.RequestServices
                    //var env = ctx.RequestServices.GetRequiredService<IHostEnvironment>();
                    //return env.IsDevelopment() || env.IsStaging();
                    return true;
                };
            }); 
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseProblemDetails(); 
            var PrefixBlocks = Configuration["BlocklySite:PrefixBlocks"];

            app.UseCors(it => it.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
            app.UseBlocklyUI(new BlocklyUIOptions()
            {
                HeaderName = "Database Generator",
                StartBlocks = start(PrefixBlocks)
            }); ;
            
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.UseDefaultFiles();
            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapFallbackToFile("home", "/index.html");
                endpoints.MapControllers();
                endpoints.MapFallbackToFile("{**slug}", "/index.html");
            });
            app.UseBlockly();
        }

        public  string start(string prefix)
        {
            
            {
                //return "";
                return @"<xml xmlns='https://developers.google.com/blockly/xml'>
  <variables>
    <variable id='c,JdBgG#Xq%pPn,)nN;{'>var_PayLoadConn</variable>
    <variable id='KMd@G+h:qKzF*WYeOCW^'>input</variable>
    <variable id='5hAhv(];x*|^j#h{4t:F'>tablesCrud</variable>
    <variable id='TodWS_`B/tFWU68q-ag-'>var_GenerateAppV1</variable>
  </variables>
  <block type='variables_set' x='-1149' y='-186'>
    <field name='VAR' id='c,JdBgG#Xq%pPn,)nN;{'>var_PayLoadConn</field>
    <value name='VALUE'>
      <block type='GenerateApp_Controllers_PayLoadConn'>
        <value name='val_connType'>
          <shadow type='text'>
            <field name='TEXT'>MARIADB</field>
          </shadow>
        </value>
        <value name='val_connFileName'>
          <shadow type='text'>
            <field name='TEXT'></field>
          </shadow>
        </value>
        <value name='val_connFileContent'>
          <shadow type='text'>
            <field name='TEXT'></field>
          </shadow>
        </value>
        <value name='val_connHost'>
          <shadow type='text'>
            <field name='TEXT'>alex360.go.ro</field>
          </shadow>
        </value>
        <value name='val_connUser'>
          <shadow type='text'>
            <field name='TEXT'>root</field>
          </shadow>
        </value>
        <value name='val_connPassword'>
          <shadow type='text'>
            <field name='TEXT'>datatocode</field>
          </shadow>
        </value>
        <value name='val_connDatabase'>
          <shadow type='text'>
            <field name='TEXT'>test_schema</field>
          </shadow>
        </value>
        <value name='val_connPort'>
          <shadow type='text'>
            <field name='TEXT'>85</field>
          </shadow>
        </value>
      </block>
    </value>
    <next>
      <block type='variables_set'>
        <field name='VAR' id='KMd@G+h:qKzF*WYeOCW^'>input</field>
        <value name='VALUE'>
          <block type='"+prefix+ @"api_Home_FindTables_POST'>
            <value name='val_payLoadConn'>
              <shadow type='GenerateApp_Controllers_PayLoadConn'></shadow>
              <block type='variables_get'>
                <field name='VAR' id='c,JdBgG#Xq%pPn,)nN;{'>var_PayLoadConn</field>
              </block>
            </value>
          </block>
        </value>
        <next>
          <block type='variables_set'>
            <field name='VAR' id='KMd@G+h:qKzF*WYeOCW^'>input</field>
            <value name='VALUE'>
              <block type='getproperty'>
                <field name='objectName'>object</field>
                <field name='prop'>property</field>
                <value name='ObjectToChange'>
                  <block type='variables_get'>
                    <field name='VAR' id='KMd@G+h:qKzF*WYeOCW^'>input</field>
                  </block>
                </value>
                <value name='PropertyName'>
                  <shadow type='text'>
                    <field name='TEXT'>input</field>
                  </shadow>
                </value>
              </block>
            </value>
            <next>
              <block type='text_print'>
                <value name='TEXT'>
                  <block type='converttostring'>
                    <value name='ValueToConvert'>
                      <block type='variables_get'>
                        <field name='VAR' id='KMd@G+h:qKzF*WYeOCW^'>input</field>
                      </block>
                    </value>
                  </block>
                </value>
                <next>
                  <block type='variables_set'>
                    <field name='VAR' id='5hAhv(];x*|^j#h{4t:F'>tablesCrud</field>
                    <value name='VALUE'>
                      <block type='" + prefix + @"api_Home_tableGenerator_POST'>
                        <value name='val_tables'>
                          <shadow type='lists_create_with'>
                            <mutation items='3'></mutation>
                          </shadow>
                          <block type='variables_get'>
                            <field name='VAR' id='KMd@G+h:qKzF*WYeOCW^'>input</field>
                          </block>
                        </value>
                      </block>
                    </value>
                    <next>
                      <block type='variables_set'>
                        <field name='VAR' id='TodWS_`B/tFWU68q-ag-'>var_GenerateAppV1</field>
                        <value name='VALUE'>
                          <block type='GenerateApp_Controllers_GenerateAppV1'>
                            <value name='val_payLoadConn'>
                              <block type='variables_get'>
                                <field name='VAR' id='c,JdBgG#Xq%pPn,)nN;{'>var_PayLoadConn</field>
                              </block>
                            </value>
                            <value name='val_input'>
                              <shadow type='lists_create_with'>
                                <mutation items='3'></mutation>
                              </shadow>
                              <block type='converttojson'>
                                <value name='ValueToConvert'>
                                  <block type='variables_get'>
                                    <field name='VAR' id='5hAhv(];x*|^j#h{4t:F'>tablesCrud</field>
                                  </block>
                                </value>
                              </block>
                            </value>
                          </block>
                        </value>
                        <next>
                          <block type='text_print'>
                            <value name='TEXT'>
                              <block type='" + prefix + @"api_Home_GenerateApp_POST'>
                                <value name='val_app'>
                                  <shadow type='GenerateApp_Controllers_GenerateAppV1'></shadow>
                                  <block type='variables_get'>
                                    <field name='VAR' id='TodWS_`B/tFWU68q-ag-'>var_GenerateAppV1</field>
                                  </block>
                                </value>
                              </block>
                            </value>
                          </block>
                        </next>
                      </block>
                    </next>
                  </block>
                </next>
              </block>
            </next>
          </block>
        </next>
      </block>
    </next>
  </block>
</xml>
";
            }
        } 
    }
}
