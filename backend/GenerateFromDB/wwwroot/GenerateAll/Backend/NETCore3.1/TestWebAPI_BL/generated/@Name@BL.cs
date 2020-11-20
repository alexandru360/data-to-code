@model Stankins.Interfaces.IDataToSent
@{

    
	string ClassNameFromTableName(string tableName){
		return tableName.Replace(" ","").Replace(".","").Replace("(","").Replace(")","");
	}
	
    var dt= Model.FindAfterName("@Name@").Value;
    string nameClass= ClassNameFromTableName(dt.TableName);
    var dtOptions= Model.FindAfterName("@@Options@@").Value;

    var havePK = (dtOptions.Rows.Find(dt.TableName +"_PK") != null);
    string idTable ="", idType = "";
    if(havePK){
        idTable = dtOptions.Rows.Find(dt.TableName +"_PK")[1].ToString();  
        idType = dtOptions.Rows.Find(dt.TableName +"_PK_Type")[1].ToString();  
    }
	var nrCols =dt.Columns.Count;
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
}
using System;

namespace TestWebAPI_BL
{
    public partial class @(nameClass)
    {
        #region partial functions
        partial void OnConstructor();
        partial void OnCopyConstructor(@(nameClass) other, bool withID);
        #endregion

        #region constructors
        public @(nameClass) (){
            OnConstructor();
        }
        
        public @(nameClass)(@(nameClass) other):base(){ 

            OnCopyConstructor(other:other,withID: false);
                
        }
        public void CopyPropertiesFrom(@(nameClass) other, bool withID){
            @{
                if(havePK){
                <text>
            if(withID){
                this.@(nameProperty(idTable,nameClass))= other.@(nameProperty(idTable,nameClass));
            }
                </text>
                <text>
                var x="";
                </text>
                }
            }
            @for(int iCol = 0;iCol < nrCols; iCol++){
                var col = dt.Columns[iCol];
                var colName= nameProperty(col.ColumnName,nameClass) ;
                 if(colName == nameProperty(idTable,nameClass))
                        continue;
                
                <text>
            this.@colName = other.@colName;            
                </text>
            }

            OnCopyConstructor(other,withID);
        }

        #endregion
        
        #region Properties
        @{
            if(havePK){
                <text>
                public @(idType) @(nameProperty(idTable,nameClass)){get;set;}
                </text>
            }
        }

        @for(int iCol = 0;iCol < nrCols; iCol++){
            var col = dt.Columns[iCol];
            bool nullable=(col.AllowDBNull);
            var colName= nameProperty(col.ColumnName,nameClass) ;
            var colType = col.DataType;
            if(colType.FullName == typeof(string).FullName)
                nullable=false;
             if(colName.ToLower() == nameProperty(idTable,nameClass).ToLower())
                continue;
            <text>
            public @(colType.Name)@(nullable?"?":"") @(colName) { get; set; }
            </text>

        }
        #endregion
        
    }
}
