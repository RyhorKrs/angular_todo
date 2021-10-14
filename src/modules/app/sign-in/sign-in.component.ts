import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  form: FormGroup;
  emailError: string = '';
  passwordError: string = '';

  constructor(private router: Router) {}

  public ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.form = new FormGroup({
      email: new FormControl('', [
        Validators.email, 
        Validators.required
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }


  public getEmailErrorMessage(): void {
    this.emailError = this.form.value.email.trim()
      ? 'Not a valid email'
      : 'You must enter a value'
  }

  public getPasswordErrorMessage(): void {
    this.passwordError = this.form.value.password.trim()
      ? 'Not a valid password'
      : 'You must enter a value'
  }

  public goToSignUpPage(): void {
    this.router.navigate(['/sign-up']);
  }

  public onSubmit(): void {
    if (this.form.valid) {
      this.initForm();
    }
  }
}
