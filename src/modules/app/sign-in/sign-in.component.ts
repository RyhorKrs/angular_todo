import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FbAuthService } from 'src/shared/services/fbAuth.service';
import { REGS } from './../../../../src/shared/constants/regs';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit{
  public form: FormGroup | any;
  public showSignInError: boolean = false;

  public isSignedIn: boolean = false;

  constructor(private router: Router, 
    public fbService: FbAuthService
  ) {}

  public ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });

    this.isSignedIn = localStorage.getItem('currentUser') !== null;
  }

  public emailValidator(): void {
    if(!!this.form.value.email.match(REGS.EMAIL)) {
      this.form.controls.email.setErrors(null);
    } else {
      this.form.controls.email.setErrors({ nomatchReg: true });
    }
  }

  public async onSignIn():Promise<void> {
    await this.fbService.signIn(this.form.value.email, this.form.value.password)
    if(this.fbService.isSignedIn) {
      this.showSignInError = false;
      this.isSignedIn = true;
      this.router.navigate(['/tasks']);
    } else {
      this.showSignInError = true;
      this.form.reset();
    }
  }
}
