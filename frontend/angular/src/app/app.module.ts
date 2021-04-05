import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CalendarModule} from 'primeng/calendar';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {TreeTableModule} from 'primeng/treetable';
import {DemoGridComponent} from './demo-grid/demo-grid.component';
import {HttpClientModule} from '@angular/common/http';
import {TableModule} from 'primeng/table';
import {SecurityModule} from './security/security.module';
import {SecurityLoginComponent} from './security-login/security-login.component';
import {MenuApplicationComponent} from './menu-application/menu-application.component';
import {MegaMenuModule} from 'primeng/megamenu';
import {ThemeService} from './chose-theme.module/service/theme-service.service';
import {CardModule} from 'primeng/card';
import {AuthGuard} from './security/auth.guard';
import {HelperService} from './common/helper/helper';
import {environment} from '../environments/environment';
import {ConfigService} from './common/services/config.service';
import { NomCaenComponent } from './nomenclator/nom-caen/nom-caen.component';

export function ConfigLoader(configService: ConfigService): any {
  return () => configService.load(environment.configFile);
}

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CardModule,
    ButtonModule,
    AppRoutingModule,
    CalendarModule,
    FormsModule,
    InputTextModule,
    DropdownModule,
    TreeTableModule,
    TableModule,
    HttpClientModule,
    SecurityModule,
    MegaMenuModule,
  ],
  providers: [
    // ConfigService,
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: ConfigLoader,
    //   deps: [ConfigService],
    //   multi: true
    // },
    HelperService,
    AuthGuard,
    ThemeService
  ],
  declarations: [
    AppComponent,
    DemoGridComponent,
    SecurityLoginComponent,
    MenuApplicationComponent,
    NomCaenComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
