import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';

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
  public sort: string = '1';

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
      }

      this.sortBy(this.sort);

      for (let task of this.tasks) {
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

  public selectedValue(event: any): void {
    this.sort = event.value;
    this.getTasksContent();
  }

  public sortBy(option: string): void {
    switch (option) {
      case '1':
        this.tasks.sort((task1: Task, task2: Task) => {
          let date1 = new Date(`${+task1.taskCreate.substr(3,2)}.${+task1.taskCreate.substr(0,2)}.${task1.taskCreate.substr(6,4)}`);
          let date2 = new Date(`${+task2.taskCreate.substr(3,2)}.${+task2.taskCreate.substr(0,2)}.${task2.taskCreate.substr(6,4)}`);
          
          return +date1*-1 - +date2*-1;
        });
        break;
      case '2':
        this.tasks.sort((task1: Task, task2: Task) => {
          let date1 = new Date(`${+task1.taskCreate.substr(3,2)}.${+task1.taskCreate.substr(0,2)}.${task1.taskCreate.substr(6,4)}`);
          let date2 = new Date(`${+task2.taskCreate.substr(3,2)}.${+task2.taskCreate.substr(0,2)}.${task2.taskCreate.substr(6,4)}`);
          
          return +date2*-1 - +date1*-1;
        });
        break;
      case '3':
        this.tasks.sort((task1: Task, task2: Task) => {
          if (task1.taskTitle < task2.taskTitle) return -1;
          if (task1.taskTitle > task2.taskTitle) return 1;
          return 0;
        });
        break;
      case '4':
        this.tasks.sort((task1: Task, task2: Task) => {
          if (task1.taskTitle > task2.taskTitle) return -1;
          if (task1.taskTitle < task2.taskTitle) return 1;
          return 0;
        });
        break;
    }
  }
}
