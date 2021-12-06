import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';

import { FbAuthService } from './../../../../src/shared/services/fbAuth.service';
import { User } from './../../../../src/shared/interfaces/USER';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  public editProfileForm: FormGroup | any;
  public currentUser: any = {};
  public userPhoto: any = '';
  public error: string = '';
  public sub: Subscription | any;

  constructor(
    public fbService: FbAuthService
  ) {}

  public ngOnInit(): void {
    this.sub = this.fbService.error$.subscribe((value: string) => {
      this.error = value;
    })

    this.getUserData();
    this.initEditForm();
  }

  public ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  public initEditForm(): void {
    this.editProfileForm = new FormGroup({
      firstname: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      lastname: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      email: new FormControl('', [
        Validators.required
      ]),
      birth: new FormControl(''),
      gender: new FormControl(''),
      color: new FormControl(''),
      photo: new FormControl('')
    });
  }

  public getUserData(): void {
    this.fbService.getDataFromDb(JSON.parse(localStorage.uid)).subscribe(res => {
      this.currentUser = res[Object.keys(res)[0]];
      this.currentUser.id = Object.keys(res)[0];
      this.userPhoto = this.currentUser.userPhoto;

      let validBirth = this.currentUser.userBirth ? new Date(`${this.currentUser.userBirth.substr(3,2)}.${this.currentUser.userBirth.substr(0,2)}.${this.currentUser.userBirth.substr(6,4)}`) : '';
      let validGender = this.currentUser.userGender ? this.currentUser.userGender : '';

      this.editProfileForm.patchValue({firstname: this.currentUser.userFirstName});
      this.editProfileForm.patchValue({lastname: this.currentUser.userLastName});
      this.editProfileForm.patchValue({email: this.currentUser.userEmail});
      this.editProfileForm.patchValue({birth: validBirth});
      this.editProfileForm.patchValue({gender: validGender});
      this.editProfileForm.patchValue({color: this.currentUser.userColor});
    })
  }

  public editData(): void {
    let date = this.editProfileForm.value.birth ? this.editProfileForm.value.birth.toLocaleDateString() : '';

    const editedUserData: User = {
      userFirstName: this.editProfileForm.value.firstname,
      userLastName: this.editProfileForm.value.lastname,
      userEmail: this.editProfileForm.value.email,
      userPassword: this.currentUser.userPassword,
      userBirth: date,
      userGender: this.editProfileForm.value.gender,
      userColor: this.editProfileForm.value.color,
      userPhoto: this.userPhoto,
      userUID: this.currentUser.userUID
    };
    
    this.fbService.editDataInDb(editedUserData, JSON.parse(localStorage.uid), this.currentUser.id).subscribe(() => {
      this.fbService.changeIsSignedIn(true);
      this.getUserData();
    })
  }

  public uploadPhoto(event: any): void {
    const reader = new FileReader();

    reader.onloadend = () => {
      this.userPhoto = reader.result;
    }
    
    reader.readAsDataURL(event.target.files[0]);
  }
}
