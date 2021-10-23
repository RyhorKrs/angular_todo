import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { AppRoutingModule } from './../modules/app/app-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from 'src/modules/app/header/header.component';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    MatButtonModule
  ],
  declarations: [
    HeaderComponent
  ],
  exports: [
    HeaderComponent
  ]
})
export class SharedModule {}
