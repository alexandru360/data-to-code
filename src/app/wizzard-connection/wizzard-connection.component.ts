import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ConfigService} from '../services/config.service';
import {ConfigConnTypes, PayloadConn} from '../services/configuration';
import {WizzardConnectionService} from './wizzard-connection.service';

@Component({
  selector: 'app-wizzard-connection',
  templateUrl: './wizzard-connection.component.html',
  styleUrls: ['./wizzard-connection.component.css'],
  providers: [WizzardConnectionService]
})
export class WizzardConnectionComponent {

  title = 'Connection Information';

  oForm: FormGroup;
  mustUploadFile = false;
  connTypes: Array<ConfigConnTypes>;
  payloadConn: PayloadConn;

  response: any;

  constructor(private fb: FormBuilder,
              private cfg: ConfigService,
              private srvWiz: WizzardConnectionService) {
    this.connTypes = this.cfg.getConfiguration().connTypes;
    this.payloadConn = new PayloadConn();

    this.oForm = this.fb.group({
      connType: [null, Validators.required],
      connFile: [null, Validators.required],
      connHost: [null, Validators.required],
      connPort: [null, Validators.required],
      connUser: [null, Validators.required],
      connPassword: [null, Validators.required],
      connDatabase: [null, Validators.compose([
        Validators.required, Validators.minLength(3),
        Validators.maxLength(20)])
      ],
    });
  }

  onConnTypeChange() {
    const mustUpload = this.oForm.controls.connType.value === 'XLS';
    this.mustUploadFile = mustUpload;
    if (mustUpload) {
      this.oForm.get('connFile').setValidators(Validators.required);
      // Other controls have no validation
      this.oForm.get('connHost').clearValidators();
      this.oForm.get('connHost').setErrors(null);

      this.oForm.get('connUser').clearValidators();
      this.oForm.get('connUser').setErrors(null);

      this.oForm.get('connPassword').clearValidators();
      this.oForm.get('connPassword').setErrors(null);

      this.oForm.get('connDatabase').clearValidators();
      this.oForm.get('connDatabase').setErrors(null);
    } else {
      this.oForm.get('connFile').clearValidators();
      this.oForm.get('connFile').setErrors(null);

      // Other controls have validation
      this.oForm.get('connHost').setValidators(Validators.required);
      this.oForm.get('connUser').setValidators(Validators.required);
      this.oForm.get('connPassword').setValidators(Validators.required);
      this.oForm.get('connDatabase').setValidators(Validators.required);
    }
    // console.log('this.oForm', this.oForm);
    if (this.oForm.controls.connType.value === 'MARIADB') {
      this.setValuesMariaDB();
    }
  }

  onSubmit() {
    this.payloadConn.connType = this.oForm.controls.connType.value;
    this.payloadConn.connHost = this.oForm.controls.connHost.value;
    this.payloadConn.connPort = this.oForm.controls.connPort.value;
    this.payloadConn.connUser = this.oForm.controls.connUser.value;
    this.payloadConn.connPassword = this.oForm.controls.connPassword.value;
    this.payloadConn.connDatabase = this.oForm.controls.connDatabase.value;
    debugger;
    this.srvWiz.callEndpointMariaDb(this.payloadConn).subscribe(data => {
        this.response = data;
      },
      error => {
        console.log(error);
      });
  }

  onUploadClicked(event: FileList) {
    this.setFileUpload(event);
  }

  onSelectedFilesChanged(event: FileList) {
    this.setFileUpload(event);
  }

  private setFileUpload(event: FileList) {
    const fileList: FileList = event;
    if (fileList.length > 0) {
      this.oForm.get('connHost').setValue(event);
      this.oForm.get('connFile').setErrors(null);

      const file: File = fileList[0];
      this.payloadConn.connFileName = fileList[0].name;
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        this.payloadConn.connFileContent = fileReader.result;
      };
      fileReader.readAsDataURL(file);

      // console.log('this.oForm.valid', this.oForm.valid);
      // console.log('this.oForm', this.oForm);
    }
  }

  private setValuesMariaDB() {
    this.oForm.get('connHost').setValue('alex.go.ro');
    this.oForm.get('connPort').setValue('85');
    this.oForm.get('connUser').setValue('root');
    this.oForm.get('connPassword').setValue('datatocode');
    this.oForm.get('connDatabase').setValue('test_schema');
  }
}
