import {Component} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import EntitiesDetails from '../class-and-types/entities-details';
import {AppAssistedStepsService} from '../../connection-wizard-steps/app-assisted-steps.service';

@Component({
  selector: 'app-chose-tables-step-two',
  templateUrl: './step-two-chose-tables.component.html',
  styleUrls: ['./step-two-chose-tables.component.css']
})
export class StepTwoChoseTablesComponent {

  stepOneServerPayload: Array<EntitiesDetails>;

  constructor(private srvCommon: AppAssistedStepsService) {
    this.srvCommon.arrEntitiesDetails.subscribe(item => {
      this.stepOneServerPayload = item;
      console.log(item);
    });
  }

  displayedColumns: string[] = ['name', 'type', 'selected'];

  onSubmit() {
    console.log(this.stepOneServerPayload);
  }

}
