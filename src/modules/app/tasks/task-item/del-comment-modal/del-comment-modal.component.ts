import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Comment } from './../../../../../../src/shared/interfaces/COMMENT';

@Component({
  selector: 'app-del-comment-modal',
  templateUrl: './del-comment-modal.component.html',
  styleUrls: ['./del-comment-modal.component.scss']
})
export class DelCommentModalComponent {
  constructor(
    public delDialogRef: MatDialogRef<DelCommentModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Comment
  ) {}

  public deleteComment(): void {
    this.delDialogRef.close(true);
  }

  public hideDelModal(): void {
    this.delDialogRef.close();
  }
}
