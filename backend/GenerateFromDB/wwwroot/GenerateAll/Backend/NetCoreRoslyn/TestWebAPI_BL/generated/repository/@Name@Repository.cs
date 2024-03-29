@model Stankins.Interfaces.IDataToSent
@{
    string guidType = typeof(System.Guid).Name;
    //string guidTypeNullable=typeof(System.Nullable<System.Guid>).Name;
    string byteType=typeof(System.Byte[]).Name;
    
	string ClassNameFromTableName(string tableName){
		return tableName.Replace(" ","").Replace(".","").Replace("(","").Replace(")","");
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
    var nameTable = dt.TableName;
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
    string genericRepository = "GenericRepositoryView.txt";
    string pkTemplate ="";
    switch(nrPK){
        case 0:
            break;
        case 1:
            repoInterface=":IRepository<"+(nameClass)+"," + (idType)+">";
            genericRepository ="GenericRepository.txt";
            pkTemplate=",PK1 = \"" + nameProperty(idTable, nameClass) +"\"";
            break;
        default:
            repoInterface=":IRepository<"+(nameClass)+"," + (idType)+","+ idTypeSecond + ">";
            genericRepository ="GenericRepository2PK.txt";
            pkTemplate=",PK1 = \"" + nameProperty(idTable, nameClass) +"\"";
            pkTemplate +=",PK2 = \"" + nameProperty(idTableSecond, nameClass) +"\"";
            break;
    }
    
	
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

using TestWebAPI_DAL;
using TestWebAPI_Searches;
using AOPEFCommon;

namespace TestWebAPI_BL
{
    [Template(template = TemplateMethod.CustomTemplateFile,CustomTemplateFileName ="@(genericRepository)" @Raw(pkTemplate)   )]
    public partial class @repoName @Raw(repoInterface)
    {
        private readonly DbSet<@(nameClass)> query@(nameClass);
        private readonly IDatabaseContext databaseContext;
        public @repoName (DbSet<@(nameClass)> query@(nameClass), IDatabaseContext databaseContext )
        {
            this.query@(nameClass) = query@(nameClass);
            this.databaseContext = databaseContext;
        }

        public partial OrderBy[] DefaultOrderBy()
        {
            
            @{
                
                var colNameSort=  "";

                if(nrPK>0){
                    colNameSort=nameProperty(idTable,nameClass);
                }
                else
                {
                    colNameSort= nameProperty( dt.Columns[0].ColumnName, nameClass);
                }
<text>
            
                return new OrderBy[1]
                {
                    new OrderBy()
                    {
                        Ascending=false,
                        Field = Metadata_@(nameClass).prop_@(colNameSort)
                    }
                };
            
</text>

                
                
            }
        }



        public IQueryable<@(nameClass)> GetSearch(IQueryable<@(nameClass)> data,TestWebAPI_Searches.SearchModel search, bool paginated)
        {
            ArrangeDefaults(search);
            if(search.SearchFields?.Length > 0)
            {
                foreach(var sf in search.SearchFields)
                {
                    if (string.IsNullOrWhiteSpace(sf.Field))
                        continue;
                    
                    switch (sf.Field.ToLower())
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
                        case Metadata_@(nameClass).prop_@(colName):
                            try{   
                                
                                var val = @(convert)(sf.Value);
                                switch (sf.Criteria)
                                {
                                    case SearchCriteria.Equal:
                                        data = data.Where(Metadata_@(nameClass).expr_@(colName)_equal(val));
                                        break;
                                    case SearchCriteria.Different:
                                        data = data.Where(Metadata_@(nameClass).expr_@(colName)_diff(val));
                                        break;  
                                        //@(nameType)
                                    @{
                                    if(nameType == "number" || nameType =="Date"){
                                        <text>
                                            case SearchCriteria.Greater:
                                                data = data.Where(Metadata_@(nameClass).expr_@(colName)_Greater(val));
                                                break;  
                                            case SearchCriteria.Less:
                                                data = data.Where(Metadata_@(nameClass).expr_@(colName)_Less(val));
                                                break;  
                                            case SearchCriteria.GreaterOrEqual:
                                                data = data.Where(Metadata_@(nameClass).expr_@(colName)_GreaterOrEqual(val));
                                                break;  
                                            case SearchCriteria.LessOrEqual:
                                                data = data.Where(Metadata_@(nameClass).expr_@(colName)_LessOrEqual(val));
                                                break;  
                                            
                                    
                                        </text>
                                        }
                                    if(nameType == "string" && (!isGuid) ){
                                        <text>
                                            case SearchCriteria.Contains:

                                                data = data.Where(Metadata_@(nameClass).expr_@(colName)_Contains(val));
                                                break;  
                                            case SearchCriteria.StartsWith:
                                                data = data.Where(Metadata_@(nameClass).expr_@(colName)_Starts(val));
                                                break;  
                                            case SearchCriteria.EndsWith:
                                                data = data.Where(Metadata_@(nameClass).expr_@(colName)_Ends(val));
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
                            throw new ArgumentException($"cannot find {sf.Field} in search at {nameof(@(nameClass))} ");
                    }
                }
            }

            //order by
            var nrOrderBys = search.OrderBys?.Length;
            if (nrOrderBys> 0)
            {
                IOrderedQueryable<@(nameClass)> order=null;
                var ord = search.OrderBys[0];
                if(!string.IsNullOrWhiteSpace(ord.Field))
                switch (ord.Field.ToLower()) {
                    @{
                        for(int iCol = 0;iCol < nrCols; iCol++){
                            var col = dt.Columns[iCol];
                            var colName= nameProperty(col.ColumnName,nameClass) ;
                            var nameType=  nameTypeForSearch(col.DataType.Name);
                            <text>
                                case Metadata_@(nameClass).prop_@colName:

                                    switch (ord.Ascending)
                                    {
                                        case true:
                                            order = data.OrderBy(Metadata_@(nameClass).expr_@colName);
                                            break;
                                        case false:
                                            order = data.OrderByDescending(Metadata_@(nameClass).expr_@colName);
                                            break;
                                        
                                    }
                                    break;
                            </text>
                        }
                    }
                }
                for(var i = 1; i < nrOrderBys.Value; i++)
                {
                    ord = search.OrderBys[i];
                    switch (ord.Field.ToUpper()) {
                    @{
                    for(int iCol = 0;iCol < nrCols; iCol++){
                        var col = dt.Columns[iCol];
                        var colName= nameProperty(col.ColumnName,nameClass) ;
                        var nameType=  nameTypeForSearch(col.DataType.Name);
                        <text>
                            case Metadata_@(nameClass).prop_@colName:
                                switch (ord.Ascending)
                                {
                                    case true:
                                        order = order.ThenBy(Metadata_@(nameClass).expr_@colName);
                                        break;
                                    case false:
                                        order = order.ThenByDescending(Metadata_@(nameClass).expr_@colName);
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
            if (paginated && nrOrderBys > 0 && search.Pagination?.PageSizeAbsolute() > 0)
            {
                var skip = search.Pagination.SkipRecords();
                var page = search.Pagination.PageSizeAbsolute();
                if (skip > 0) data = data.Skip(skip);
                if (page > 1) data = data.Take(page);
            }
            return data;
        }

       
    }
}
