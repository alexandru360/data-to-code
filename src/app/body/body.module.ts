import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StepOneConnWizComponent} from './components/conn-wiz-step-one/step-one-conn-wiz.component';
import {AppAssistedStepsComponent} from './connection-wizard-steps/app-assisted-steps.component';
import {BodyRoutingModule} from './app-routing.module';
import {MatCardModule} from '@angular/material/card';
import {HeaderComponent} from '../header/header.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatFileUploadModule} from 'mat-file-upload';
import {MatButtonModule} from '@angular/material/button';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatStepperModule} from '@angular/material/stepper';
import {StepTwoChoseTablesComponent} from './components/chose-tables-step-two/step-two-chose-tables.component';
import {MatRadioModule} from '@angular/material/radio';
import {AppAssistedStepsService} from './connection-wizard-steps/app-assisted-steps.service';

@NgModule({
  declarations: [
    StepOneConnWizComponent,
    AppAssistedStepsComponent,
    StepTwoChoseTablesComponent
  ],
  imports: [
    CommonModule,
    BodyRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatFileUploadModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatStepperModule,
    MatRadioModule,
  ],
  providers: [
    AppAssistedStepsService
  ],
  exports: [
    BodyRoutingModule,
    AppAssistedStepsComponent
  ],
})
export class BodyModule {
}
