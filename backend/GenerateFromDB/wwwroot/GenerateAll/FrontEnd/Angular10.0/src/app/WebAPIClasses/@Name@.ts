@model Stankins.Interfaces.IDataToSent
@{
    
string ClassNameFromTableName(string tableName){
		return tableName.Replace(" ","").Replace(".","").Replace("(","").Replace(")","");
    }
    
   
    var dt= Model.FindAfterName("@Name@").Value;
    var nameTable =dt.TableName;
    var nameClass = ClassNameFromTableName(nameTable);
    var dtOptions= Model.FindAfterName("@@Options@@").Value;
    var havePK = (dtOptions.Rows.Find(dt.TableName +"_PK") != null);
    string idTable ="", idType = "";
    if(havePK){
        idTable = dtOptions.Rows.Find(dt.TableName +"_PK")[1].ToString();
        idType = dtOptions.Rows.Find(dt.TableName +"_PK_Type")[1].ToString();  
        idTable = nameProperty(idTable,nameClass);
    }
    var nrCols =dt.Columns.Count;
	string lowerCaseFirst(string s){
		return char.ToLower(s[0]) + s.Substring(1);
	}
	string nameProperty(string original, string nameClass){
		var name = original.ToLower().Replace(" ","").Replace("event","event1").Replace("class","class1").Replace("object","object1").Replace("<","").Replace("/","").Replace(">","").Replace("(","").Replace(")","").ToLower();
		if(!IsIdentifier(name))
			name = "generated_"+name;
            if(nameClass.ToLower() == name)
            name= "generated_"+name;
		return name.Trim();
	}
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
    string nameTypeForJS(string colTypeName){
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
                    nameType="Uint8Array";
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
                case "int32":
                case "int16":
                case "int64":
                case "long":
					nameType="number";
					break;
				default:
					nameType="!!!!"+colTypeName;
					break;
			}
		return nameType;
	}

	
}


export class @(nameClass)
    {
        
        
        public constructor(other:@(nameClass) = null){ 

            if(other != null){
				this.CopyPropertiesFrom(other, true);
			}
                
        }
        public CopyPropertiesFrom(other:@(nameClass), withID: boolean):void{
            
            @{
                if(havePK){
                    <text>
            if(withID){
                this.@(idTable)= other.@(idTable);
            }
            </text>
                }
            }
            @for(int iCol = 0;iCol < nrCols; iCol++){
                var col = dt.Columns[iCol];
                var colName= nameProperty(col.ColumnName,nameClass) ;
                var nameType = nameTypeForJS(col.DataType.Name);
				string appender ="";
				if(nameType == "number")
					appender = "+";
                <text>
            this.@lowerCaseFirst(colName) = @(Raw(appender))other.@lowerCaseFirst(colName);
                </text>

            }

            
        }
        @{
            if(havePK){
                <text>
        public  @(idTable): @(nameTypeForJS(idType));
            </text>
            }
        }
        
        @for(int iCol = 0;iCol < nrCols; iCol++){
            var col = dt.Columns[iCol];
            var colName= nameProperty(col.ColumnName,nameClass) ;
            if(colName.ToLower() == idTable.ToLower())
                continue;
            var colType = col.DataType;
			var nameType = nameTypeForJS(colType.Name);
			

            <text>
            public @(colName) : @(nameType);
            </text>

        }
        
    }

	