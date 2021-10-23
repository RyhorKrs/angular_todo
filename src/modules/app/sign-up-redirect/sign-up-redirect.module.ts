import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SignUpRedirectComponent } from './sign-up-redirect.component';
import { SharedModule } from 'src/shared/shared.module';



@NgModule({
  declarations: [
    SignUpRedirectComponent
  ],
  imports: [
    BrowserModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [SignUpRedirectComponent]
})
export class SignUpRedirectModule { }
