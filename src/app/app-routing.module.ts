import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WizzardConnectionComponent} from './wizzard-connection/wizzard-connection.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'home', component: WizzardConnectionComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
