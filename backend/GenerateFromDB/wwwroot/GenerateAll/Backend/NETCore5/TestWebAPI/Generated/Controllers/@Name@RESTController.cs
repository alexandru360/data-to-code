﻿@model Stankins.Interfaces.IDataToSent
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

namespace TestWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class REST_@(nameClass)Controller : ControllerBase
    {
        private readonly @Raw(typeRepository) _repository;

        public REST_@(nameClass)Controller(@Raw(typeRepository) repository)
        {
            _repository = repository;
        }

        // GET: api/@(nameClass)
        [HttpGet]
        public async Task<ActionResult<IEnumerable<@(nameClass)>>> GetAll()
        {
            return await _repository.GetAll();
        }
        @if(nrPK == 0) {
            <text>
                }
            }
            </text>
            return;
        }
         @{
                string argsCallFindAfterId =idType +" id";
                string callAfterId="id";
                string secondNotFound =""; 
                string httpArg="{id}";
                string secondIdPK="";
                if(nrPK>1){
                    argsCallFindAfterId +=","+ idTypeSecond + " id2";  
                    callAfterId +=",id2";
                    secondNotFound="and id2= {id2}";
                    httpArg+="/{id2}";
                    secondIdPK =","+ nameProperty(idTableSecond,nameClass) +"= id2";
                }
                
            }  
        // GET: api/@(nameClass)/5
        [HttpGet("@(httpArg)")]
        public async Task<ActionResult<@(nameClass)>> FindAfterId(@Raw(argsCallFindAfterId))
        {
            var record = await _repository.FindAfterId(@(callAfterId));

            if (record == null)
            {
                return NotFound($"cannot find record with id = {id} @(secondNotFound)");
            }

            return record;
        }

        // PUT: api/@(nameClass)/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("@(httpArg)")]
        public async Task<ActionResult<@(nameClass)>> Update(@Raw(argsCallFindAfterId), @(nameClass) record)
        {
            if (id != record.@(nameProperty(idTable,nameClass)))
            {
                return BadRequest();
            }
            
            await _repository.Update(record);
            
            return record;
        }

        // POST: api/@(nameClass)
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<@(nameClass)> Post(@(nameClass) record)
        {
            await _repository.Insert(record);

            return record;
        }

        // DELETE: api/@(nameClass)/5
        [HttpDelete("@(httpArg)")]
        public async Task<@(idType)> Delete(@Raw(argsCallFindAfterId))
        {
            
            await _repository.Delete( new @(nameClass)(){
                @(nameProperty(idTable,nameClass))=id @secondIdPK
            });


            return id;
        }

       
    }
}
