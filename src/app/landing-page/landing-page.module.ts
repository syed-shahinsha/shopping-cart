import { CommonModule} from '@angular/common';
import { NgModule } from '@angular/core';
import { LandingPageComponent } from './landing-page.component';
import { LandingPageRoutingModule } from './landing-page-routing.module';
import { HeaderComponent } from '../header/header.component';
import { MatCardModule } from '@angular/material/card';
import { PipeModule } from '../pipe/pipe.module';

@NgModule({
    declarations:[LandingPageComponent, HeaderComponent,],
    imports:[CommonModule,LandingPageRoutingModule, MatCardModule,PipeModule ]
})
export class LandingPageModule{
}