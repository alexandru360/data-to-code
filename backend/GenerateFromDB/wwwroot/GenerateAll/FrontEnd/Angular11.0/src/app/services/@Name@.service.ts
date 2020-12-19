@model Stankins.Interfaces.IDataToSent
@{
  
	var angular="@angular";
	var Injectable = "@Injectable";
	string ClassNameFromTableName(string tableName){
		return tableName.Replace(" ","").Replace(".","").Replace("(","").Replace(")","");
	}
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
                case "int16":
                case "int32":
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

		var dt= Model.FindAfterName("@Name@").Value;
    var nameTable =dt.TableName;
    var nameClass = ClassNameFromTableName(nameTable);
    var dtOptions= Model.FindAfterName("@@Options@@").Value;
    
   
    var nrPK = (int.Parse(dtOptions.Rows.Find(nameTable +"_PK_Number")[1].ToString())  );
            
    string idTable ="", idType = "" ,idTableSecond = "",idTypeSecond = "";
    if(nrPK > 0 ){
  
      idType = dtOptions.Rows.Find(nameTable +"_PK_0_Type")[1].ToString();     
      idTable = nameProperty(idTable,nameClass);
      idType = nameTypeForJS(idType);
    }
    if( nrPK > 1 ) { 
        // just 2 PK
        idTypeSecond = dtOptions.Rows.Find(nameTable +"_PK_1_Type")[1].ToString();
        idTableSecond=dtOptions.Rows.Find(nameTable +"_PK_1")[1].ToString();     
        idTableSecond = nameProperty(idTableSecond,nameClass);
        idTypeSecond= nameTypeForJS(idTypeSecond);
  
    }
  
	
    var Inject=@"@Inject";
}
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import{ @nameClass } from './../WebAPIClasses/@nameClass';
import { APP_BASE_HREF } from '@angular/common';
import { PaginatedRecords } from './PaginatedRecords';
import { SearchModel } from './SearchModel';


@(Injectable)({
  providedIn: 'root'
})
export class @(nameClass)Service {

  baseUrl: string;
  constructor(@(Inject)(APP_BASE_HREF) baseHref: string, private client: HttpClient) { 
    this.baseUrl = environment.webAPIUrl + baseHref ;
    console.log(environment.webAPIUrl );
    console.log(baseHref);
    console.log(this.baseUrl);
    

  }
  public Count() : Observable<number>{
    const url = this.baseUrl+'api/@nameClass/Count';
    
    return this.client.get<number>(url);
  }
  public GetAll() : Observable<@(nameClass)[]>{
    const url = this.baseUrl+'api/@nameClass/GetAll';
    
    return this.client.get<@(nameClass)[]>(url);
  }
  public SearchPaginated(search: SearchModel): Observable<PaginatedRecords<@(nameClass)>>{
    const url = this.baseUrl+'api/@(nameClass)/SearchPaginated';
    
    return this.client.post<PaginatedRecords<@(nameClass)>>(url,search);

  }
  @{
    if(nrPK == 0){
      <text>
      }
    
      </text>
      return;
    }
  }
  public Get(id:@(idType)):Observable<@(nameClass)>{
    const url = this.baseUrl+'api/@(nameClass)/Get/'+id;
    
    return this.client.get<@(nameClass)>(url);
  }
  public Update(data:@(nameClass)):Observable<@(nameClass)>{
    const url = this.baseUrl+'api/@(nameClass)/Put/'+data.@(idTable);
    
    return this.client.put<@(nameClass)>(url,data);
  }
  public Insert(data:@(nameClass)):Observable<@(nameClass)>{
    const url = this.baseUrl+'api/@(nameClass)/Insert/';
    
    return this.client.post<@(nameClass)>(url,data);
  }
  public Delete(id:@(idType)):Observable<@(idType)>{
    const url = this.baseUrl+'api/@(nameClass)/Delete/'+id;
    
    return this.client.delete<@(idType)>(url);
  }
 
}
