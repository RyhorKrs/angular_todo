import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './../app-routing.module';
import { MatButtonModule } from '@angular/material/button';

import { HomeComponent } from './home.component';
import { HeaderModule } from '../header/header.module';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    BrowserModule, 
    AppRoutingModule,
    MatButtonModule,
    HeaderModule
  ],
  providers: [],
  bootstrap: [HomeComponent]
})
export class HomeModule { }
