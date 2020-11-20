@model Stankins.Interfaces.IDataToSent
@{
	string ClassNameFromTableName(string tableName){
		return tableName.Replace(" ","").Replace(".","").Replace("(","").Replace(")","");
	}
	
    var dt= Model.FindAfterName("@Name@").Value;
    var nameTable= dt.TableName;
    string nameClass= ClassNameFromTableName(nameTable);
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
    string nameTypeForJS(string colTypeName){
		string nameType = "";
		switch(colTypeName.ToLower()){
				case "string":
                case "guid":
					nameType="DataTypes.STRING";
                    break;
                case "boolean":
                    nameType= "DataTypes.BOOLEAN";
                    break;
                case "byte[]"://https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays
                    nameType="DataTypes.BLOB";
                    break;
                case "byte":
                  nameType="DataTypes.BLOB";
                  break;
                case "datetime":
                    nameType = "DataTypes.Date";
                    break;
                case "single":
                case "double":
				        case "DataTypes.DECIMAL":
                case "int16":
                case "int32":
                case "int64":
                case "long":
					nameType="DataTypes.INTEGER";
					break;
				default:
					nameType="!!!!"+colTypeName;
					break;
			}
		return nameType;
    }
    
    
}

//AlexBadita: what to do with views  -they do not have pk?
module.exports.@(nameClass)FindById = (parId, Entity, logger) => {
    return new Promise((res, rej) => {
        Entity.findAll({
            where: {
                @{
                    if(havePK){
                        <text>
                            
                            @(nameProperty(idTable,nameClass)): parId
                        </text>

                    }
                }

            }
        }).then((item) => {
            if (!item) {
                res('item not found');
            }
            res(item[0].dataValues);
        }).catch(ex => {
            logger.error(ex);
            rej(ex);
        });
    });
}
