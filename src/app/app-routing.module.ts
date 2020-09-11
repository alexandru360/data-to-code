import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppAssistedStepsComponent} from './product/connection-wizard-steps/app-assisted-steps.component';
import {LandingPageComponent} from './presentation/landing-page/landing-page.component';
import {ContactComponent} from './contact/contact.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/home'},
  {path: 'home', component: LandingPageComponent},
  {path: 'app', component: AppAssistedStepsComponent},
  {path: 'contact', component: ContactComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
