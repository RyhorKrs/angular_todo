import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { REGS } from './../../../../src/shared/constants/regs';
import { FbAuthService } from 'src/shared/services/fbAuth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit{
  public form: FormGroup | any;
  public showPassStrength: boolean = false;
  public isSignedIn: boolean = false;

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

    this.isSignedIn = localStorage.getItem('currentUser') !== null;
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

  public async onSignUp():Promise<void> {
    await this.fbService.signUp(this.form.value.email, this.form.value.password)
    if(this.fbService.isSignedUp) {
      this.form.reset();
      this.router.navigate(['/sign-up-redirect']);
    }
  }
}
