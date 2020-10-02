import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppAssistedStepsComponent} from './product/connection-wizard-steps/app-assisted-steps.component';
import {LandingPageComponent} from './presentation/landing-page/landing-page.component';
import {ContactComponent} from './contact/contact.component';
import {AboutComponent} from './about/about.component';
import {AuthGuard} from './security/guards/auth.guard';
import {PasswordComponent} from './security/password/password.component';
import {RegistrationComponent} from './security/registration/registration.component';
import {PasswordRecoveryComponent} from './security/password-recovery/password-recovery.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/home'},
  {path: 'home', component: LandingPageComponent},
  {path: 'about', component: AboutComponent},
  {path: 'contact', component: ContactComponent},
  {
    path: 'demo', component: AppAssistedStepsComponent,
    canActivate: [AuthGuard]
  },
  {path: 'login', component: PasswordComponent},
  {path: '', component: RegistrationComponent},
  {path: 'login', component: PasswordRecoveryComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
