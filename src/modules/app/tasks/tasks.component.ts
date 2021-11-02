import { Component, OnInit } from '@angular/core';
import { FbAuthService } from 'src/shared/services/fbAuth.service';
import { FbTasksService } from 'src/shared/services/fbTasks.service';
import { Task } from './../../../shared/interfaces/TASK';
import { User } from 'src/shared/interfaces/USER';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  public error: string = '';
  public user: any = {};
  public tasks: Task[] = [];

  constructor (
    private fbService: FbAuthService, 
    private fbTasksService: FbTasksService
  ) {}

  public ngOnInit(): void {
    this.getUserContent();
  }

  public getUserContent(): void {
    this.fbService.getDataFromDb(JSON.parse(localStorage.uid)).subscribe(user => {
      this.user = user[Object.keys(user)[0]];
    }, err => {
      this.error = err.message;
    })

    this.fbTasksService.getTasksFromDb(JSON.parse(localStorage.uid)).subscribe(tasks => {
      for (let key in tasks) {
        let task = tasks[key];
        task.id = key;
        this.tasks.push(task);
      }
    }, err => {
      this.error = err.message;
    })
  }

  public addTask(task: Task): void {
    this.fbTasksService.createTaskInDb(task, JSON.parse(localStorage.uid)).subscribe(task => {
      this.tasks.push(task);
    }, err => {
      this.error = err.message;
    })
  }

  public deleteTask(task: Task): void {
    this.fbTasksService.deleteTaskInDb(task, JSON.parse(localStorage.uid)).subscribe(() => {
      this.tasks = this.tasks.filter(t => t.id !== task.id);
    }, err => {
      this.error = err.message;
    })
  }
}
