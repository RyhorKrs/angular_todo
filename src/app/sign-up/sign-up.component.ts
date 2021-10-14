import { Component, OnInit } from "@angular/core";
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from "@angular/router";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  form: FormGroup 

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      firstname: new FormControl('', [
        Validators.required, 
        Validators.minLength(3)
      ]),
      lastname: new FormControl('', [
        Validators.required, 
        Validators.minLength(3)
      ]),
      email: new FormControl('', [
        Validators.email, 
        Validators.required
      ]),
      password: new FormControl(null, [
        Validators.required, 
        Validators.minLength(8)
      ]),
      confirmpassword: new FormControl(null, [
        Validators.required, 
        Validators.minLength(8)
      ])
    })
  }

  goToSignInPage(): void {
    this.router.navigate(['/sign-in'])
  }

  onSubmit(): void {
    if(this.form.valid && this.form.value.password === this.form.value.confirmpassword) {
      console.log({...this.form.value});
    }
  }
}
