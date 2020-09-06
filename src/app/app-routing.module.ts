import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path:'landingpage',
    loadChildren: () => import('./landing-page/landing-page.module').then(x => x.LandingPageModule)
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
