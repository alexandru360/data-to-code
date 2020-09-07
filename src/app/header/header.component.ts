import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title = 'Data to Code#';

  showSecondRow: boolean;

  constructor() {
    this.showSecondRow = true;
  }

  ngOnInit(): void {
  }

  onClickShowSecondRow() {
    this.showSecondRow = !this.showSecondRow;
  }

  onClickLogin() {
    alert('Login component ...');
  }

}

