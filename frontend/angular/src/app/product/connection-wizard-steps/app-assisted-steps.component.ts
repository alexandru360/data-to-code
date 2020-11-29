import {Component, isDevMode, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PlatformLocation} from '@angular/common';
import {AppConfigService} from '../../app.config.service';
import {MatStepper} from '@angular/material/stepper';
import {  realApiRootUrl } from '../class-and-types-and-tools/constants';

@Component({
  selector: 'app-connection-wizard-steps',
  templateUrl: './app-assisted-steps.component.html',
  styleUrls: ['./app-assisted-steps.component.css']
})
export class AppAssistedStepsComponent implements OnInit {
  // @Output() @ViewChild('stepper') wizStepper: MatStepper;
  isLinear: boolean;
  step1Head: string;
  step2Head: string;
  formGroup1: FormGroup;
  formGroup2: FormGroup;
  downloadLink: string;
  sitePreviewLink: string;
  sitePreviewSeed: string;
  @ViewChild(MatStepper) stepper: MatStepper;
  constructor(private formBuilder: FormBuilder,
              private location: PlatformLocation,
              private cfg: AppConfigService) {
    this.isLinear = true;
    this.step1Head = 'Chose a connection';
    this.step2Head = 'Chose and configure entities endpoints';
    this.downloadLink = '';
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
      this.stepper.next();
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

  onStepComplete2Data(event: any) {
    // console.log(event);
    // console.log((this.location as any).location);
    // console.log((this.location as any).location.href);
    // console.log((this.location as any).location.origin);
    
    this.sitePreviewSeed = event.site;
    this.downloadLink = `${realApiRootUrl(this.cfg.getConfiguration().urls.apiRootUrl)}/${event.zipGenerated}`;
    if (isDevMode()) {
      this.sitePreviewLink = `${this.cfg.getConfiguration().urls.apiRootUrl}/${event.site}`;
    } else {
      this.sitePreviewLink = `${(this.location as any).location.origin}/${event.site}`;
    }
  }
}
