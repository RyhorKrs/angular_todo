import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Task } from './../tasks.component';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent {
  @Input() task: Task | any;
  @Output() onDel: EventEmitter<string> = new EventEmitter<string>();


  public delTask() {
    this.onDel.emit(this.task.taskTitle)
  }
}
