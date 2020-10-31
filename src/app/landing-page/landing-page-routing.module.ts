import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { LandingPageComponent } from './landing-page.component';

const routes:Routes = [
    {
        path:'',
        component:HeaderComponent, children:[
            {
                path: 'home',
                component: LandingPageComponent
            },
            {
                path:'',
                redirectTo: 'home',
                pathMatch: 'full'    
            }
        ]
    }
]


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class LandingPageRoutingModule { }