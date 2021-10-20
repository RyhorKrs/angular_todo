import { Component } from '@angular/core';
import { Task } from './../../../shared/interfaces/TASK';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent {
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
  ]

  public updateTasks(task: Task) {
    this.tasks.push(task);
  }

  public removeTask(title: string) {
    this.tasks = this.tasks.filter(task => task.taskTitle !== title)
  }
}
