import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Task } from '../interfaces/TASK';
import { Response } from '../interfaces/RESPONSE';
import { fbUrl } from '../constants/fb';

@Injectable({providedIn: 'root'})
export class FbTasksService {
  public errorMessage: string = '';
  public error$ = new Subject<string>();

  constructor(
    private http: HttpClient
  ) {}

  public createTaskInDb(task: Task, userUID: string): Observable<Task> {
    return this.http
      .post<Response>(`${fbUrl}/tasks/${userUID}.json`, task)
      .pipe(map(res => {
        return {...task, id: res.name};
      }));
  }

  public getTasksFromDb(userUID: string): Observable<Task[]> {
    return this.http
      .get<Task[]>(`${fbUrl}/tasks/${userUID}.json`)
      .pipe(map(tasks => {
        if(!tasks) {
          return [];
        }

        return tasks;
      }));
  }

  public deleteTaskInDb(task: Task, userUID: string): Observable<any> {
    return this.http.delete(`${fbUrl}/tasks/${userUID}/${task.id}.json`);
  }

  public editTaskInDb(task: Task, userUID: string, taskId: any): Observable<any> {
    return this.http.put(`${fbUrl}/tasks/${userUID}/${taskId}.json`, {
      taskTitle: task.taskTitle,
      taskDescription: task.taskDescription,
      taskImportant: task.taskImportant,
      taskDate: task.taskDate,
      taskCategory: task.taskCategory
    });
  }

  public changeErrorMessage(val: string): void {
    this.errorMessage = val;
    this.error$.next(this.errorMessage);
  }
}
