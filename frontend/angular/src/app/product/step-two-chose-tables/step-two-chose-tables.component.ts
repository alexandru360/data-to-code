import {Component, EventEmitter, Input, isDevMode, Output} from '@angular/core';
import EntitiesDetails from '../class-and-types-and-tools/entities-details';
import {AppAssistedStepsService} from '../connection-wizard-steps/app-assisted-steps.service';
import CrudEndpoints from '../class-and-types-and-tools/crud-endpoints';
import {StepTwoConnWizService} from './step-two-conn-wiz.service';
import {KeyValueCfg, PayloadConn} from '../../app.config.model';
import StepTwoSendPayload, {Field, Table} from '../class-and-types-and-tools/step-two-send-payload';
import {OutputToGenerateItem} from '../../common/classes/outputToGenerate';
import {MatStepper} from '@angular/material/stepper';
import { OutputTypes } from '../class-and-types-and-tools/OutputTypes';

@Component({
  selector: 'app-chose-tables-step-two',
  templateUrl: './step-two-chose-tables.component.html',
  styleUrls: ['./step-two-chose-tables.component.css'],
  providers: [StepTwoConnWizService]
})
export class StepTwoChoseTablesComponent {
  @Input() wizStepper: MatStepper;

  @Output() stepComplete = new EventEmitter<boolean>();
  @Output() dataFromStepTwo = new EventEmitter<any>();

  displayedColumns: string[] = ['name', 'type', 'selected'];
  stepOnePayload: Array<EntitiesDetails>;
  showSelection: any;
  payloadConn: PayloadConn;

  dataSent: any;
  selectAllEntities: boolean;

  selectWhatIsGeneratedApi: Array<KeyValueCfg>;
  selectWhatIsGeneratedUi: Array<KeyValueCfg>;

  btnStepComplete: boolean;
  btnDisableDataDebounce: boolean;

  showTablesList: boolean;
  showWhatIsGenerated: boolean;
  whatIsGenerated: OutputToGenerateItem;
  templates: OutputTypes[];
  public searchText(event: any) {
    const word = (event.target.value || '').trim().toLocaleLowerCase();
    this.stepOnePayload.forEach((it) => {
      it.display = it.name.toLocaleLowerCase().includes(word);
    });
  }
  worksWithUI: string;
  worksWithAPI: string;
  public changeAPI(data){
    //console.log(this.whatIsGenerated.ApiType);
    //window.alert(this.whatIsGenerated.ApiType);
    this.worksWithUI = this.templates
        .filter(it=>it.apiType == this.whatIsGenerated.ApiType)
        .reduce(
           (acc, curr) => { return { uiType: acc.uiType + curr.uiType , apiType: curr.apiType} }, {uiType:'', apiType:''}).uiType;
  
  }
  public changeUI(data){
    //console.log(this.whatIsGenerated.ApiType);
    //window.alert(this.whatIsGenerated.ApiType);
    this.worksWithAPI = this.templates
        .filter(it=>it.uiType == this.whatIsGenerated.UiType)
        .reduce(
           (acc, curr) => { return { uiType: curr.uiType , apiType: curr.apiType + acc.apiType} }, {uiType:'', apiType:''})
           .apiType;
  
  }
  constructor(private srvCommon: AppAssistedStepsService,
              private srvStepTwo: StepTwoConnWizService) {

    this.setDefaultValues();
  this.srvStepTwo.templates().subscribe(it=>{
    
        this.templates  = it;
        this.selectWhatIsGeneratedUi = it.filter(it=>it.uiType != null).map(it=>{
          var n = new KeyValueCfg();
          n.Key = it.uiType;
          n.Name = it.uiType;
          return n;
          }  );
        this.selectWhatIsGeneratedApi  = it.filter(it=>it.apiType != null).map(it=>{
          var n = new KeyValueCfg();
          n.Key = it.apiType;
          n.Name = it.apiType;
          return n;
          }  );
      })
    this.stepComplete.emit(false);
    this.srvCommon.connPayloadDetails.subscribe(item => this.payloadConn = item);
    this.srvCommon.arrEntitiesDetails.subscribe(item => {
      this.stepOnePayload = item;
      const obj = this.stepOnePayload;
      if (obj) {
        obj.map(itm => {
          itm.selected = true;
          itm.display = true;
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

  setDefaultValues() {

    this.whatIsGenerated = new OutputToGenerateItem();
    this.whatIsGenerated.Api = true;
    this.whatIsGenerated.ApiType = this.srvStepTwo.generateTypesList.Api[0].Key;
    this.whatIsGenerated.Ui = true;
    this.whatIsGenerated.UiType = this.srvStepTwo.generateTypesList.Ui[0].Key;

    this.showTablesList = true;
    this.showWhatIsGenerated = false;
    this.selectAllEntities = true;
    this.btnDisableDataDebounce = false;

    //this.selectWhatIsGeneratedUi = this.srvStepTwo.generateTypesList.Ui;
    //this.selectWhatIsGeneratedApi = this.srvStepTwo.generateTypesList.Api;
  }

  onSubmit() {
    this.btnDisableDataDebounce = true;
    const payload: StepTwoSendPayload = new StepTwoSendPayload();
    payload.payloadConn = this.payloadConn;
    payload.input = [];
    payload.output = [];

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
    payload.output.push(this.whatIsGenerated);

    this.srvStepTwo.callStepTwo(payload).subscribe(
      data => {
        this.btnDisableDataDebounce = true;
        this.btnStepComplete = true;
        this.stepComplete.emit(true);
        this.dataFromStepTwo.emit(data);

        this.goForward();
      },
      err => {
        window.alert("error:" + JSON.stringify(err));
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

  onClickCheckEntities() {
    this.stepOnePayload.forEach(itm => {
      itm.selected = !this.selectAllEntities;
    });
  }

  onNextAfterTables() {
    this.showTablesList = false;
    this.showWhatIsGenerated = true;
  }

  goForward() {
    this.wizStepper.next();
  }
}
