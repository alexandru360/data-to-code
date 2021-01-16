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
    var nameTable = dt.TableName;
    var dtOptions= Model.FindAfterName("@@Options@@").Value;
    var nrPK = (int.Parse(dtOptions.Rows.Find(nameTable +"_PK_Number")[1].ToString())  );
    
    string idTable ="", idType = "",idTableSecond = "",idTypeSecond = "";
    if(nrPK>0){
        idTable = dtOptions.Rows.Find(dt.TableName +"_PK_0")[1].ToString();
        idType = dtOptions.Rows.Find(dt.TableName +"_PK_0_Type")[1].ToString();  	
    }
    if(nrPK>1){
        idTableSecond = dtOptions.Rows.Find(dt.TableName +"_PK_1")[1].ToString();
        idTypeSecond = dtOptions.Rows.Find(dt.TableName +"_PK_1_Type")[1].ToString();  	
    }
	string nameClass= ClassNameFromTableName(dt.TableName);
    
    string repo= nameClass  + "_Repository";
    string typeRepository = "IRepositoryView<"+ nameClass +">";
    switch(nrPK){
        case 0:
            break;
        case 1:
            typeRepository = "IRepository<" + (nameClass) + "," + (idType) + ">";
            break;
        default:
            typeRepository = "IRepository<" + (nameClass) + "," + (idType) + ","+ idTypeSecond + ">";
            break;
    }

}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TestWEBAPI_DAL;
using TestWebAPI_BL;
using TestWebAPI_Searches;
using Microsoft.Extensions.Logging;
namespace TestWebAPI.Controllers
{
    public class Admin@(nameClass)Controller : Controller
    {

        private readonly ILogger<Admin@(nameClass)Controller> _logger;

        public Admin@(nameClass)Controller(ILogger<Admin@(nameClass)Controller> logger)
        {
            _logger = logger;
        }

        public  ActionResult Index()
        {
            @@ViewData["Title"]="list of @(nameClass)";
            return View("Admin@(nameClass)_List");
        }
        public ActionResult Edit(int id){
            @@ViewData["Title"]="Edit  @(nameClass) with id"+id;
            return View("Admin@(nameClass)_Edit",id);
        }
    }
}