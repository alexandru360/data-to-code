import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FullBodyComponent} from './_old/full-body/full-body.component';
import {EmptyRouteComponent} from './components/empty-route/empty-route.component';
import {AppAssistedStepsComponent} from './components/connection-wizard-steps/app-assisted-steps.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/home'},
  {path: 'home', component: FullBodyComponent},
  {path: 'product', component: AppAssistedStepsComponent},
  {path: 'empty', component: EmptyRouteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class BodyRoutingModule {
}
