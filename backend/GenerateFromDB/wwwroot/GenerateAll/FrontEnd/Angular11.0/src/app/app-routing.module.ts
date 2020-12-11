@{
  var angular="@angular";
  var NgModule="@NgModule";
  string ClassNameFromTableName(string tableName){
		return tableName.Replace(" ","").Replace(".","").Replace("(","").Replace(")","");
	}

  var ds= Model.FindAfterName("DataSource").Value;
    
    var nrRowsDS=ds.Rows.Count;
    
    var nameTablesToRender = new string[nrRowsDS];
    var tables=new System.Data.DataTable[nrRowsDS];
    for (int iRowDS = 0; iRowDS < nrRowsDS; iRowDS++)
    {
        var nameTable = ds.Rows[iRowDS]["TableName"].ToString();
        var renderTable = Model.FindAfterName(nameTable).Value;
        nameTablesToRender[iRowDS] = nameTable;
        tables[iRowDS]=renderTable;
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

}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { DashboardComponent } from './dashboard/dashboard.component';


@foreach(var nameTable in nameTablesToRender){
	string nameClass=ClassNameFromTableName(nameTable);
<text>
import { @(nameClass)Component } from './WebAPIComponents/@(nameClass).component';

import { @(nameClass)AddComponent } from './WebAPIComponents/@(nameClass)add.component';

import { @(nameClass)EditComponent } from './WebAPIComponents/@(nameClass)edit.component';

</text>
}


const routes: Routes = [
  { path: 'about', component: AboutComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
@foreach(var nameTable in nameTablesToRender){
	string nameClass=ClassNameFromTableName(nameTable);
<text>
{ path: 'crud/@(nameClass.ToLower())', component: @(nameClass)Component },

{ path: 'crud/@(nameClass.ToLower())/add', component: @(nameClass)AddComponent },

{ path: 'crud/@(nameClass.ToLower())/edit/:id', component: @(nameClass)EditComponent },

</text>
}
  

];

@(NgModule)({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
