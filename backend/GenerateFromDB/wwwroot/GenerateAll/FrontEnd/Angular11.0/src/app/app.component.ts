@model Stankins.Interfaces.IDataToSent
@{
  var angular="@angular";
  var Component="@Component";
  
  var dtOptions= Model.FindAfterName("@@Options@@").Value;
  var nameApp = dtOptions.Rows.Find("ApplicationName")[1].ToString();
  
}
import { Component } from '@angular/core';

@(Component)({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = '@(nameApp)';
}
