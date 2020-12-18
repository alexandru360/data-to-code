@model Stankins.Interfaces.IDataToSent
@{
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
    var havePK = (dtOptions.Rows.Find(dt.TableName +"_PK_0") != null);
    string idTable ="", idType = "";
    if(havePK ){
        idTable = dtOptions.Rows.Find(dt.TableName +"_PK_0")[1].ToString();
        idType = dtOptions.Rows.Find(dt.TableName +"_PK_0_Type")[1].ToString();  
    }
	string nameClass= ClassNameFromTableName(dt.TableName);
    
    string repo= nameClass  + "_Repository";
    string typeRepository = "IRepositoryView<"+ nameClass +">";
    if(havePK){
        typeRepository = "IRepository<" + (nameClass) + "," + (idType) + ">";
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
        @if(!havePK) {
            <text>
                }
            }
            </text>
            return;
        }
            
        // GET: api/@(nameClass)/5
        [HttpGet("{id}")]
        public async Task<ActionResult<@(nameClass)>> FindAfterId(@(idType) id)
        {
            var record = await _repository.FindAfterId(id);

            if (record == null)
            {
                return NotFound($"cannot find record with id = {id}");
            }

            return record;
        }

        // PUT: api/@(nameClass)/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<ActionResult<@(nameClass)>> Update(@(idType) id, @(nameClass) record)
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
        [HttpDelete("{id}")]
        public async Task<@(idType)> Delete(@(idType) id)
        {
            
            await _repository.Delete( new @(nameClass)(){
                @(nameProperty(idTable,nameClass))=id
            });


            return id;
        }

       
    }
}
