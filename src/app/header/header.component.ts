import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title = 'Data to Code#';
  showSecondRow: boolean;

  aaa = {
    connDatabase: 'andreiTest',
    connFileContent: null,
    connFileName: null,
    connHost: 'andreiTest',
    connPassword: 'andreiTest',
    connPort: '',
    connType: 'MARIADB',
    connUser: 'andreiTest',
  };

  constructor() {
    this.showSecondRow = false;
  }

  ngOnInit(): void {
  }

  onClickShowSecondRow() {
    this.showSecondRow = !this.showSecondRow;
  }
}

