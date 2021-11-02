import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../interfaces/TASK';
import { Response } from '../interfaces/RESPONSE';
import { fbUrl } from '../constants/fb';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class FbTasksService {

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
}
