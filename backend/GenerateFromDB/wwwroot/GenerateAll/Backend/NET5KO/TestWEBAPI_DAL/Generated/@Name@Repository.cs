@model Stankins.Interfaces.IDataToSent
@{
    
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

    switch(nrPK){
        case 0:
            break;
        case 1:
            repoInterface=":IRepository<"+(nameClass)+"," + (idType)+">";
            break;
        default:
            repoInterface=":IRepository<"+(nameClass)+"," + (idType)+","+ idTypeSecond + ">";
            break;
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

    public partial class @repoName @Raw(repoInterface)
    {
        private readonly DatabaseContext databaseContext;

        public @repoName (DatabaseContext databaseContext)
        {
            this.databaseContext = databaseContext;
        }
        public Task<@(nameClass)[]> GetAll()
        {
            return databaseContext.@(nameClass).ToArrayAsync();
        }
        public Task<long> Count()
        {
            return databaseContext.@(nameClass).LongCountAsync();
        }
        public async Task<PaginatedRecords<@(nameClass)>> SearchPaginated(SearchModel<@(nameClass)> search)
        {
            var query = search.GetSearch(databaseContext.@(nameClass), paginated:false);
            var nr = await query.LongCountAsync();
            query = search.GetSearch(databaseContext.@(nameClass), paginated: true);
            var data = await query.ToArrayAsync();
            return new PaginatedRecords<@(nameClass)>(nr, data);
         
        }
        @if(nrPK == 0){
            <text>
            }
        }

            </text>
            return;
        }
        @{
            string argumentsAfterId = idType + " id";
            string whereArguments="it."+nameProperty(idTable,nameClass) +" == id ";
            if(nrPK>1){
                argumentsAfterId +=  " ," + idTypeSecond + " id2" ;
                whereArguments += " && it." + nameProperty(idTableSecond,nameClass) +" == id2 ";
            }

        }
        public Task<@(nameClass)> FindAfterId(@Raw(argumentsAfterId))
        {
            var data = databaseContext.@(nameClass).FirstOrDefaultAsync(it => @Raw(whereArguments));
            return data;
        }
        public Task<@(nameClass)> FindSingle(Func<@(nameClass) ,bool> f)
        {
            var data = databaseContext.@(nameClass).FirstOrDefaultAsync(it=>f(it));
            return data;
        }
        public Task<@(nameClass)[]> FindMultiple(Func<@(nameClass), bool> f)
        {
            var data = databaseContext.@(nameClass).Where(it=>f(it));
            return data.ToArrayAsync();
        }
        public async Task<@(nameClass)> Insert(@(nameClass) p)
        {
            databaseContext.@(nameClass).Add(p);
            await databaseContext.SaveChangesAsync();
            return p;
        }
        public async Task<@(nameClass)> Update(@(nameClass) p)
        {
            @{
                string argsCallFindAfterId ="p."+ nameProperty(idTable,nameClass);
                if(nrPK>1){
                    argsCallFindAfterId +=",p."+ nameProperty(idTableSecond,nameClass);  
                }
            }
            var original = await FindAfterId(@(argsCallFindAfterId));
            if(original == null)
            {
                throw new ArgumentException($"cannot found @(nameClass)  with id = {p.@(nameProperty(idTable,nameClass))} ", nameof(p.@(nameProperty(idTable,nameClass))));
            }
            original.CopyPropertiesFrom(other: p, withID: true);                        
            await databaseContext.SaveChangesAsync();
            return p;
        }
        public async Task<@(nameClass)> Delete(@(nameClass) p)
        {
            var original = await FindAfterId(@(argsCallFindAfterId));
            databaseContext.@(nameClass).Remove(original);
            await databaseContext.SaveChangesAsync();
            return p;
        }

       
    }
}
