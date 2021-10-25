import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CheckSignInUser } from 'src/shared/services/checkSignInUser.service';
import { LocalStorageService } from 'src/shared/services/localStorage.service';
import { REGS } from './../../../../src/shared/constants/regs';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent{
  public form: FormGroup | any;
  public showSignInError: boolean = false;

  constructor(private router: Router, 
    private checkUserService: CheckSignInUser,
    private localStorageService: LocalStorageService
  ) {}

  public ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  public emailValidator(): void {
    if(!!this.form.value.email.match(REGS.EMAIL)) {
      this.form.controls.email.setErrors(null);
    } else {
      this.form.controls.email.setErrors({ nomatchReg: true });
    }
  }

  public rightDataUser():void {
    this.localStorageService.setItem('currentUser', JSON.stringify(this.form.value.email));
    this.showSignInError = false;
    this.router.navigate(['/tasks']);
    this.form.reset();
  }

  public onSubmit(): void {
    if (this.form.valid) {

      if(this.checkUserService.checkUser(this.form.value.email, this.form.value.password)) {
        this.rightDataUser();
      } else {
        this.showSignInError = true;
        this.form.reset();
      }
    }
  }
}
