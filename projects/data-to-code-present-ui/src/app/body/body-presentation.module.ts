import {APP_INITIALIZER, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BodyRoutingModule} from './app-routing.module';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatFileUploadModule} from 'mat-file-upload';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatStepperModule} from '@angular/material/stepper';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTableModule} from '@angular/material/table';
import {MatDividerModule} from '@angular/material/divider';
import {ProductInformationComponent} from './components/product-information/product-information.component';
import {MatCarouselModule} from '@ngmodule/material-carousel';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {FullBodyComponent} from './components/full-body/full-body.component';
import {ProductCardsComponent} from './components/product-cards/product-cards.component';
import {ProductComparisonComponent} from './components/product-comparison/product-comparison.component';
import {ProductCardItemComponent} from './components/product-cards/product-card-item/product-card-item.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {EmptyRouteComponent} from './components/empty-route/empty-route.component';
import {AppConfigService} from '../z-main/services/app-config.service';
import {environment} from '../../environments/environment';

// tslint:disable-next-line:typedef
export function ConfigLoader(configService: AppConfigService) {
  return () => configService.load(environment.configFile);
}

@NgModule({
  declarations: [
    ProductInformationComponent,
    ProductCardsComponent,
    ProductComparisonComponent,
    FullBodyComponent,
    ProductCardsComponent,
    ProductComparisonComponent,
    ProductCardItemComponent,
    EmptyRouteComponent
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
    MatCheckboxModule,
    FormsModule,
    MatExpansionModule,
    MatTableModule,
    MatDividerModule,
    MatSnackBarModule,
    MatCarouselModule,
    MatGridListModule
  ],
  providers: [
    AppConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: ConfigLoader,
      deps: [AppConfigService],
      multi: true
    }],
  exports: [
    BodyRoutingModule
  ],
})
export class BodyPresentationModule {
}
