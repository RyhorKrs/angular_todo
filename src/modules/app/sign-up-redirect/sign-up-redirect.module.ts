import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SignUpRedirectComponent } from './sign-up-redirect.component';
import { HeaderModule } from './../header/header.module';



@NgModule({
  declarations: [
    SignUpRedirectComponent
  ],
  imports: [
    BrowserModule,
    HeaderModule
  ],
  providers: [],
  bootstrap: [SignUpRedirectComponent]
})
export class SignUpRedirectModule { }
