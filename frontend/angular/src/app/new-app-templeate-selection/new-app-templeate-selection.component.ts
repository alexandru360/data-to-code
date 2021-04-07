import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-new-app-templeate-selection',
  templateUrl: './new-app-templeate-selection.component.html',
  styleUrls: ['./new-app-templeate-selection.component.css']
})
export class NewAppTempleateSelectionComponent implements OnInit {

  templateOptions: any[];
  value: any;

  constructor() {
    this.templateOptions = [
      {icon: 'pi pi-align-center', idx: 0, caption: 'Header,menu,body aligned center'},
      {icon: 'pi pi-align-left', idx: 1, caption: 'Header,body aligned center, menu aligned left'},
    ];
  }

  ngOnInit(): void {
  }

  selectedOption(evt: MouseEvent): void {
    // tslint:disable-next-line:no-console
    console.info(evt);
  }
}
