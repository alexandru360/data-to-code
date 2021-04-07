import {Component, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  // styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  items: MenuItem[];

  constructor() {
    this.items = [];
  }

  ngOnInit(): void {
    this.items = [
      {label: 'Home', icon: '', routerLink: '/'},
      {label: 'Create new application', routerLink: 'new-app-template-selection'},
      {label: 'What ... ?', routerLink: 'new-app-template-population'}
    ];
  }
}
