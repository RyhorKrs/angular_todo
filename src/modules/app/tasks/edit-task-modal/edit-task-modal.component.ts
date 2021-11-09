import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Task } from 'src/shared/interfaces/TASK';

@Component({
  selector: 'app-edit-task-modal',
  templateUrl: './edit-task-modal.component.html',
  styleUrls: ['./edit-task-modal.component.scss']
})
export class EditTaskModalComponent implements OnInit {
  public editTaskForm: FormGroup | any;

  constructor(
    public editDialogRef: MatDialogRef<EditTaskModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task
  ) {}

  public ngOnInit() {
    this.editTaskForm = new FormGroup({
      taskTitle: new FormControl(this.data.taskTitle, [Validators.required]),
      taskDescription: new FormControl(this.data.taskDescription, [Validators.required]),
      taskImportant: new FormControl(this.data.taskImportant),
      taskDate: new FormControl(new Date(`${this.data.taskDate.substr(3,2)}.${this.data.taskDate.substr(0,2)}.${this.data.taskDate.substr(6,4)}`), [Validators.required]),
      taskCategory: new FormControl(this.data.taskCategory, [Validators.required])
    });
  }

  public editTask(): void {
    const editedTask: Task = {
      taskTitle: this.editTaskForm.value.taskTitle,
      taskDescription: this.editTaskForm.value.taskDescription,
      taskImportant: this.editTaskForm.value.taskImportant,
      taskDate: this.editTaskForm.value.taskDate.toLocaleDateString(),
      taskCategory: this.editTaskForm.value.taskCategory
    };

    this.editDialogRef.close(editedTask);
  }
  
  public hideEditModal(): void {
    this.editDialogRef.close();
  }
}
