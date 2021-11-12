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
  public error: string = '';
  public showLoader: boolean = false;

  constructor(
    private router: Router, 
    public fbService: FbAuthService
  ) {}

  public ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(REGS.EMAIL)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  public onSignIn(): void {
    this.showLoader = true;
    this.fbService.signIn(this.form.value.email, this.form.value.password)
    .then(res => {
      this.fbService.changeIsSignedIn(true);
      this.error = '';
      localStorage.setItem('uid', JSON.stringify(res.user?.uid))
      this.showLoader = false;
      this.router.navigate(['/tasks']);
    })
    .catch(err => {
      this.fbService.changeIsSignedIn(false);
      this.error = err.message;
      this.showLoader = false;
      this.form.reset();
    })
  }
}
