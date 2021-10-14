import { Component, OnInit } from "@angular/core";
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  form: FormGroup 

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [
        Validators.email, 
        Validators.required
      ]),
      password: new FormControl(null, [
        Validators.required, 
        Validators.minLength(8)
      ])
    })
  }

  onSubmit(): void {
    if(this.form.valid) {
      console.log({...this.form.value});
    }
  }
}
