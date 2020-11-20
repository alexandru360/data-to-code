using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data;

namespace GenerateApp.Controllers
{
    public abstract class BaseWithColumns : IValidatableObject
    {
        public virtual IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            throw new System.NotImplementedException();
        }
        public string ID { get; set; }
        public string name { get; set; }
        public List<Field> fields { get; set; }

        public bool HasPK()
        {
            return this.fields?.Exists(it => it.IsPK)??false;
        }

        public void FillWithData(DataRow dr,DataRowCollection columns, DataTable keys)
        {
            var t = this;
            t.name = dr["name"].ToString();
            var id = dr["id"].ToString();
            t.ID = id;
            
            foreach (DataRow col in columns)
            {
                if (col["tableId"].ToString() != id)
                    continue;


                var f = new Field();
                f.name = col["name"].ToString();
                f.ID = col["id"].ToString();
                if (t.fields.Exists(f1 => f1.name == f.name))
                    continue;
                f.originalType = col["type"].ToString();
                f.IsNullable = (col["is_nullable"].ToString() == "1");
                foreach (DataRow row in keys.Rows)
                {

                    if (row["tableId"].ToString() != id.ToString())
                        continue;

                    if (row["column_id"].ToString() != col["id"].ToString())
                        continue;

                    string typeDesc = row["type_desc"].ToString();
                    if(!typeDesc.ToLower().Contains("primary"))
                        continue;

                    f.IsPK = true;
                    continue;

                }
                t.fields.Add(f);

            }
        }
    }
}
