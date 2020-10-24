import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LoggedInAuthGuard } from './guard/logged-in.guard';
import { SignupComponent } from './signup/signup.component';
import { VerificationMailComponent } from './verification-mail/verification-mail.component';

const routes: Routes = [
  {
    path:'landingpage',
    loadChildren: () => import('./landing-page/landing-page.module').then(x => x.LandingPageModule),
    canLoad:[LoggedInAuthGuard],
    canActivate:[LoggedInAuthGuard]
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'signUp',
    component:SignupComponent
  },
  {
    path:'verifymail',
    component:VerificationMailComponent
  },
  {
    path:'',
    redirectTo:'landingpage',
    pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
