import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './../app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { SignUpComponent } from './sign-up.component';
import { PasswordStrengthComponent } from './password-strength/password-strength.component';
import { HeaderModule } from './../header/header.module';


@NgModule({
  declarations: [
    [SignUpComponent, PasswordStrengthComponent]
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    FormsModule, 
    ReactiveFormsModule, 
    MatCardModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule, 
    BrowserAnimationsModule,
    HeaderModule
  ],
  providers: [],
  bootstrap: [SignUpComponent]
})
export class SignUpModule { }
