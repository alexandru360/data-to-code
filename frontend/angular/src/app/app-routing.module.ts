import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SecurityLoginComponent} from './security-login/security-login.component';
import {AuthGuard} from './security/auth.guard';
import {DemoGridComponent} from './demo-grid/demo-grid.component';
import {NomCaenComponent} from './nomenclator/nom-caen/nom-caen.component';

const routes: Routes = [
  {path: '', component: SecurityLoginComponent, pathMatch: 'full'},
  {path: 'login', component: SecurityLoginComponent},
  {path: 'demo', component: DemoGridComponent}, // canActivate: [AuthGuard]
  {path: 'nom-caen', component: NomCaenComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
