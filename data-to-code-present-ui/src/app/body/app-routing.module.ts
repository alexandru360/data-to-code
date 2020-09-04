import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FullBodyComponent} from './components/full-body/full-body.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/home'},
  {path: 'home', component: FullBodyComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class BodyRoutingModule {
}
