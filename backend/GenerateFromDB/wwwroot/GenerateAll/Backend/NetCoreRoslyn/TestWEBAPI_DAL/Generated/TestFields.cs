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
		var name = original.ToLower().Replace(" ","").Replace("event","event1").Replace("-","_").Replace("class","class1").Replace("object","object1").Replace("<","").Replace("/","").Replace(">","").Replace("(","").Replace(")","").ToLower();
		if(!IsIdentifier(name))
			name = "generated_"+name;
		if(nameClass.ToLower() == name)
            name= "generated_"+name;
		return RemoveAccents(ToAlphaNumeric(name.Trim()));
	}
    string RemoveAccents(string text)
        {
            var sbReturn = new System.Text.StringBuilder();
            var arrayText = text.Normalize(System.Text.NormalizationForm.FormD).ToCharArray();
            foreach (char letter in arrayText)
            {
                if (System.Globalization.CharUnicodeInfo.GetUnicodeCategory(letter) != System.Globalization.UnicodeCategory.NonSpacingMark)
                    sbReturn.Append(letter);
            }
            return sbReturn.ToString();
        }

    string ToAlphaNumeric(string input)
    {
        int j = 0;
        char[] newCharArr = new char[input.Length];

        for (int i = 0; i < input.Length; i++)
        {
            if (char.IsLetterOrDigit(input[i]))
            {
                newCharArr[j] = input[i];
                j++;
            }
        }

        System.Array.Resize(ref newCharArr, j);

        return new string(newCharArr);
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
                    nameType = "date";
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
using System.Linq;
using TestWebAPI_Searches;

namespace TestWebAPI_DAL
{
    
    
    public record Field(string Name, FieldTypeSearch fieldTypeSearch) : IField
    {
        public string fieldTypeSearchName
        {
            get
            {
                return fieldTypeSearch.ToString();
            }
        }
        private KeyValuePair<SearchCriteria, string> From(SearchCriteria s)
        {
            return new KeyValuePair<SearchCriteria, string>(s, s.ToString());
        }
        public KeyValuePair<SearchCriteria, string>[] Searches {
            get
            {
                switch (fieldTypeSearch)
                {
                    case FieldTypeSearch.booleanType:
                        return new[]
                        {
                            From(SearchCriteria.Equal),
                            From(SearchCriteria.Different)
                        };
                    case FieldTypeSearch.numberType:
                        return new[]
                        {
                            From(SearchCriteria.Equal),
                            From(SearchCriteria.Different),
                            From(SearchCriteria.Greater),
                            From(SearchCriteria.Less),
                            From(SearchCriteria.GreaterOrEqual),
                            From(SearchCriteria.LessOrEqual)
                        };
                    case FieldTypeSearch.stringType:
                        return new[]
                        {
                            From(SearchCriteria.Equal),
                            From(SearchCriteria.Different),
                            From(SearchCriteria.StartsWith),
                            From(SearchCriteria.EndsWith),
                            From(SearchCriteria.Contains)
                        };
                    case FieldTypeSearch.dateType:
                        return new[]
                        {
                            From(SearchCriteria.Equal),
                            From(SearchCriteria.Different),
                            From(SearchCriteria.Greater),
                            From(SearchCriteria.Less),
                            From(SearchCriteria.GreaterOrEqual),
                            From(SearchCriteria.LessOrEqual)
                        };
                    
                    default:
                        throw new ArgumentException($"cannot find searches for {fieldTypeSearch}");
                }
            }
        }
        
    }


    public record TablesDescription(string nameTable, Field[] fields);

    
    
    public partial class AllTables
    {
        partial void ConstructorLastLine();

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

                    colFields+=",new Field(\""+nameColumn +"\",FieldTypeSearch."+ typeField + "Type)";
                }
            <text>
                this.Add("@nameTable" @Raw(colFields));
            </text>
            }
            <text>
            ConstructorLastLine();
            </text>
        }
        }
        
        public TablesDescription Add(string name, params Field[] fields)
        {
            var t = new TablesDescription(name, fields);
            tables.Add(name, t);
            return t;

        }
        public string[] TableNames
        {
            get
            {
                return tables.Select(it => it.Key).ToArray();
            }
        }
        public TablesDescription[] Tables
        {
            get
            {
                return tables.Values.ToArray();
            }
        }
        public TablesDescription GetTable(string name)
        {
            if (!tables.ContainsKey(name))
                throw new ArgumentException($"cannot find table {name}");

            return tables[name];
        }
    }
}