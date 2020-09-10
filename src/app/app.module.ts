import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppConfigService} from './app.config.service';
import {environment} from '../environments/environment';
import {HttpClientModule} from '@angular/common/http';
import {BodyModule} from './body/body.module';
import {HeaderModule} from './header/header.module';

// tslint:disable-next-line:typedef
export function ConfigLoader(configService: AppConfigService) {
  return () => configService.load(environment.configFile);
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HeaderModule,
    BodyModule,
  ],
  providers: [AppConfigService,
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
