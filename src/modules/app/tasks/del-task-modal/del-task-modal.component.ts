import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from 'src/shared/interfaces/TASK';

@Component({
  selector: 'app-del-task-modal',
  templateUrl: './del-task-modal.component.html',
  styleUrls: ['./del-task-modal.component.scss']
})
export class DelTaskModalComponent {
  constructor(
    public delDialogRef: MatDialogRef<DelTaskModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task
  ) {}

  public deleteTask(): void {
    this.delDialogRef.close(true);
  }

  public hideDelModal(): void {
    this.delDialogRef.close();
  }
}
