import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FbTasksService } from 'src/shared/services/fbTasks.service';
import { Task } from './../../../shared/interfaces/TASK';
import { DelTaskModalComponent } from './del-task-modal/del-task-modal.component';
import { EditTaskModalComponent } from './edit-task-modal/edit-task-modal.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  public error: string = '';
  public tasks: Task[] = [];
  public newTasks: Task[] = [];
  public inProcessTasks: Task[] = [];
  public doneTasks: Task[] = [];
  public currentDelTask: any = {};
  public currentEditTask: any = {};

  constructor (
    private fbTasksService: FbTasksService,
    public dialog: MatDialog
  ) {}

  public ngOnInit(): void {
    this.getTasksContent();
  }

  public getTasksContent(): void {
    this.fbTasksService.getTasksFromDb(JSON.parse(localStorage.uid)).subscribe(tasks => {
      for (let key in tasks) {
        let task = tasks[key];
        task.id = key;
        this.tasks.push(task);

        switch (task.taskCategory) {
          case 'new':
            this.newTasks.push(task);
            break;
          case 'in-process':
            this.inProcessTasks.push(task);
            break;
          case 'done':
            this.doneTasks.push(task);
            break;
        }
      }
    }, err => {
      this.error = err.message;
    })
  }

  public addTask(task: Task): void {
    this.fbTasksService.createTaskInDb(task, JSON.parse(localStorage.uid)).subscribe(task => {
      this.tasks.push(task);
      this.newTasks.push(task);
    }, err => {
      this.error = err.message;
    })
  }

  public openDelDialog(task: Task): void {
    const delDialogRef = this.dialog.open(DelTaskModalComponent, {data: task});
    this.currentDelTask = task;

    delDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fbTasksService.deleteTaskInDb(this.currentDelTask, JSON.parse(localStorage.uid)).subscribe(() => {
          this.tasks = this.tasks.filter(t => t.id !== this.currentDelTask.id);
          this.newTasks = this.newTasks.filter(t => t.id !== this.currentDelTask.id);
          this.inProcessTasks = this.inProcessTasks.filter(t => t.id !== this.currentDelTask.id);
          this.doneTasks = this.doneTasks.filter(t => t.id !== this.currentDelTask.id);
        }, err => {
          this.error = err.message;
        })
      }
    });
  }

  public openEditDialog(task: Task): void {
    const editDialogRef = this.dialog.open(EditTaskModalComponent, {data: task});
    this.currentEditTask = task;

    editDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fbTasksService.editTaskInDb(result, JSON.parse(localStorage.uid), this.currentEditTask.id).subscribe(() => {
          this.tasks = [];
          this.newTasks = [];
          this.inProcessTasks = [];
          this.doneTasks = [];
          this.getTasksContent();
        }, err => {
          this.error = err.message;
        })
      } 
    });
  } 
}
