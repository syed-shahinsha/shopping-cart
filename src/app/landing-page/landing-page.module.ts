import { CommonModule} from '@angular/common';
import { NgModule } from '@angular/core';
import { LandingPageComponent } from './landing-page.component';
import { LandingPageRoutingModule } from './landing-page-routing.module';
import { HeaderComponent } from '../header/header.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import { PipeModule } from '../pipe/pipe.module';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
    declarations:[LandingPageComponent, HeaderComponent],
    imports:[CommonModule,LandingPageRoutingModule, MatCardModule,MatButtonModule, MatFormFieldModule,MatSelectModule,MatIconModule, PipeModule ]
})
export class LandingPageModule{

}