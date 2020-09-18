import {Component, Output} from '@angular/core';
import EntitiesDetails from '../class-and-types-and-tools/entities-details';
import {AppAssistedStepsService} from '../connection-wizard-steps/app-assisted-steps.service';
import CrudEndpoints from '../class-and-types-and-tools/crud-endpoints';
import {StepTwoConnWizService} from './step-two-conn-wiz.service';
import {PayloadConn} from '../../app.config.model';
import StepTwoSendPayload, {Field, Input, Table} from '../class-and-types-and-tools/step-two-send-payload';
import {EventEmitter} from '@angular/core';

@Component({
  selector: 'app-chose-tables-step-two',
  templateUrl: './step-two-chose-tables.component.html',
  styleUrls: ['./step-two-chose-tables.component.css'],
  providers: [StepTwoConnWizService]
})
export class StepTwoChoseTablesComponent {

  @Output() stepComplete = new EventEmitter<boolean>();
  @Output() dataFromStepTwo = new EventEmitter<any>();

  displayedColumns: string[] = ['name', 'type', 'selected'];
  stepOnePayload: Array<EntitiesDetails>;
  showSelection: any;
  payloadConn: PayloadConn;

  dataSent: any;

  btnStepComplete: boolean;
  btnDisableDataDebounce: boolean;

  constructor(private srvCommon: AppAssistedStepsService,
              private srvStepTwo: StepTwoConnWizService) {
    this.btnDisableDataDebounce = false;
    this.stepComplete.emit(false);
    this.srvCommon.connPayloadDetails.subscribe(item => this.payloadConn = item);
    this.srvCommon.arrEntitiesDetails.subscribe(item => {
      this.stepOnePayload = item;
      const obj = this.stepOnePayload;
      if (obj) {
        obj.map(itm => {
          itm.selected = true;
          if (!itm.hasOwnProperty('crudEndpoints')) {
            itm.crudEndpoints = new CrudEndpoints();
          }
          itm.fields.forEach(field => {
            field.selected = true;
          });
        });
      }
    });
  }

  onSubmit() {
    this.btnDisableDataDebounce = true;
    const payload: StepTwoSendPayload = new StepTwoSendPayload();
    payload.payloadConn = this.payloadConn;
    payload.input = [];
    // This is for pushing input ...
    this.stepOnePayload.forEach(el => {
      if (el.selected) {
        const newInput = new Input();
        newInput.crudEndpoints = el.crudEndpoints;

        // Table array now...
        const newTable = new Table();
        newTable.name = el.name;
        newTable.fields = [];
        el.fields.forEach(field => {

          const newField = new Field();
          if (field.selected) {
            newField.name = field.name;
            newField.type = field.type;
            newTable.fields.push(newField); // Here we are loading the fields !
          }
        });
        newInput.table = newTable; // Adding the table to the input object !
        payload.input.push(newInput);
      }
    });

    this.dataSent = payload;
    this.srvStepTwo.callStepTwo(payload).subscribe(
      data => {
        this.btnDisableDataDebounce = true;
        this.btnStepComplete = true;
        this.stepComplete.emit(true);
        this.dataFromStepTwo.emit(data);
      },
      err => {
        console.error(err);
        this.btnDisableDataDebounce = false;
      },
      () => ''
    );
  }

  onFieldsSelectAll(idx: number) {
    const els: EntitiesDetails = this.stepOnePayload[idx];
    this.showSelection = els;
    els.fields.forEach(itm => {
      itm.selected = !itm.selected;
    });
  }

  onUpsertChange(idx: number) {
    // const els: EntitiesDetails = this.stepOnePayload[idx];
    // els.crudEndpoints.Create = els.crudEndpoints.Upsert;
    // els.crudEndpoints.Update = els.crudEndpoints.Upsert;
  }
}
