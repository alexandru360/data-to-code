import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppAssistedStepsComponent} from './connection-wizard-steps/app-assisted-steps.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'home', component: AppAssistedStepsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class BodyRoutingModule { }
