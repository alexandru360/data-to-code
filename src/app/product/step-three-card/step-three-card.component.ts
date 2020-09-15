import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-step-three-card',
  templateUrl: './step-three-card.component.html',
  styleUrls: ['./step-three-card.component.css']
})
export class StepThreeCardComponent implements OnInit {
  @Input() randSeed: string;
  @Input() downloadLink: string;
  @Input() sitePreviewLink: string;
  @Input() stepper: any;

  constructor() { }

  ngOnInit(): void {
  }

}
