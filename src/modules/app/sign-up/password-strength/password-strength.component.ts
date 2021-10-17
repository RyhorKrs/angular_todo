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

  /*private checkPasswordStrength(password: string): void {
    this.passwordStrength =
      Number(this.uppercaseMatch(password)) +
      Number(this.lowercaseMatch(password)) +
      Number(this.numberMatch(password)) +
      Number(this.symbolMatch(password)) +
      Number(this.lengthMatch(password));
  }*/

  /* REGEX 
  export const REGEX = {
    LINK: /^[a-z0-9\-_+:/]+\.[a-z0-9. \-_+]+$/i,
    EMAIL: /^[a-z0-9.\-_+]+@[a-z0-9\-_+]+\.[a-z0-9. \-_+]+$/i,
    PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
    UPPER_CASE: /(?=.*[A-Z])/,
    LOWER_CASE: /(?=.*[a-z])/,
    NINE_CHARACTERS: /[a-zA-Z\d@$#!%*?&^()-=_+]{9,}/,
    NUMBER: /(?=.*\d)/,
    SPECIAL_SYMBOL: /[!@#$%^&*(),.?":{}|<>]/
  };*/
}
