import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-password-strength',
  templateUrl: './password-strength.component.html',
  styleUrls: ['./password-strength.component.scss'],
})
export class PasswordStrengthComponent implements OnInit {
  @Input() stream$: Subject<string> | any;

  ngOnInit(): void {
    this.stream$.subscribe((password:string)=> {
      this.checkPasswordStrength(password);
    })
  }

  public passwordStrength: number | any;

  public uppercaseMatchCompleted: boolean = false;
  public lowercaseMatchCompleted: boolean = false;
  public numberMatchCompleted: boolean = false;
  public symbolMatchCompleted: boolean = false;
  public lengthMatchCompleted: boolean = false;

  private checkPasswordStrength(password: string): void {
    this.passwordStrength =
      Number(this.uppercaseMatch(password)) +
      Number(this.lowercaseMatch(password)) +
      Number(this.numberMatch(password)) +
      Number(this.symbolMatch(password)) +
      Number(this.lengthMatch(password));
  }

  private uppercaseMatch(password: string): boolean {
    this.uppercaseMatchCompleted = !!password.match(/(?=.*[A-Z])/);

    return this.uppercaseMatchCompleted;
  }

  private lowercaseMatch(password: string): boolean {
    this.lowercaseMatchCompleted = !!password.match(/(?=.*[a-z])/);

    return this.lowercaseMatchCompleted;
  }

  private numberMatch(password: string): boolean {
    this.numberMatchCompleted = !!password.match(/(?=.*\d)/);

    return this.numberMatchCompleted;
  }

  private symbolMatch(password: string): boolean {
    this.symbolMatchCompleted = !!password.match(/[!@#$%^&*(),.?":{}|<>]/);

    return this.symbolMatchCompleted;
  }

  private lengthMatch(password: string): boolean {
    this.lengthMatchCompleted = !!password.match(/[a-zA-Z\d@$#!%*?&^()-=_+]{8,}/);

    return this.lengthMatchCompleted;
  }

  /* REGEX 
  export const REGEX = {
    LINK: /^[a-z0-9\-_+:/]+\.[a-z0-9. \-_+]+$/i,
    EMAIL: /^[a-z0-9.\-_+]+@[a-z0-9\-_+]+\.[a-z0-9. \-_+]+$/i,
    PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{9,})/,
    UPPER_CASE: /(?=.*[A-Z])/,
    LOWER_CASE: /(?=.*[a-z])/,
    NINE_CHARACTERS: /[a-zA-Z\d@$#!%*?&^()-=_+]{9,}/,
    NUMBER: /(?=.*\d)/,
    SPECIAL_SYMBOL: /[!@#$%^&*(),.?":{}|<>]/
  };*/
}
