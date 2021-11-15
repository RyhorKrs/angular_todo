import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";

import { Subscription } from "rxjs";

import { DelCommentModalComponent } from "./del-comment-modal/del-comment-modal.component";
import { EditCommentModalComponent } from "./edit-comment-modal/edit-comment-modal.component";
import { FbCommentsService } from './../../../../../src/shared/services/fbComments.service';
import { Comment } from "./../../../../../src/shared/interfaces/COMMENT";
import { Task } from './../../../../../src/shared/interfaces/TASK';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent implements OnInit, OnDestroy {
  @Input() task: Task | any;
  @Output() onDel: EventEmitter<Task> = new EventEmitter<Task>();
  @Output() onEdit: EventEmitter<Task> = new EventEmitter<Task>();

  public addCommentForm: FormGroup | any;
  public showComments: boolean = false;
  public comments: Comment[] = [];
  public currentDelComment: any = {};
  public currentEditComment: any = {};
  public sub: Subscription | any;

  constructor (
    private fbCommentsService: FbCommentsService,
    public comDialog: MatDialog
  ) {}

  public ngOnInit(): void {
    this.sub = this.fbCommentsService.stream$.subscribe(() => {
      this.getCommentsContent();
    })

    this.addCommentForm = new FormGroup({
      commentText: new FormControl('', [Validators.required])
    });

    this.getCommentsContent();
  }

  public ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  public delTask(): void {
    this.onDel.emit(this.task);
  }

  public editTask(): void {
    this.onEdit.emit(this.task);
  }

  public getCommentsContent(): void {
    this.fbCommentsService.getCommentsFromDb(JSON.parse(localStorage.uid), this.task.id).subscribe(comments => {
      this.comments = [];

      for (let key in comments) {
        let task = comments[key];
        task.id = key;
        this.comments.push(task);
      }

      this.comments.sort((comment1: Comment, comment2: Comment) => {
        let date1 = new Date(`${+comment1.commentDate.substr(3,2)}.${+comment1.commentDate.substr(0,2)}.${comment1.commentDate.substr(6,4)}`);
        let date2 = new Date(`${+comment2.commentDate.substr(3,2)}.${+comment2.commentDate.substr(0,2)}.${comment2.commentDate.substr(6,4)}`);
        
        return +date2*-1 - +date1*-1;
      });

      this.fbCommentsService.changeErrorMessage('');
    })
  }

  public addComment(): void {
    const newComment: Comment = {
      commentText: this.addCommentForm.value.commentText,
      commentDate: new Date().toLocaleDateString(),
      commentIsEdited: false
    }

    this.fbCommentsService.createCommentInDb(newComment, JSON.parse(localStorage.uid), this.task.id).subscribe(() => {
      this.addCommentForm.reset();
      this.fbCommentsService.stream$.next();
      this.fbCommentsService.changeErrorMessage('');
    })
  }

  public openDelCommentDialog(comment: Comment): void {
    const delDialogRefCom = this.comDialog.open(DelCommentModalComponent, {data: comment});
    this.currentDelComment = comment;

    delDialogRefCom.afterClosed().subscribe(result => {
      if (result) {
        this.fbCommentsService.deleteCommentInDb(this.currentDelComment.id, JSON.parse(localStorage.uid), this.task.id).subscribe(() => {
          this.fbCommentsService.stream$.next();
          this.fbCommentsService.changeErrorMessage('');
        })
      }
    });
  }

  public openEditCommentDialog(comment: Comment): void {
    const editDialogRefCom = this.comDialog.open(EditCommentModalComponent, {data: comment});
    this.currentEditComment = comment;

    editDialogRefCom.afterClosed().subscribe(result => {
      if (result) {
        this.fbCommentsService.editCommentInDb(result, JSON.parse(localStorage.uid),this.task.id, this.currentEditComment.id).subscribe(() => {
          this.fbCommentsService.stream$.next();
          this.fbCommentsService.changeErrorMessage('');
        })
      } 
    });
  }
}
