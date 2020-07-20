import { Component, OnInit } from '@angular/core';
import {ThemePalette} from '@angular/material/core';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {

  color: ThemePalette = 'accent';
  checked = false;
  disabled = false;

  constructor() { }

  ngOnInit(): void {
  }

}
