import { Component, OnInit } from "@angular/core";
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from "@angular/router";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  form: FormGroup 
  emailError: string = '';
  passwordError: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [
        Validators.email, 
        Validators.required
      ]),
      password: new FormControl('', [
        Validators.required, 
        Validators.minLength(8)
      ])
    })
  }

  getEmailErrorMessage(): void {
    if(this.form.value.email.trim()) {
      this.emailError = 'Not a valid email'
    } else {
      this.emailError = 'You must enter a value'
    }
  }

  getPasswordErrorMessage(): void {
    if(this.form.value.password.trim()) {
      this.passwordError = 'Not a valid password'
    } else {
      this.passwordError = 'You must enter a value'
    }
  }

  goToSignUpPage(): void {
    this.router.navigate(['/sign-up'])
  }

  onSubmit(): void {
    if(this.form.valid) {
      console.log({...this.form.value});

      this.form.reset();
    }
  }
}
