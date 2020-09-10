import {APP_INITIALIZER, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BodyRoutingModule} from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ProductInformationComponent} from './_old/product-information/product-information.component';
import {FullBodyComponent} from './_old/full-body/full-body.component';
import {ProductCardsComponent} from './_old/product-cards/product-cards.component';
import {ProductComparisonComponent} from './_old/product-comparison/product-comparison.component';
import {ProductCardItemComponent} from './_old/product-cards/product-card-item/product-card-item.component';
import {EmptyRouteComponent} from './components/empty-route/empty-route.component';
import {AppConfigService} from '../app.config.service';
import {environment} from '../../environments/environment';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatCarouselModule} from '@ngmodule/material-carousel';
import {MatStepperModule} from '@angular/material/stepper';
import {MatTableModule} from '@angular/material/table';

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
    FormsModule,
    ReactiveFormsModule,
    BodyRoutingModule,
    MatGridListModule,
    MatCardModule,
    MatCarouselModule,
    MatStepperModule,
    MatTableModule
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
