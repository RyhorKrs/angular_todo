import { Component } from '@angular/core';

@Component({
  selector: 'app-password-strength',
  templateUrl: './password-strength.component.html',
  styleUrls: ['./password-strength.component.scss'],
})
export class PasswordStrengthComponent{
  public passwordStrength: number | any;

  public uppercaseMatch: boolean = false;
  public lowercaseMatch: boolean = false;
  public numberMatch: boolean = false;
  public symbolMatch: boolean = false;
  public lengthMatch: boolean = false;
}
