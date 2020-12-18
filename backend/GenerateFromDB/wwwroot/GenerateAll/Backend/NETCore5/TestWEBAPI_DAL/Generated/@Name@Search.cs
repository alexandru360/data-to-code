@model Stankins.Interfaces.IDataToSent
@{
    string guidType = typeof(System.Guid).Name;
    //string guidTypeNullable=typeof(System.Nullable<System.Guid>).Name;
    string byteType=typeof(System.Byte[]).Name;

	string ClassNameFromTableName(string tableName){
		return tableName.Replace(" ","").Replace(".","").Replace("(","").Replace(")","");
	}
    string nameProperty(string original, string nameClass){
		var name = original.ToLower().Replace(" ","").Replace("event","event1").Replace("class","class1").Replace("object","object1").Replace("<","").Replace("/","").Replace(">","").Replace("(","").Replace(")","").ToLower();
		if(!IsIdentifier(name))
			name = "generated_"+name;
		if(nameClass.ToLower() == name)
            name= "generated_"+name;
		return name.Trim();
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
    var dt= Model.FindAfterName("@Name@").Value;
    var dtOptions= Model.FindAfterName("@@Options@@").Value;

    var nrPK = (int.Parse(dtOptions.Rows.Find(nameTable +"_PK_Number")[1].ToString()));
    string idTable ="", idType = "",idTableSecond = "",idTypeSecond = "";
    if(nrPK >0 ){
        idTable = dtOptions.Rows.Find(dt.TableName +"_PK_0")[1].ToString();
        idType = dtOptions.Rows.Find(dt.TableName +"_PK_0_Type")[1].ToString();  
    }
    if(nrPK>1){
        idTableSecond = dtOptions.Rows.Find(dt.TableName +"_PK_1")[1].ToString();
        idTypeSecond = dtOptions.Rows.Find(dt.TableName +"_PK_1_Type")[1].ToString();  	
    }



    var nrCols =dt.Columns.Count;
    string nameClass= ClassNameFromTableName(dt.TableName);    
    
    string repoName= ClassNameFromTableName(dt.TableName)  + "_Repository";
    string repoInterface=":IRepositoryView<"+(nameClass)+">";
    if(nrPK>0){
        repoInterface=":IRepository<"+(nameClass)+"," + (idType)+">";
    }
    if(nrPK>1){
        repoInterface=":IRepository<"+(nameClass)+"," + (idType)+","+ idTypeSecond + ">";
    }

	
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

using TestWEBAPI_DAL;
using TestWebAPI_BL;
using TestWebAPI_Searches;

namespace TestWEBAPI_DAL
{
    public partial class @(nameClass)_Search: SearchModel<@(nameClass)>
    {

        
        protected override void ArrangeDefaults()
        {
            base.ArrangeDefaults();
            @{
                if(nrPK>0){
<text>
            if ((OrderBys?.Length ?? 0) == 0)
            {
                OrderBys = new OrderBy[1]
                {
                    new OrderBy()
                    {
                        Ascending=false,
                        Field = "@(idTable)"
                    }
                };
            }
</text>

                }
            }
        }
        public override IQueryable<@(nameClass)> GetSearch(IQueryable<@(nameClass)> data, bool paginated)
        {
            ArrangeDefaults();
            if(this.SearchFields?.Length > 0)
            {
                foreach(var sf in this.SearchFields)
                {
                    if (string.IsNullOrWhiteSpace(sf.Field))
                        continue;
                    
                    switch (sf.Field)
                    {
                        @{
                            for(int iCol = 0;iCol < nrCols; iCol++){
                                var col = dt.Columns[iCol];
                                var colType = col.DataType;

                                if(colType.Name == byteType)
                                    continue;

                                var colName= nameProperty(col.ColumnName,nameClass) ;
                                var nameType=  nameTypeForSearch(col.DataType.Name);
                                string convert = "Convert.To" + col.DataType.Name;
                                bool isGuid =(col.DataType.Name == guidType );
                                if(isGuid){
                                    convert ="Guid.Parse";
                                }
                                <text>
                        case "@(col.ColumnName)":
                            try{   
                                
                                var val = @(convert)(sf.Value);
                                switch (sf.Criteria)
                                {
                                    case SearchCriteria.Equal:
                                        data = data.Where(it => it.@(colName) == val);
                                        break;
                                    case SearchCriteria.Different:
                                        data = data.Where(it => it.@(colName) != val);
                                        break;  
                                        //@(nameType)
                                    @{
                                    if(nameType == "number" || nameType =="Date"){
                                        <text>
                                            case SearchCriteria.Greater:
                                                data = data.Where(it => it.@(colName) @Raw(">") val);
                                                break;  
                                            case SearchCriteria.Less:
                                                data = data.Where(it => it.@(colName) @Raw("<") val);
                                                break;  
                                            case SearchCriteria.GreaterOrEqual:
                                                data = data.Where(it => it.@(colName) @Raw(">=") val);
                                                break;  
                                            case SearchCriteria.LessOrEqual:
                                                data = data.Where(it => it.@(colName) @Raw("<=") val);
                                                break;  
                                            
                                    
                                        </text>
                                        }
                                    if(nameType == "string" && (!isGuid) ){
                                        <text>
                                            case SearchCriteria.Contains:

                                                data = data.Where(it => it.@(colName).Contains(val));
                                                break;  
                                            case SearchCriteria.StartsWith:
                                                data = data.Where(it => it.@(colName).StartsWith(val));
                                                break;  
                                            case SearchCriteria.EndsWith:
                                                data = data.Where(it => it.@(colName).EndsWith(val));
                                                break;  
                                        </text>
                                        } 
                                    }   
                                }
                                                                        
                            }
                            catch(Exception){
                                //do something with the error to avvert user of the problem
                            }
                            break;
                                </text>
                            }
                        }
                        default:
                            throw new ArgumentException($"cannot find {sf.Field} in search at {nameof(@(nameClass)_Search)} ");
                    }
                }
            }

            //order by
            var nrOrderBys = OrderBys?.Length;
            if (nrOrderBys> 0)
            {
                IOrderedQueryable<@(nameClass)> order=null;
                var ord = OrderBys[0];
                if(!string.IsNullOrWhiteSpace(ord.Field))
                switch (ord.Field.ToUpper()) {
                    @{
                        for(int iCol = 0;iCol < nrCols; iCol++){
                            var col = dt.Columns[iCol];
                            var colName= nameProperty(col.ColumnName,nameClass) ;
                            var nameType=  nameTypeForSearch(col.DataType.Name);
                            <text>
                                case "@(col.ColumnName.ToUpper())":

                                    switch (ord.Ascending)
                                    {
                                        case true:
                                            order = data.OrderBy(it => it.@(colName));
                                            break;
                                        case false:
                                            order = data.OrderByDescending(it => it.@(colName));
                                            break;
                                        
                                    }
                                    break;
                            </text>
                        }
                    }
                }
                for(var i = 1; i < nrOrderBys.Value; i++)
                {
                    ord = OrderBys[i];
                    switch (ord.Field.ToUpper()) {
                    @{
                    for(int iCol = 0;iCol < nrCols; iCol++){
                        var col = dt.Columns[iCol];
                        var colName= nameProperty(col.ColumnName,nameClass) ;
                        var nameType=  nameTypeForSearch(col.DataType.Name);
                        <text>
                            case "@(col.ColumnName.ToUpper())":
                                switch (ord.Ascending)
                                {
                                    case true:
                                        order = order.ThenBy(it => it.@(colName));
                                        break;
                                    case false:
                                        order = order.ThenByDescending(it => it.@(colName));
                                        break;
                                    
                                }
                                break;
                        </text>
                    }
                    }
                }   

                }
                data = order ?? data;

            }
            //pagination
            if (paginated && nrOrderBys > 0 && Pagination?.PageSizeAbsolute() > 0)
            {
                var skip = Pagination.SkipRecords();
                var page = Pagination.PageSizeAbsolute();
                if (skip > 0) data = data.Skip(skip);
                if (page > 1) data = data.Take(page);
            }
            return data;
        }
    }

   
}
