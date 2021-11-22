import { Component, Input, Output, EventEmitter } from "@angular/core";

import { Comment } from "./../../../../../../src/shared/interfaces/COMMENT";

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.scss']
})
export class CommentItemComponent {
  @Input() comment: any;
  @Output() onDel: EventEmitter<Comment> = new EventEmitter<Comment>();
  @Output() onEdit: EventEmitter<Comment> = new EventEmitter<Comment>();

  public delComment(): void {
    this.onDel.emit(this.comment);
  }

  public editComment(): void {
    this.onEdit.emit(this.comment);
  }
}
