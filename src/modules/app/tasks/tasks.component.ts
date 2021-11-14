import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Subscription } from 'rxjs';

import { DelTaskModalComponent } from './del-task-modal/del-task-modal.component';
import { EditTaskModalComponent } from './edit-task-modal/edit-task-modal.component';
import { FbTasksService } from './../../../../src/shared/services/fbTasks.service';
import { FbCommentsService } from 'src/shared/services/fbComments.service';
import { Task } from './../../../../src/shared/interfaces/TASK';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit, OnDestroy {
  public sub: Subscription | any;
  public sub2: Subscription | any;
  public error: string = '';
  public tasks: Task[] = [];
  public newTasks: Task[] = [];
  public inProcessTasks: Task[] = [];
  public doneTasks: Task[] = [];
  public currentDelTask: any = {};
  public currentEditTask: any = {};

  constructor (
    private fbTasksService: FbTasksService,
    private fbCommentsService: FbCommentsService,
    public dialog: MatDialog
  ) {}

  public ngOnInit(): void {
    this.sub = this.fbTasksService.error$.subscribe((value: string) => {
      this.error = value;
    })

    this.sub2 = this.fbCommentsService.error$.subscribe((value: string) => {
      this.error = value;
    })

    this.getTasksContent();
  }

  public ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.sub2.unsubscribe();
  }

  public getTasksContent(): void {
    this.fbTasksService.getTasksFromDb(JSON.parse(localStorage.uid)).subscribe(tasks => {
      this.tasks = [];
      this.newTasks = [];
      this.inProcessTasks = [];
      this.doneTasks = [];

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

      this.fbTasksService.changeErrorMessage('');
    })
  }

  public addTask(task: Task): void {
    this.fbTasksService.createTaskInDb(task, JSON.parse(localStorage.uid)).subscribe(() => { 
      this.getTasksContent();
      this.fbTasksService.changeErrorMessage('');
    })
  }

  public openDelDialog(task: Task): void {
    const delDialogRef = this.dialog.open(DelTaskModalComponent, {data: task});
    this.currentDelTask = task;

    delDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fbTasksService.deleteTaskInDb(this.currentDelTask, JSON.parse(localStorage.uid)).subscribe(() => {
          this.fbCommentsService.deleteCommentInDb('', JSON.parse(localStorage.uid), this.currentDelTask.id).subscribe(() => {
          this.getTasksContent();
          this.fbTasksService.changeErrorMessage('');
          })
          this.fbTasksService.changeErrorMessage('');
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
          this.getTasksContent();
          this.fbTasksService.changeErrorMessage('');
        })
      } 
    });
  } 
}
