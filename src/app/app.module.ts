import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire'
import { FormsModule,ReactiveFormsModule} from '@angular/forms'
import { AngularFireAuthModule } from '@angular/fire/auth';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card'

import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { LoggedInAuthGuard } from './guard/logged-in.guard';
import { VerificationMailComponent } from './verification-mail/verification-mail.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    VerificationMailComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireStorageModule,
    BrowserAnimationsModule
  ],
  providers: [
    LoggedInAuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
