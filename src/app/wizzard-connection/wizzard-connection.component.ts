import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-wizzard-connection',
  templateUrl: './wizzard-connection.component.html',
  styleUrls: ['./wizzard-connection.component.css']
})
export class WizzardConnectionComponent {

  title = 'Connection Information';
  oForm: FormGroup;
  hasUnitNumber = false;
  connTypes = [
    {name: 'Excel', abbreviation: 'XLS'},
    {name: 'SqLite', abbreviation: 'SQLITE'},
    {name: 'SqLite memory', abbreviation: 'SQLITEMEMO'},
    {name: 'Microsoft SQL Server', abbreviation: 'MSSQL'},
    {name: 'MySql', abbreviation: 'MYSQL'},
  ];

  constructor(private fb: FormBuilder) {
    this.oForm = this.fb.group({
      connType: [null, Validators.required],
      connHost: [null, Validators.required],
      connUser: [null, Validators.required],
      connPassword: [null, Validators.required],
      connDatabase: [null, Validators.compose([
        Validators.required, Validators.minLength(3),
        Validators.maxLength(20)])
      ],
    });
  }

  onSubmit() {
    const conn = {
      connType: null,
      connHost: null,
      connUser: null,
      connPassword: null,
      connDatabase: null,
    };

    console.log(this.oForm);
    conn.connType = this.oForm.controls.connType.value;
    conn.connHost = this.oForm.controls.connHost.value;
    conn.connUser = this.oForm.controls.connUser.value;
    conn.connPassword = this.oForm.controls.connPassword.value;
    conn.connDatabase = this.oForm.controls.connDatabase.value;

    alert(JSON.stringify(conn));
  }
}
