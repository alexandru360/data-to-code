using GenerateAppBL;
using NPOI.SS.Formula.Functions;
using StankinsObjects;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace GenerateApp.Controllers
{
    public class GenerateAppV1 : IValidatableObject
    {
        public DataToSentTable receiveData;
        public async Task<InfoData> GenerateInfoData(connTypes connectionType)
        {
            receiveData = new DataToSentTable();
            var dt = new DataTable("DataSource");
            dt.Columns.Add("Number", typeof(int));
            dt.Columns.Add("TableName", typeof(string)).MaxLength = 300;

            int id = receiveData.AddNewTable(dt);
            receiveData.Metadata.AddTable(dt, id);
            

            for (int iTable = 0; iTable < (input?.Length??0); iTable++)
            {
                var table = input[iTable];
                dt.Rows.Add(new object[2] { iTable, table.table.name });
                var dtSheet = new DataTable();
                dtSheet.TableName = table.table.name;
                var dcPK = new List<DataColumn>();
                foreach (var field in table.table.fields)
                {
                    //make the real field type
                   var dc= dtSheet.Columns.Add(field.name, field.DotNetType(connectionType));
                    if (field.IsPK)
                        dcPK.Add(dc);

                    
                    dc.AllowDBNull = field.IsNullable;
                    
                
                }
                if(dcPK.Count>0)
                    dtSheet.PrimaryKey = dcPK.ToArray();
                
                int idSheet = receiveData.AddNewTable(dtSheet);
                receiveData.Metadata.AddTable(dtSheet, idSheet);

            }




            var dtRels = new DataTable("@@Relations@@");
            dtRels.Columns.Add("parent_object", typeof(string)).MaxLength = 300;
            dtRels.Columns.Add("parent_column", typeof(string)).MaxLength = 300;
            dtRels.Columns.Add("referenced_object", typeof(string)).MaxLength = 300;
            dtRels.Columns.Add("referenced_column", typeof(string)).MaxLength = 300;
            
            int idRel = receiveData.AddNewTable(dtRels);
            receiveData.Metadata.AddTable(dtRels, idRel);

            var all = await payLoadConn.FromPayloadConn();

            var ds = all.relations;
            if(ds?.Length>0)
            foreach (var item in ds)
            {
                var idParent = all.tables.FirstOrDefault(it => it.ID == item.TableParentId);
                var idRef = all.tables.FirstOrDefault(it => it.ID == item.TableRefID);
                if (idParent == null || idRef == null)
                    continue;

                var idFieldParent = idParent.fields.FirstOrDefault(it => it.ID == item.FieldParentId);
                var idFieldRef = idRef.fields.FirstOrDefault(it => it.ID == item.FieldRefId);
                if (idFieldParent == null || idFieldRef == null)
                    continue;

                dtRels.Rows.Add(idParent.name, idFieldParent.name, idRef.name, idFieldRef.name);


            }


            var con = Enum.Parse<connTypes>(this.payLoadConn.connType, true);
            var i = new InfoData(con)
            {
                logs = new Logs(),
                name = "custom" + MyDate.UTCFormat(),
                folderGenerator = "GenerateAll",
                GenerateAppV1 = this
            };

            return i;
        }

        public async Task<TableGenerator[]> ReadAllFromDB()
        {
            var t = new List<TableGenerator>();
            var all = await payLoadConn.FromPayloadConn();
            if (!all.Success)
            {
                Console.WriteLine("cannot generate data " + all.error);
                return null;
            }
            if (all.tables?.Length>0)
            foreach(var item in all.tables)
            {
                if (item.name == "dbo.sysdiagrams")
                    continue;

                var tg = new TableGenerator();
                tg.table = new Table();
                tg.table.name = item.name;
                tg.table.fields = item.fields;
                t.Add(tg);
            }
            
            if(all.views?.Length>0)
            foreach (var item in all.views)
            {
                var tg = new TableGenerator();
                tg.table = new Table();
                tg.table.name = item.name;
                tg.table.fields = item.fields;
                t.Add(tg);
            }

            return t.ToArray();

        }

        public PayLoadConn payLoadConn { get; set; }
        public TableGenerator[] input { get; set; }
        
        public Output[] output { get; set; }
        public async IAsyncEnumerable<ValidationResult> Validate()
        {
            var validOrig = Validate(null);
            foreach (var item in validOrig)
            {
                yield return item;
            }   

            var all = await payLoadConn.FromPayloadConn();
            foreach(var item in input)
            {
                var name = item.table.name;
                BaseWithColumns tableOrViewFromDb = all.tables.FirstOrDefault(it => it.name == name);
                if(tableOrViewFromDb == null)
                {
                    tableOrViewFromDb=all.views.FirstOrDefault(it => it.name == name);
                }
                if (tableOrViewFromDb == null)
                {
                    
                    yield return new ValidationResult($"cannot find table {name}");
                    continue;
                }
                foreach(var sent in item.table.fields)
                {
                    var fieldFromDb = tableOrViewFromDb.fields.FirstOrDefault(it => it.name == sent.name);
                    if (fieldFromDb == null)
                    {
                        yield return new ValidationResult($"cannot find field {sent.name} in {item?.table?.name}");
                        continue;
                    }
                    //TODO: put in another part than validate
                    sent.originalType = fieldFromDb.originalType;
                    sent.IsPK = fieldFromDb.IsPK;
                    sent.IsNullable = fieldFromDb.IsNullable;
                    sent.ID = fieldFromDb.ID;
                }
            }
        }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            if (this.payLoadConn == null)
            {
                yield return new ValidationResult("payload is null");
                yield break;
            }
            if((this.input?.Length??0) == 0)
            {
                yield return new ValidationResult("do not have tables in input");
                yield break;
            }

            if ((this.output?.Length ?? 0) == 0)
            {
                yield return new ValidationResult("do not have templates in output");
                yield break;
            }
        }
    }
    public class Output
    {
        public string ApiType { get; set; }
        public string UiType { get; set; }
    }
    public class TableGenerator: IValidatableObject
    {
        public Table table { get; set; }
        public CrudEndpoints crudEndpoints { get; set; }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            if (table == null)
                yield return new ValidationResult("table name does not exists");
            else
                foreach (var item in table.Validate(validationContext))
                {
                    yield return item;
                }


            if (crudEndpoints == null)
                yield return new ValidationResult("not crud endpoints");
            else
            foreach (var item in crudEndpoints.Validate(validationContext))
            {
                yield return item;
            }

        }
    }
    public class CrudEndpoints: IValidatableObject
    {
        public bool List { get; set; }
        public bool Create { get; set; }
        public bool Update { get; set; }
        public bool Delete { get; set; }
        public bool Upsert { get; set; }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            if (Upsert)
            {
                if (Update || Create)
                    yield return new ValidationResult("cannot have create or update if upsert");


            }
            if(Update || Create)
            {
                if(Upsert)
                    yield return new ValidationResult("cannot have upsert if create or update ");

            }
        }
    }
    public class PayLoadConn
    {
        public string connType { get; set; }
        public string connFileName { get; set; }
        public string connFileContent { get; set; }
        public string connHost { get; set; }
        public string connUser { get; set; }
        public string connPassword { get; set; }
        public string connDatabase { get; set; }
        public string connPort { get; set; }
        public bool connIntegratedSecurity { get; set; }
    }
    public enum connTypes
    {
        None = 0,
        Excel= 1,
        MSSQL,
        MYSQL,
        MariaDB
    }
}
