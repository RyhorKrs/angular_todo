import { Injectable } from "@angular/core";
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({providedIn: 'root'})
export class FbAuthService {
  
  public isSignedIn: boolean = false;
  public isSignedUp: boolean = false;

  constructor(public fbAuth: AngularFireAuth) {}

  public async signIn(email: string, password: string) {
    await this.fbAuth.signInWithEmailAndPassword(email, password)
    .then(res => {
      this.isSignedIn = true;
      localStorage.setItem('currentUser', JSON.stringify(res.user))
    })
    .catch(err => {
      console.log(err);
      this.isSignedIn = false;
    })
  }

  public async signUp(email: string, password: string) {
    await this.fbAuth.createUserWithEmailAndPassword(email, password)
    .then(res => {
      this.isSignedUp = true;
      //localStorage.setItem('currentUser', JSON.stringify(res.user))
    })
  }

  public logout(): void {
    this.fbAuth.signOut();
    localStorage.removeItem('currentUser');
  }
}
