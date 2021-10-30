import { Component, OnDestroy, OnInit } from '@angular/core';
import { FbAuthService } from 'src/shared/services/fbAuth.service';
import { Task } from './../../../shared/interfaces/TASK';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit, OnDestroy {
  public error: string = '';
  public tasks: Task[] = [
    {
      taskTitle: 'First task', 
      taskDescription: 'asdasasd awdasd asdas ad fsd da dad adassd asd dw da'
    },
    {
      taskTitle: 'Second task', 
      taskDescription: 'asdasasd asdasasd awdasd asdas ad fsd da dad adassd asd dw da asdasasd awdasd asdas ad fsd da dad adassd asd dw da asdasasd awdasd asdas ad fsd da dad adassd asd dw da asdasasd awdasd asdas ad fsd da dad adassd asd dw da'
    },
    {
      taskTitle: 'Third task', taskDescription: 'asdasasd asdasasd awdasd asdas ad fsd da dad adassd asd dw da'
    }
  ];

  constructor (private fbService: FbAuthService) {}

  public ngOnInit() {
    this.fbService.uid = JSON.parse(localStorage.uid);
    this.getUserContent();
  }

  public ngOnDestroy() {
    this.fbService.uid = '';
    this.fbService.id = '';
  }

  public user: any = {}

  public getUserContent(): void {
    this.fbService.getDataFromDb().subscribe(user => {
      let keys: string[] = Object.keys(user);
      this.fbService.id = keys[0];
      this.fbService.getDataFromDb().subscribe(realUser => {
        this.user = realUser;
      },
      err => {
        this.error = err.message;
      })
    }, err => {
      this.error = err.message;
    })
  }

  public updateTasks(task: Task): void {
    this.tasks.push(task);
  }

  public removeTask(title: string): void {
    this.tasks = this.tasks.filter(task => task.taskTitle !== title)
  }
}
