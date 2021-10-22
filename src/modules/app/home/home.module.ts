import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './../app-routing.module';
import { MatButtonModule } from '@angular/material/button';

import { HomeComponent } from './home.component';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    BrowserModule, 
    AppRoutingModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [HomeComponent]
})
export class HomeModule { }
