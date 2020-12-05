@{
  
	var angular="@angular";
  var Component = "@Component";
  var ViewChild="@ViewChild";
  string ClassNameFromTableName(string tableName){
		return tableName.Replace(" ","").Replace(".","").Replace("(","").Replace(")","");
	}
	var dt= Model.FindAfterName("@Name@").Value;
  var nameTable =dt.TableName;
  var nameClass = ClassNameFromTableName(nameTable);
  var dtOptions= Model.FindAfterName("@@Options@@").Value;

  var havePK = (dtOptions.Rows.Find(dt.TableName +"_PK") != null);
  string idTable ="", idType = "";
  if(havePK){
    idTable = dtOptions.Rows.Find(dt.TableName +"_PK")[1].ToString();
    idType = dtOptions.Rows.Find(dt.TableName +"_PK_Type")[1].ToString();  
    idTable = lowerCaseFirst(idTable);
  }
  
  var nrCols= dt.Columns.Count;
  

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
	
	string colNames= "";
	for(int iCol = 0;iCol < nrCols; iCol++){
    var col = dt.Columns[iCol];
    colNames += ",'"+ lowerCaseFirst(nameProperty(col.ColumnName,nameClass)) +"'";
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
                case "int32":
                case "int16":  
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
  string operations="";
  if(havePK){
    operations=",'operations'";
  }


}
import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';

import{ @(nameClass) } from './../WebAPIClasses/@(nameClass)';
import {@(nameClass)Service} from './../services/@(nameClass).service';

@(Component)({
  selector: 'app-@(nameClass)-component',
  templateUrl: './@(nameClass).component.html',
  styleUrls: ['./@(nameClass).component.css']
})
export class @(nameClass)Component implements OnInit {

  displayedColumns: string[] = [ 'rowIndex' @Raw(colNames)    @Raw(operations)];
  dataSource: MatTableDataSource<@(nameClass)> = new MatTableDataSource<@(nameClass)>([]);

  @(ViewChild)(MatPaginator, {static: true}) paginator: MatPaginator;
  @(ViewChild)(MatSort, {static: true}) sort: MatSort;

  

  public rows:@(nameClass)[]=[];
  constructor(private mainService: @(nameClass)Service, private router: Router,private titleService: Title,  private metaService: Meta  ) {
      this.titleService.setTitle('List of @(nameTable)');
      this.metaService.addTags([
        {name: 'keywords', content: '@(nameTable)'},
        {name: 'description', content: 'List of @(nameTable)'},
        {name: 'robots', content: 'index, follow'}
      ]);

   }

  ngOnInit(): void {
	  this.mainService.GetAll().subscribe(it=>{
    this.rows=it;
    this.dataSource = new MatTableDataSource(it);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    });
  }
  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
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
  

  public deleteData(id: @(nameTypeForJS(idType))): void{

    if(!window.confirm("do you want to delete row "+ id)){
      return;
    }

    this.mainService
    .Delete(id)
    .pipe(
      
      tap(idDeleted=>{
    // const ndx = this.rows.findIndex(it=>it.id == idDeleted);
      // this.rows.splice(ndx,1);
      // this.dataSource = new MatTableDataSource(this.rows);
      const ndx = this.rows.findIndex(it => it.@nameProperty(idTable,nameClass) === idDeleted);
      this.dataSource.data.splice(ndx, 1);
      this.dataSource._updateChangeSubscription();
    })
    )
    .subscribe();
  }
  public add(): void{
    this.router.navigate(["/@(nameClass.ToLower())/add"]);
    return;
  }

}
