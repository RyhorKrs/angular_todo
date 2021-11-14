import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { FbAuthService } from './fbAuth.service';
import { FbTasksService } from './fbTasks.service';
import { FbCommentsService } from './fbComments.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private fbAuthService: FbAuthService, 
    private fbTasksService: FbTasksService,
    private fbCommentsService: FbCommentsService
    ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('FromInterceptor', error);
        
        if (error.status === 0) {
          this.fbAuthService.changeErrorMessage('Service Temporarily Unavailable');
          this.fbTasksService.changeErrorMessage('Service Temporarily Unavailable');
          this.fbCommentsService.changeErrorMessage('Service Temporarily Unavailable');
        } else {
          this.fbAuthService.changeErrorMessage(error.status + ': ' + error.statusText);
          this.fbTasksService.changeErrorMessage(error.status + ': ' + error.statusText);
          this.fbCommentsService.changeErrorMessage(error.status + ': ' + error.statusText);
        }

        return throwError(error);
      })
    );
  }
}
