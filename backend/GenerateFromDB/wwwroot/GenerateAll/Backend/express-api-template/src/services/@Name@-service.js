@model Stankins.Interfaces.IDataToSent
@{
    var parameter= "@param";
    var returnData ="@return";
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

const {@(nameClass)DeleteById} = require("../model-operations/@(nameClass)-delete");
const {@(nameClass)FindAll} = require("../model-operations/@(nameClass)-find-alld");
const {@(nameClass)FindById} = require("../model-operations/@(nameClass)-find");
const {appConn} = require("../helpers/app-connection");
const {@(nameClass)BulkUpsert} = require("../model-operations/@(nameClass)-upsert");
const {@(nameClass)TestTable} = require("../models/@(nameClass)-model");
const {appConfig} = require("../config");

const getAppConn = (connection, logger) => {
    const config = appConfig();
    return connection ? connection : appConn(config, logger);
}


/**
 * @(nameClass)UpsertService.
 *
 * @parameter  {content}  content -> insert/update
 * @parameter  {connection}  connection to instantiate the @(nameClass)
 * @parameter  {schema} schema -> database
 * @parameter  {logger} logger
 * @returnData {promise} promise -> status of db operation
 */
module.exports.@(nameClass)UpsertService = (content, connection, schema, logger) => {
    return new Promise((res, rej) => {
        const conn = getAppConn(connection, logger);

        logger.info("Entity - Mapping data to object");
        let obj = {

            @for(int iCol = 0;iCol < nrCols; iCol++){
                var col = dt.Columns[iCol];
                var colType = col.DataType;
                bool nullable=(col.AllowDBNull);
                var colName= nameProperty(col.ColumnName,nameClass) ;
                var nameType = nameTypeForJS(colType.Name);
                <text>
                    @(colName): content.@(colName) , 
                </text>
                
            }
            
        }

        const Entity = @(nameClass)TestTable(conn, null, logger);
        logger.info("Entity - Upsert");
        let arr = [];
        arr.push(obj);
        if (Entity)
            return @(nameClass)BulkUpsert(arr, Entity, logger, schema).then((r) => res(r)).catch((ex) => rej(ex));
        else
            throw new Error('Entity could not be created; check @(nameClass)UpsertService');
    });
}

/**
 * @(nameClass)FindService.
 *
 * @parameter  {connection}  connection to instantiate the @(nameClass)
 * @parameter  {schema} schema -> database
 * @parameter  {logger} logger
 * @returnData {promise} promise -> status of db operation
 */
module.exports.@(nameClass)FindService = (connection, schema, logger) => {
    return new Promise((res, rej) => {
        const conn = getAppConn(connection, logger);
        const Entity = @(nameClass)TestTable(conn, null, logger);
        if (Entity)
            return @(nameClass)FindAll(Entity, logger, schema).then((r) => res(r)).catch((ex) => rej(ex));
        else
            throw new Error('Entity could not be created; check @(nameClass)UpsertService');
    });
}

/**
 * @(nameClass)FindByIdService.
 *
 * @parameter  {parId}  parId -> id of record searched
 * @parameter  {connection}  connection to instantiate the @(nameClass)
 * @parameter  {schema} schema -> database
 * @parameter  {logger} logger
 * @returnData {promise} promise -> status of db operation
 */
module.exports.@(nameClass)FindByIdService = (parId, connection, schema, logger) => {
    return new Promise((res, rej) => {
        const conn = getAppConn(connection, logger);
        const Entity = @(nameClass)TestTable(conn, null, logger);
        if (Entity)
            return @(nameClass)FindById(parId, Entity, logger, schema).then((r) => res(r)).catch((ex) => rej(ex));
        else
            throw new Error('Entity could not be created; check @(nameClass)UpsertService');
    });
}

/**
 * @(nameClass)DeleteByIdService.
 *
 * @parameter  {parId}  parId -> id of record searched
 * @parameter  {connection}  connection to instantiate the @(nameClass)
 * @parameter  {schema} schema -> database
 * @parameter  {logger} logger
 * @returnData {promise} promise -> status of db operation
 */
module.exports.@(nameClass)DeleteByIdService = (parId, connection, schema, logger) => {
    return new Promise((res, rej) => {
        const conn = getAppConn(connection, logger);
        const Entity = @(nameClass)TestTable(conn, null, logger);
        if (Entity)
            return @(nameClass)DeleteById(parId, Entity, logger, schema).then((r) => res(r)).catch((ex) => rej(ex));
        else
            throw new Error('Entity could not be created; check @(nameClass)UpsertService');
    });
}
