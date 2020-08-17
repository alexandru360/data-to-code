import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './z-main/app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSliderModule} from '@angular/material/slider';
import {WizzardConnectionComponent} from './wizzard-connection/wizzard-connection.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {HeaderComponent} from './header/header.component';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatCardModule} from '@angular/material/card';
import {MatFileUploadModule} from 'mat-file-upload';
import {ConfigService} from './services/config.service';
import {environment} from '../environments/environment';
import {HttpClientModule} from '@angular/common/http';
import { TestFormComponent } from './test-form/test-form.component';

// tslint:disable-next-line:typedef
export function ConfigLoader(configService: ConfigService) {
  return () => configService.load(environment.configFile);
}

@NgModule({
  declarations: [
    AppComponent,
    WizzardConnectionComponent,
    HeaderComponent,
    TestFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatInputModule,
    MatRadioModule,
    MatCardModule,
    MatFileUploadModule,
    HttpClientModule
  ],
  providers: [ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: ConfigLoader,
      deps: [ConfigService],
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
