@{
  
	var angular="@angular";
	var Component = "@Component";
	
	string ClassNameFromTableName(string tableName){
		return tableName.Replace(" ","").Replace(".","").Replace("(","").Replace(")","");
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


	var dt= Model.FindAfterName("@Name@").Value;
	var nameTable =dt.TableName;
  var nameClass = ClassNameFromTableName(nameTable);
  var dtOptions= Model.FindAfterName("@@Options@@").Value;

  var nrPK = (int.Parse(dtOptions.Rows.Find(nameTable +"_PK_Number")[1].ToString())  );
  string idTable ="", idType = "" ,idTableSecond = "",idTypeSecond = "";

  string tapSecondId="";
  string secondArg="";
    if(nrPK > 0 ){
      idTable=dtOptions.Rows.Find(nameTable +"_PK_0")[1].ToString();     
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
        tapSecondId = "this.id2 = " + ((idType == "number")?"+":"" ) + "params.get('id2');";
        secondArg = ",this.id2";
    }
  
  var dtRels= Model.FindAfterName("@@Relations@@").Value;
	var rowsRelParent =dtRels.Select("parent_object='@Name@'" );


  string appender ="";
				if(idType == "number")
          appender = "+";
          
  string servicesRef="";
                

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tap, delay, switchMapTo, switchMap } from 'rxjs/operators';
import { @(nameClass) } from '../WebAPIClasses/@(nameClass)';
import { @(nameClass)Service } from '../services/@(nameClass).service';


@if(rowsRelParent.Length>0){
  var h=new System.Collections.Generic.HashSet<string>(rowsRelParent.Length);
  foreach(var row in rowsRelParent){

    var refTableName =ClassNameFromTableName(row["referenced_object"].ToString());
    if(refTableName == nameClass)
      continue;
    if(!h.Add(refTableName)){
        continue;
        }
    <text>
    import { @(refTableName)Service } from '../services/@(refTableName).service';
    import{ @(refTableName) } from '../WebAPIClasses/@(refTableName)';
    </text>
  }
}


@(Component)({
  selector: 'app-@(nameClass)edit',
  templateUrl: './@(nameClass)edit.component.html',
  styleUrls: ['./@(nameClass)edit.component.css']
})
export class @(nameClass)EditComponent implements OnInit {

  @if(nrPK>0){
    <text>
      public id: @(idType);
    </text>
  }

  @if(nrPK>1){
    <text>
      public id2: @(idTypeSecond);
    </text>
  }
  
  public dataToEdit: @(nameClass) = new @(nameClass)();

  @if(rowsRelParent.Length>0){
    var h=new System.Collections.Generic.HashSet<string>(rowsRelParent.Length);
    foreach(var row in rowsRelParent){
      var refTableName =ClassNameFromTableName(row["referenced_object"].ToString());
      if(!h.Add(refTableName)){
        continue;
        }
      servicesRef +=" private "+refTableName  +"SVC:" +refTableName +"Service,";
      <text>
      public @(refTableName)All: @(refTableName)[] = [];
      </text>
    }
}

  constructor(@Raw(servicesRef) private route: ActivatedRoute , private router: Router, private mainService: @(nameClass)Service ) {

    // route.paramMap.subscribe(params=>{
    //   this.id = +params.get('id');
    // });

   }
   @{
    if(nrPK==0){
      <text>
      ngOnInit(): void {}
      }
      </text>
      return;
    }
   }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      tap(params => 
        {
          this.id = @Raw(appender)params.get('id');
          @Raw(tapSecondId)
        } 
      ),
      switchMap(it => this.mainService.Get(this.id  @(secondArg)) ),
      delay(1000),
      tap(it => this.dataToEdit = it)
      )
  .subscribe();

    @if(rowsRelParent.Length>0){
      foreach(var row in rowsRelParent){
        var h=new System.Collections.Generic.HashSet<string>(rowsRelParent.Length);
        var refTableName =ClassNameFromTableName(row["referenced_object"].ToString());
        if(!h.Add(refTableName)){
          continue;
          }
        
        <text>
        this.@(refTableName)SVC.GetAll().subscribe(it => this. @(refTableName)All = it );
        
        </text>
      }
    }
  }
  public save(): void{
	const data=new @(nameClass)(this.dataToEdit);
    this.mainService.Update(data).subscribe(
      it => {
        window.alert('saved !');
      }
    );
  }
  public cancel(): void{
    this.router.navigate(['/crud/@(nameClass.ToLower())']);
  }


}
