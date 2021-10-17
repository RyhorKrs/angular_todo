import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent{
  public form: FormGroup | any;
  public showPassStrength: boolean = false;

  constructor(public fb: FormBuilder) {
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
        Validators.required
      ]),
    });
  }

  public confirmPasswordValidator(): void {
    this.form.value.password !== this.form.value.confirmpassword
      ? this.form.controls.confirmpassword.setErrors({ nomatch: true })
      : this.form.controls.confirmpassword.setErrors(null);
  }

  public onSubmit(): void {
    if(this.form.valid && this.form.value.confirmpassword === this.form.value.password) {
      this.form.reset();
    }
  }
}
