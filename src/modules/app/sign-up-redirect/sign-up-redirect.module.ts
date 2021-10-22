import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SignUpRedirectComponent } from './sign-up-redirect.component';



@NgModule({
  declarations: [
    SignUpRedirectComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [SignUpRedirectComponent]
})
export class TasksModule { }
