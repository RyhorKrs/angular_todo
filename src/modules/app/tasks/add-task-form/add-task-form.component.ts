import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Task } from './../../../../shared/interfaces/TASK';

@Component({
  selector: 'app-add-task-form',
  templateUrl: './add-task-form.component.html',
  styleUrls: ['./add-task-form.component.scss']
})
export class AddTaskFormComponent implements OnInit{
  @Output() onAdd: EventEmitter<Task> = new EventEmitter<Task>();

  public addTaskForm: FormGroup | any;
  public title: string = '';
  public description: string = '';

  public ngOnInit(): void {
    this.addTaskForm = new FormGroup({
      taskTitle: new FormControl('', [Validators.required]),
      taskDescription: new FormControl('', [Validators.required]),
    });
  }

  public addTask() {
    const task: Task = {
      taskTitle: this.title,
      taskDescription: this.description
    }

    this.onAdd.emit(task);

    this.addTaskForm.reset();
  }
}
