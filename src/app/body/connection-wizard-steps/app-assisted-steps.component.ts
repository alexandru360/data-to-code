import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AppConfigService} from '../../z-main/services/app-config.service';

@Component({
  selector: 'app-connection-wizard-steps',
  templateUrl: './app-assisted-steps.component.html',
  styleUrls: ['./app-assisted-steps.component.css']
})
export class AppAssistedStepsComponent implements OnInit {

  isLinear: boolean;
  step1Head: string;
  step2Head: string;
  secondFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.isLinear = true;
    this.step1Head = 'Chose a connection';
    this.step2Head = 'Chose and configure entities endpoints';
  }

  ngOnInit() {
    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }
}
