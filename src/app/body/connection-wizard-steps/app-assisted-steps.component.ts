import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-connection-wizard-steps',
  templateUrl: './app-assisted-steps.component.html',
  styleUrls: ['./app-assisted-steps.component.css']
})
export class AppAssistedStepsComponent implements OnInit {

  isLinear: boolean;
  step1Head: string;
  step2Head: string;
  formGroup1: FormGroup;
  formGroup2: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.isLinear = true;
    this.step1Head = 'Chose a connection';
    this.step2Head = 'Chose and configure entities endpoints';
  }

  ngOnInit() {
    this.formGroup1 = this.formBuilder.group({
      form1: ['', Validators.required]
    });
    this.formGroup2 = this.formBuilder.group({
      form2: ['', Validators.required]
    });
  }

  onStepComplete1(stepComplete: boolean) {
    if (stepComplete) {
      this.formGroup1.get('form1').clearValidators();
      this.formGroup1.get('form1').setErrors(null);
    } else {
      this.formGroup1.get('form1').setValidators(Validators.required);
    }
  }

  onStepComplete2(stepComplete: boolean) {
    if (stepComplete) {
      this.formGroup2.get('form2').clearValidators();
      this.formGroup2.get('form2').setErrors(null);
    } else {
      this.formGroup2.get('form2').setValidators(Validators.required);
    }
  }
}
