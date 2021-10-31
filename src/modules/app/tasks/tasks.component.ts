import { Component, OnInit } from '@angular/core';
import { FbAuthService } from 'src/shared/services/fbAuth.service';
import { Task } from './../../../shared/interfaces/TASK';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
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
    this.getUserContent();
  }

  public user: any = {}

  public getUserContent(): void {
    this.fbService.getDataFromDb(JSON.parse(localStorage.uid)).subscribe(user => {
      this.user = user[Object.keys(user)[0]];
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
