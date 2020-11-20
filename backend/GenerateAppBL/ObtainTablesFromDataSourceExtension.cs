using Microsoft.AspNetCore.Server.Kestrel;
using Microsoft.Data.SqlClient;
using MySqlConnector;
using Stankins.Excel;
using Stankins.Interfaces;
using Stankins.MariaDB;
using Stankins.SqlServer;
using StankinsObjects;
using StankinsReceiverDB;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Linq;
using System.Threading.Tasks;

namespace GenerateApp.Controllers
{
    public static class ObtainTablesFromDataSourceExtension
    {
        public async static Task<TablesFromDataSource> FromExcel(this string filePath)
        {
            try
            {
                var recExcel = new ReceiverExcel(filePath);

                var data = await recExcel.TransformData(null);

                var renameExcel = new TransformerRenameTable("it=>it.Contains(\".xls\")", "DataSource");

                data = await renameExcel.TransformData(data);

                var renameCol = new ChangeColumnName("SheetName", "TableName");
                data = await renameCol.TransformData(data);

                var ds = data.FindAfterName("DataSource").Value;
                var nrRowsDS = ds.Rows.Count;
                var nameTablesToRender = new Table[nrRowsDS];

                for (int iRowDS = 0; iRowDS < nrRowsDS; iRowDS++)
                {
                    var nameTable = ds.Rows[iRowDS]["TableName"].ToString();
                    var dt = data.FindAfterName(nameTable).Value;
                    var t = new Table();
                    t.name = dt.TableName;
                    nameTablesToRender[iRowDS] = t;
                }
                var res = new TablesFromDataSource();
                res.Success = true;
                res.tables = nameTablesToRender;
                return res;


            }
            catch (Exception ex)
            {
                var res = new TablesFromDataSource();
                res.Success = false;
                res.error = ex.Message + "!!" + ex.StackTrace;
                return res;
            }
        }
        private static  DataTable FindTableOrNull(IDataToSent data, string nameTable)
        {
            if (data.Metadata.Tables.Count(item => item.Name.Equals(nameTable,StringComparison.InvariantCultureIgnoreCase)) == 0)
                return null;

            return data.FindAfterName(nameTable).Value;
        } 
        private async static Task<TablesFromDataSource> FromReceiver(DatabaseReceiver recData)

        {
            var data = await recData.TransformData(null);
            var tables = FindTableOrNull( data,"tables")?.Rows;
            var columns = FindTableOrNull(data,"columns")?.Rows;
            
            var views = FindTableOrNull(data,"views")?.Rows;
            var keys = FindTableOrNull(data,"keys");
            var nameTables = new List<Table>();
            var nameViews = new List<View>();
            if(tables?.Count>0)
            foreach (DataRow dr in tables)
            {
                var t = new Table();
                t.FillWithData(dr, columns, keys);

                //if (t.HasPK())
                nameTables.Add(t);
            }
            if(views?.Count>0)
            foreach (DataRow dr in views)
            {
                var t = new View();
                t.FillWithData(dr, columns, keys);
                nameViews.Add(t);

            }

            var rels = new List<Relations>();
            var relTable = FindTableOrNull(data,"relations");
            if(relTable?.Rows?.Count>0)
            foreach (DataRow dr in relTable.Rows)
            {
                var r = new Relations();
                r.TableParentId = dr["parent_object_id"].ToString();
                r.TableRefID = dr["referenced_object_id"].ToString();
                r.FieldParentId = dr["parent_column_id"].ToString();
                r.FieldRefId = dr["referenced_column_id"].ToString();
                rels.Add(r);
            }

            var res = new TablesFromDataSource();
            res.Success = true;
            res.relations = rels?.ToArray();
            res.tables = nameTables?.ToArray();
            res.views = nameViews?.ToArray();
            return res;
        }
        public async static Task<TablesFromDataSource> FromMSSQL(this string connection)
        {
            try
            {
                var recData = new ReceiveMetadataFromDatabaseSql(connection);

                return  await FromReceiver( recData);

                
            }
            catch (Exception ex)
            {
                var res = new TablesFromDataSource();
                res.Success = false;
                res.error = connection + "!!!" + ex.Message + "!!" + ex.StackTrace;
                return res;
            }
        }

        public async static Task<TablesFromDataSource> FromMariaDB(this string connection)
        {
            try
            {
                var recData = new ReceiveMetadataFromDatabaseMariaDB(connection);

                return await FromReceiver(recData);
            }
            catch (Exception ex)
            {
                var res = new TablesFromDataSource();
                res.Success = false;
                res.error = connection + "!!!" + ex.Message + "!!" + ex.StackTrace;
                return res;
            }
        }
        public static string ConnectionString(this PayLoadConn payLoadConn)
        {
            
            var typeToLoad = Enum.Parse<connTypes>(payLoadConn.connType, true);
            
            switch (typeToLoad)
            {
                case connTypes.MariaDB:
                case connTypes.MYSQL:
                    {
                        var mariaDBConStr = new MySqlConnectionStringBuilder();
                        mariaDBConStr.Database = payLoadConn.connDatabase;
                        mariaDBConStr.Server = payLoadConn.connHost;
                        mariaDBConStr.UserID = payLoadConn.connUser;
                        mariaDBConStr.Password = payLoadConn.connPassword;
                        if (int.TryParse(payLoadConn.connPort, out var port))
                        {
                            mariaDBConStr.Port = (uint)port;
                        }
                        return mariaDBConStr.ConnectionString;
                    }
                case connTypes.MSSQL:
                    {
                        var sqlConStr = new SqlConnectionStringBuilder();
                        sqlConStr.DataSource = payLoadConn.connHost;
                        if (int.TryParse(payLoadConn.connPort, out var port))
                        {
                            sqlConStr.DataSource += ","+(uint)port;
                        }
                        sqlConStr.InitialCatalog = payLoadConn.connDatabase;
                        sqlConStr.UserID = payLoadConn.connUser;
                        sqlConStr.Password = payLoadConn.connPassword;
                        sqlConStr.IntegratedSecurity = payLoadConn.IntegratedSecurity;           
                        return sqlConStr.ConnectionString;
                    }

                default:
                    throw new ArgumentException($"no connection for {typeToLoad}");

            }
        }

            public async static Task<TablesFromDataSource> FromPayloadConn(this PayLoadConn payLoadConn)
        {
            var ret = new TablesFromDataSource();
            ret.Success = false;
            string connection = null;
            var val = payLoadConn.connType;
            connTypes typeToLoad;
            try
            {
                typeToLoad = Enum.Parse<connTypes>(val, true);
            }
            catch
            {
                ret.error = $" cannot parse conn type {val} ";
                return ret;
            }
            try
            {
                    connection = payLoadConn.ConnectionString();
                switch (typeToLoad)
                {
                    case connTypes.MariaDB:
                    case connTypes.MYSQL:
                        return await connection.FromMariaDB();
                    case connTypes.MSSQL:
                        return await connection.FromMSSQL();
                    default:
                        throw new ArgumentException($"not such {typeToLoad} ");
                }
                    
                    //case connTypes.XLS:
                    //    var bytes = Convert.FromBase64String(payLoadConn.connFileContent);
                    //    var path = Path.Combine(
                    //              environment.WebRootPath,
                    //              payLoadConn.connFileName);
                    //    if (System.IO.File.Exists(path))
                    //        System.IO.File.Delete(path);



                    //    return await path.FromExcel();
                    
                
            }
            catch (Exception ex)
            {
                ret.error = connection;
                ret.error += "!!!" + ex.Message + "!!!" + ex.StackTrace;
                return ret;
            }
        }
    }


}
