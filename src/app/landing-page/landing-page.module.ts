import { CommonModule} from '@angular/common';
import { NgModule } from '@angular/core';
import { LandingPageComponent } from './landing-page.component';
import { LandingPageRoutingModule } from './landing-page-routing.module';
import { HeaderComponent } from '../header/header.component';



@NgModule({
    declarations:[LandingPageComponent, HeaderComponent,],
    imports:[CommonModule,LandingPageRoutingModule]
})
export class LandingPageModule{}