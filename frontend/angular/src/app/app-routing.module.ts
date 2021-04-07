import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SecurityLoginComponent} from './security-login/security-login.component';
import {AuthGuard} from './security/auth.guard';
import {DemoGridComponent} from './demo-grid/demo-grid.component';
import {NomCaenComponent} from './nomenclator/nom-caen/nom-caen.component';
import {NewAppTempleateSelectionComponent} from './new-app-templeate-selection/new-app-templeate-selection.component';
import {NewAppTemplatePopulationComponent} from './new-app-template-population/new-app-template-population.component';

const routes: Routes = [
  {path: '', component: SecurityLoginComponent, pathMatch: 'full'},
  {path: 'login', component: SecurityLoginComponent},
  {path: 'demo', component: DemoGridComponent}, // canActivate: [AuthGuard]
  {path: 'new-app-template-selection', component: NewAppTempleateSelectionComponent},
  {path: 'new-app-template-population', component: NewAppTemplatePopulationComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
