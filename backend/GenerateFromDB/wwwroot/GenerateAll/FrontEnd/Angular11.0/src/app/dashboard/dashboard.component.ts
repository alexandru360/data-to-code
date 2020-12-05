@model Stankins.Interfaces.IDataToSent
@{
	var Component = "@Component";
  var angular="@angular";
  var ds= Model.FindAfterName("DataSource").Value;    
  var nrRowsDS=ds.Rows.Count;

  string ClassNameFromTableName(string tableName){
		return tableName.Replace(" ","").Replace(".","").Replace("(","").Replace(")","");
  }
  string services = "private titleService: Title, private metaService: Meta   ";
  for (int iRowDS = 0; iRowDS < nrRowsDS; iRowDS++)
  {
    var nameTable = ds.Rows[iRowDS]["TableName"].ToString();
    services+= " , private "+ClassNameFromTableName(nameTable).ToLower() +"Service:"+ ClassNameFromTableName(nameTable)+"Service";

  }

}
import { Title, Meta } from '@(angular)/platform-browser';
import { Component, OnInit } from '@(angular)/core';
@for (int iRowDS = 0; iRowDS < nrRowsDS; iRowDS++)
{
  var nameTable = ds.Rows[iRowDS]["TableName"].ToString();
  var className=ClassNameFromTableName(nameTable);
<text>
import { @(className)Service } from '../services/@(className).service';
</text>

}
@(Component)({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @for (int iRowDS = 0; iRowDS < nrRowsDS; iRowDS++)
  {
    var nameTable = ds.Rows[iRowDS]["TableName"].ToString();
    var className=ClassNameFromTableName(nameTable);
  <text>
  public @("numberRecords"+ className.ToLower()): number;
  </text>
  
  }
  
  constructor(@(services)) {
       this.titleService.setTitle('Main dashboard');
      this.metaService.addTags([
        {name: 'keywords', content: 'dashboard'},
        {name: 'description', content: 'dashboard'},
        {name: 'robots', content: 'index, follow'}
      ]);

   }

  ngOnInit(): void {

    @for (int iRowDS = 0; iRowDS < nrRowsDS; iRowDS++)
    {
      var nameTable = ds.Rows[iRowDS]["TableName"].ToString();
      var className=ClassNameFromTableName(nameTable);
      <text>
      this.@(className.ToLower())Service.Count().subscribe(it=> this.numberRecords@(className.ToLower())=it);      
      </text>

    }  

    
  }

}
