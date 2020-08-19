import {Component, Input} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import EntitiesDetails from '../class-and-types/entities-details';
import {AppAssistedStepsService} from '../../connection-wizard-steps/app-assisted-steps.service';

@Component({
  selector: 'app-chose-tables-step-two',
  templateUrl: './step-two-chose-tables.component.html',
  styleUrls: ['./step-two-chose-tables.component.css']
})
export class StepTwoChoseTablesComponent {

  ceva: any;

  addressForm = this.fb.group({
    company: null,
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    address: [null, Validators.required],
    address2: null,
    city: [null, Validators.required],
    state: [null, Validators.required],
    postalCode: [null, Validators.compose([
      Validators.required, Validators.minLength(5), Validators.maxLength(5)])
    ],
    shipping: ['free', Validators.required]
  });

  hasUnitNumber = false;
  states = [];

  constructor(private fb: FormBuilder,
              private srvCommon: AppAssistedStepsService) {
    this.srvCommon.arrEntitiesDetails.subscribe(item => {
      this.ceva = item;
      console.log(item);
    });
  }

  onSubmit() {
    console.log(this.ceva);
  }

}
