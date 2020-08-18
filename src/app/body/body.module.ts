import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WizardConnectionComponent} from './components/wizzard-connection/wizard-connection.component';
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

@NgModule({
  declarations: [
    WizardConnectionComponent,
    AppAssistedStepsComponent
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
  ],
  exports: [
    BodyRoutingModule,
    AppAssistedStepsComponent
  ],
})
export class BodyModule {
}
