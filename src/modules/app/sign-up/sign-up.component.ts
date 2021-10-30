import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { REGS } from './../../../../src/shared/constants/regs';
import { FbAuthService } from 'src/shared/services/fbAuth.service';
import { User } from 'src/shared/interfaces/USER';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit{
  public form: FormGroup | any;
  public showPassStrength: boolean = false;
  public error: string = '';
  public showLoader: boolean = false;

  public stream$ = new Subject<string>();

  constructor(
    private router: Router,
    public fbService: FbAuthService
  ) {}

  public ngOnInit(): void {
    this.form = new FormGroup({
      firstname: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      lastname: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      email: new FormControl('', [
        Validators.required, 
        Validators.pattern(REGS.EMAIL)
      ]),
      password: new FormControl('', [
        Validators.required
      ]),
      confirmpassword: new FormControl('', [
        Validators.required
      ]),
    });
  }

  public passwordInput(event: any): void {
    if(!!event.target.value.match(REGS.PASSWORD)) {
      this.form.controls.password.setErrors(null);
    } else {
      this.form.controls.password.setErrors({ nomatchReg: true });
    }
    
    this.stream$.next(event.target.value);
  }

  public confirmPasswordValidator(): void {
    this.form.value.password !== this.form.value.confirmpassword
      ? this.form.controls.confirmpassword.setErrors({ nomatch: true })
      : this.form.controls.confirmpassword.setErrors(null);
  }

  public onSignUp(): void {
    this.showLoader = true;

    const user: User = {
      userEmail: this.form.value.email,
      userFirstName: this.form.value.firstname,
      userLastName: this.form.value.lastname,
      userPassword: this.form.value.password
    };

    this.fbService.signUp(user)
    .then(res => {
      user.userUID = res.user?.uid;
      this.error = '';

      this.fbService.postDataInDb(user).subscribe(user => {
        this.showLoader = false;
        this.error = '';

        this.fbService.signIn(user.userEmail, user.userPassword)
        .then(res => {
          this.fbService.changeIsSignedIn(true);
          this.error = '';
          localStorage.setItem('uid', JSON.stringify(res.user?.uid));
          this.showLoader = false;
          this.form.reset();
          this.router.navigate(['/tasks']);
        })
        .catch(err => {
          this.fbService.changeIsSignedIn(false);
          this.error = err.message;
          this.showLoader = false;
          this.form.reset();
        })
      }, err => {
        this.error = err.message;
        this.showLoader = false;
      })
    })
    .catch(err => {
      this.error = err.message;
      this.showLoader = false;
    })
  }
}
