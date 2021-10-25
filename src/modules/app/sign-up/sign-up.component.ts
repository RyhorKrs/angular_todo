import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { REGS } from './../../../../src/shared/constants/regs';
import { User } from './../../../../src/shared/interfaces/USER';
import { LocalStorageService } from './../../../../src/shared/services/localStorage.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit{
  public form: FormGroup | any;
  public showPassStrength: boolean = false;

  public stream$ = new Subject<string>();

  constructor(
    private router: Router,
    private localStorageService: LocalStorageService
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
    
    this.stream$.next(event.target.value)
  }

  public confirmPasswordValidator(): void {
    this.form.value.password !== this.form.value.confirmpassword
      ? this.form.controls.confirmpassword.setErrors({ nomatch: true })
      : this.form.controls.confirmpassword.setErrors(null);
  }

  public onSubmit(): void {
    if(this.form.valid && this.form.value.confirmpassword === this.form.value.password) {
      const newUser: User = {
        userFirstName: this.form.value.firstname,
        userLastName: this.form.value.lastname,
        userEmail: this.form.value.email,
        userPassword: this.form.value.password
      };
      
      this.localStorageService.setItem('newUser', JSON.stringify(newUser));

      this.form.reset();

      this.router.navigate(['/sign-up-redirect']);
    }
  }
}
