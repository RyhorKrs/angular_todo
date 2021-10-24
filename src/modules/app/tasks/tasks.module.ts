import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TasksComponent } from './tasks.component';
import { AddTaskFormComponent } from './add-task-form/add-task-form.component';
import { TaskItemComponent } from './task-item/task-item.component';

import { HeaderModule } from './../header/header.module';

@NgModule({
  declarations: [
    TasksComponent, 
    AddTaskFormComponent, 
    TaskItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    BrowserAnimationsModule,
    HeaderModule,
  ],
  providers: [],
  bootstrap: [TasksComponent],
})
export class TasksModule {}
