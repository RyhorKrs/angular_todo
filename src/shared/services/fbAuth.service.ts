import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/USER';
import { Response } from '../interfaces/RESPONSE';
import { fbUrl } from '../constants/fb';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class FbAuthService {
  public isSignedIn: boolean = false;

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
      .post<Response>(`${fbUrl}/users/${user?.userUID}.json`, user )
      .pipe(map(res => {
        return {...user, id: res.name};
      }));
  }

  public signIn(email: string, password: string): Promise<any> {
    return this.fbAuth.signInWithEmailAndPassword(email, password);
  }

  public getDataFromDb(uid: string): Observable<any> {
    return this.http
      .get(`${fbUrl}/users/${uid}.json`)
      .pipe(map(res => res));
  }

  public logout(): void {
    this.fbAuth.signOut();
    localStorage.removeItem('uid');
    this.isSignedIn = false;
    this.stream$.next(this.isSignedIn);
  }

  public changeIsSignedIn(bool:boolean):void {
    this.isSignedIn = bool;
    this.stream$.next(this.isSignedIn);
  }
}
