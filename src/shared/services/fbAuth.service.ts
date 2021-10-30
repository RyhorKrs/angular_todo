import { Injectable } from "@angular/core";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { HttpClient } from "@angular/common/http";
import { User } from "../interfaces/USER";
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

interface UserResponse {
  name: string
}

@Injectable({providedIn: 'root'})
export class FbAuthService {
  public isSignedIn: boolean = false;
  public uid: any = '';
  public id: any = '';

  public stream$ = new Subject<boolean>();

  constructor(
    public fbAuth: AngularFireAuth,
    private http: HttpClient
  ) {}


  public signUp(user: User): Promise<any> {
    return this.fbAuth.createUserWithEmailAndPassword(user.userEmail, user.userPassword);
  }

  public postDataInDb(user: User): Observable<User> {
    return this.http
      .post<UserResponse>(`https://angular-todo-7e025-default-rtdb.firebaseio.com/users/${user?.userUID}.json`, user )
      .pipe(map(res => {
        return {...user, id: res.name};
      }));
  }

  public signIn(email: string, password: string): Promise<any> {
    return this.fbAuth.signInWithEmailAndPassword(email, password);
  }

  public getDataFromDb(): Observable<any> {
    return this.http
      .get(`https://angular-todo-7e025-default-rtdb.firebaseio.com/users/${this.uid}/${this.id}.json`)
      .pipe(map(res => {
        return res;
      }));
  }

  public logout(): void {
    this.fbAuth.signOut();
    localStorage.removeItem('uid');
    this.isSignedIn = false;
    this.stream$.next(this.isSignedIn);

    this.uid = '';
    this.id = '';
  }

  public changeIsSignedIn(bool:boolean):void {
    this.isSignedIn = bool ? true : false;
    this.stream$.next(this.isSignedIn);
  }
}
