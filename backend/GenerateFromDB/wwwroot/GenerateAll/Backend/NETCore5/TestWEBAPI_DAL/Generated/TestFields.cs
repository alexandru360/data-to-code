@model Stankins.Interfaces.IDataToSent
@{
    
	string ClassNameFromTableName(string tableName){
		return tableName.Replace(" ","").Replace(".","").Replace("(","").Replace(")","");
	}
	
    var ds= Model.FindAfterName("DataSource").Value;
    var dtOptions= Model.FindAfterName("@@Options@@").Value;
    
    var nrRowsDS=ds.Rows.Count;
    
    var nameTablesToRender = new string[nrRowsDS];
    var tables=new System.Data.DataTable[nrRowsDS];
    for (int iRowDS = 0; iRowDS < nrRowsDS; iRowDS++)
    {
        var nameTable = ds.Rows[iRowDS]["TableName"].ToString();
        var renderTable = Model.FindAfterName(nameTable).Value;
        nameTablesToRender[iRowDS] = nameTable;
        tables[iRowDS]=renderTable;
    }
	string nameProperty(string original, string nameClass){
		var name = original.ToLower().Replace(" ","").Replace("event","event1").Replace("class","class1").Replace("object","object1").Replace("<","").Replace("/","").Replace(">","").Replace("(","").Replace(")","").ToLower();
		if(!IsIdentifier(name))
			name = "generated_"+name;
		if(nameClass.ToLower() == name)
            name= "generated_"+name;
		return name.Trim();
	}
	//https://docs.microsoft.com/en-us/dotnet/api/microsoft.codeanalysis.csharp.syntaxfacts?view=roslyn-dotnet
	bool IsIdentifier(string text)
	{
     if (string.IsNullOrEmpty(text))
        return false;
     if (!char.IsLetter(text[0]) && text[0] != '_')
        return false;
     for (int ix = 1; ix < text.Length; ++ix)
        if (!char.IsLetterOrDigit(text[ix]) && text[ix] != '_')
           return false;
     return true;
	}

    string nameTypeForSearch(string colTypeName){
		string nameType = "";
		switch(colTypeName.ToLower()){
				case "string":
                case "guid":
					nameType="string";
                    break;
                case "boolean":
                    nameType= "boolean";
                    break;
                case "byte[]"://https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays
                    return "";
                    break;
                case "byte":
                  nameType="number";
                  break;
                case "datetime":
                    nameType = "Date";
                    break;
                case "single":
                case "double":
			    case "decimal":
                case "int16":
                case "int32":
                case "int64":
                case "long":
					nameType="number";
					break;
				default:
					return "";
					break;
			}
		return nameType;
	}

}
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using TestWebAPI_BL;

namespace TestWEBAPI_DAL
{
    
    public enum FieldTypeSearch
    {
        None=0,
        string=1,
        decimal=2,
        number=3,
        boolean=b

    }
    
    public record Field(string name,FieldTypeSearch fieldTypeSearch);

    public record TablesDescription(string nameTable, Fields[] fields);

    
    
    public class AllTables
    {
        private Dictionary<string, TablesDescription> tables;
        public AllTables()
        {
            tables = new Dictionary<string, TablesDescription>();
            @{
            foreach(var dt in tables){
			    var nameTable=dt.TableName;
                var nrColumns = dt.Columns.Count;
                var colFields="";
                for(var iCol=0;iCol<nrColumns;iCol++){
                    var column=dt.Columns[iCol];
                    string nameColumn = column.ColumnName;
                    string typeField=nameTypeForSearch(column.DataType.Name);
                    if(string.IsNullOrWhiteSpace(typeField))
                        continue;

                    colFields+=",new Field(\""+nameColumn +"\",FieldTypeSearch."+ typeField + ")";
                }
            <text>
                this.Add("@nameTable" @Raw(colFields));
            </text>
            }
        }
        }

        public TablesDescription Add(string name, params Fields[] fields)
        {
            var f = new TablesDescription(name, fields);
            tables.Add(name, f);
            return f;
        }
    }
}