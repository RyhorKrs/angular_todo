import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Comment } from '../interfaces/COMMENT';
import { Response } from '../interfaces/RESPONSE';
import { fbUrl } from '../constants/fb';

@Injectable({providedIn: 'root'})
export class FbCommentsService {
  public errorMessage: string = '';
  public error$ = new Subject<string>();

  constructor(
    private http: HttpClient
  ) {}

  public createCommentInDb(comment: Comment, userUID: string, taskID: string): Observable<Comment> {
    return this.http
      .post<Response>(`${fbUrl}/comments/${userUID}/${taskID}.json`, comment)
      .pipe(map(res => {
        return {...comment, id: res.name};
      }));
  }

  public getCommentsFromDb(userUID: string, taskID: string): Observable<Comment[]> {
    return this.http
      .get<Comment[]>(`${fbUrl}/comments/${userUID}/${taskID}.json`)
      .pipe(map(comments => {
        if(!comments) {
          return [];
        }

        return comments;
      }));
  }

  public deleteCommentInDb(commentID: string, userUID: string, taskID: string): Observable<any> {
    return this.http.delete(`${fbUrl}/comments/${userUID}/${taskID}/${commentID}.json`);
  }

  public editCommentInDb(comment: Comment, userUID: string, taskId: any, commentId: string): Observable<any> {
    return this.http.put(`${fbUrl}/comments/${userUID}/${taskId}/${commentId}.json`, comment);
  }

  public changeErrorMessage(val: string): void {
    this.errorMessage = val;
    this.error$.next(this.errorMessage);
  }
}
