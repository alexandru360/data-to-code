import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppConfigService} from './app.config.service';
import {environment} from '../environments/environment';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {HeaderComponent} from './header/header.component';
import {HeaderMenuComponent} from './header/header-menu/header-menu.component';
import {MatButtonModule} from '@angular/material/button';
import {ContactComponent} from './contact/contact.component';
import {FooterComponent} from './footer/footer.component';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {StepOneConnWizComponent} from './product/step-one-conn-wiz/step-one-conn-wiz.component';
import {AppAssistedStepsComponent} from './product/connection-wizard-steps/app-assisted-steps.component';
import {StepTwoChoseTablesComponent} from './product/step-two-chose-tables/step-two-chose-tables.component';
import {LandingPageComponent} from './presentation/landing-page/landing-page.component';
import {MatFileUploadModule} from 'mat-file-upload';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatStepperModule} from '@angular/material/stepper';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTableModule} from '@angular/material/table';
import {AppAssistedStepsService} from './product/connection-wizard-steps/app-assisted-steps.service';
import {StepThreeCardComponent} from './product/step-three-card/step-three-card.component';
import {AboutComponent} from './about/about.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';

// tslint:disable-next-line:typedef
export function ConfigLoader(configService: AppConfigService) {
  return () => configService.load(environment.configFile);
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HeaderMenuComponent,
    ContactComponent,
    FooterComponent,
    StepOneConnWizComponent,
    AppAssistedStepsComponent,
    StepTwoChoseTablesComponent,
    LandingPageComponent,
    StepThreeCardComponent,
    AboutComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatDividerModule,
    MatListModule,
    MatFileUploadModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatStepperModule,
    MatRadioModule,
    MatCheckboxModule,
    FormsModule,
    MatExpansionModule,
    MatTableModule,
    MatDividerModule,
    MatListModule,
    MatGridListModule,
    MatIconModule,
  ],
  providers: [
    AppAssistedStepsService,
    AppConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: ConfigLoader,
      deps: [AppConfigService],
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
