import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Task } from './../../../../shared/interfaces/TASK';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent {
  @Input() task: Task | any;
  @Output() onDel: EventEmitter<Task> = new EventEmitter<Task>();
  @Output() onEdit: EventEmitter<Task> = new EventEmitter<Task>();

  public delTask(): void {
    this.onDel.emit(this.task);
  }

  public editTask(): void {
    this.onEdit.emit(this.task);
  }
}
