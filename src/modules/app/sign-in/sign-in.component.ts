import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent{
  public form: FormGroup;
  emailError: string = '';
  passwordError: string = '';

  constructor(public fb: FormBuilder) {
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

  public onSubmit(): void {
    if (this.form.valid) {
      console.log('asdasdasdasd')
      this.form.reset(); 
    }
  }
}
