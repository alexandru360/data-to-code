import {Component} from '@angular/core';
import EntitiesDetails from '../class-and-types/entities-details';
import {AppAssistedStepsService} from '../../connection-wizard-steps/app-assisted-steps.service';
import CrudEndpoints from '../class-and-types/crud-endpoints';

@Component({
  selector: 'app-chose-tables-step-two',
  templateUrl: './step-two-chose-tables.component.html',
  styleUrls: ['./step-two-chose-tables.component.css']
})
export class StepTwoChoseTablesComponent {

  stepOnePayload: Array<EntitiesDetails>;

  constructor(private srvCommon: AppAssistedStepsService) {
    this.srvCommon.arrEntitiesDetails.subscribe(item => {
      this.stepOnePayload = item;
      const obj = this.stepOnePayload;

      if (obj) {
        obj.map(itm => {
          if (!itm.hasOwnProperty('crudEndpoints')) {
            itm.crudEndpoints = new CrudEndpoints();
            debugger;
            itm.crudEndpoints.setDefault();
            debugger;
          }
        });
      }
      console.log(item);
    });
  }

  displayedColumns: string[] = ['name', 'type', 'selected'];

  onSubmit() {
    console.log(this.stepOnePayload);
  }

}
