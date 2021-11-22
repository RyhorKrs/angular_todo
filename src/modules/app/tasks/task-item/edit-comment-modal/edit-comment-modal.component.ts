import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Comment } from './../../../../../../src/shared/interfaces/COMMENT';

@Component({
  selector: 'app-edit-comment-modal',
  templateUrl: './edit-comment-modal.component.html',
  styleUrls: ['./edit-comment-modal.component.scss']
})
export class EditCommentModalComponent implements OnInit {
  public editCommentForm: FormGroup | any;

  constructor(
    public editDialogRefCom: MatDialogRef<EditCommentModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Comment
  ) {}

  public ngOnInit() {
    this.editCommentForm = new FormGroup({
      commentText: new FormControl(this.data.commentText, [Validators.required])
    });
  }

  public editComment(): void {
    const editedComment: Comment = {
      commentText: this.editCommentForm.value.commentText,
      commentDate: this.data.commentDate,
      commentIsEdited: true
    };

    this.editDialogRefCom.close(editedComment);
  }
  
  public hideEditModal(): void {
    this.editDialogRefCom.close();
  }
}
