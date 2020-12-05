@{
	var angular="@angular";
	var Component = "@Component";
	 string ClassNameFromTableName(string tableName){
		return tableName.Replace(" ","").Replace(".","").Replace("(","").Replace(")","");
	}

	var dt= Model.FindAfterName("@Name@").Value;
	var nameTable =dt.TableName;
  var nameClass = ClassNameFromTableName(nameTable);
  var dtOptions= Model.FindAfterName("@@Options@@").Value;

  var havePK = (dtOptions.Rows.Find(dt.TableName +"_PK") != null);
  var dtRels= Model.FindAfterName("@@Relations@@").Value;
	var rowsRelParent =dtRels.Select("parent_object='@Name@'" );



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
  selector: 'app-@(nameClass)add',
  templateUrl: './@(nameClass)add.component.html',
  styleUrls: ['./@(nameClass)add.component.css']
})
export class @(nameClass)AddComponent implements OnInit {

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
  public dataToAdd: @(nameClass);
  constructor(@Raw(servicesRef) private router: Router, private mainService: @(nameClass)Service ) {

      this.dataToAdd = new @(nameClass)();
   }

  ngOnInit(): void {
    
  @if(rowsRelParent.Length>0){
    var h=new System.Collections.Generic.HashSet<string>(rowsRelParent.Length);
    foreach(var row in rowsRelParent){
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
  @{
    if(!havePK){
      <text>
    }
    </text>
    return;
    }
  }

  public add(): void{
	const data=new @(nameClass)(this.dataToAdd);
    this.mainService.Insert(data).subscribe(
      it => {
        window.alert('saved !');
      }
    );
  }
  public cancel(): void{
    this.router.navigate(['/@(nameClass.ToLower())']);
  }


}
