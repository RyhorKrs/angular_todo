import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  form: FormGroup;
  emailError: string = '';
  passwordError: string = '';
  confirmPasswordError: string = '';
  firstnameError: string = '';
  lastnameError: string = '';

  constructor(private router: Router) {}

  public ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
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
        Validators.email, 
        Validators.required
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      confirmpassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  public getFirstNameErrorMessage(): void {
    this.firstnameError = this.form.value.firstname.trim()
      ? 'Not a valid First Name'
      : 'You must enter a value'
  }

  public getLastNameErrorMessage(): void {
    this.lastnameError = this.form.value.lastname.trim()
      ? 'Not a valid Last Name'
      : 'You must enter a value'
  }

  public getEmailErrorMessage(): void {
    this.emailError = this.form.value.email.trim()
      ? 'Not a valid Email'
      : 'You must enter a value'
  }

  public getPasswordErrorMessage(): void {
    this.passwordError = this.form.value.password.trim()
      ? 'Not a valid Password'
      : 'You must enter a value'
  }

  public getConfirmPasswordErrorMessage(): void {
    this.confirmPasswordError = this.form.value.confirmpassword !== this.form.value.password
      ? 'Value must be matched with Password'
      : 'You must enter a correct value of Password'
  }

  public goToSignInPage(): void {
    this.router.navigate(['/sign-in']);
  }

  public onSubmit(): void {
    if (this.form.value.confirmpassword !== this.form.value.password) {
      this.getConfirmPasswordErrorMessage();
    } else if(this.form.valid && this.form.value.confirmpassword === this.form.value.password) {
      this.initForm();
    }
  }
}