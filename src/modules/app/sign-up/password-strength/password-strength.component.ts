import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { REGS } from '../../../../shared/constants/regs';

@Component({
  selector: 'app-password-strength',
  templateUrl: './password-strength.component.html',
  styleUrls: ['./password-strength.component.scss'],
})
export class PasswordStrengthComponent implements OnInit {
  @Input() stream$: Subject<string> | any;

  public ngOnInit(): void {
    this.stream$.subscribe((password:string)=> {
      this.checkPasswordStrength(password);
    })
  }

  public passwordStrength: number = 0;
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
    this.uppercaseMatchCompleted = !!password.match(REGS.UPPER_CASE);

    return this.uppercaseMatchCompleted;
  }

  private lowercaseMatch(password: string): boolean {
    this.lowercaseMatchCompleted = !!password.match(REGS.LOWER_CASE);

    return this.lowercaseMatchCompleted;
  }

  private numberMatch(password: string): boolean {
    this.numberMatchCompleted = !!password.match(REGS.NUMBER);

    return this.numberMatchCompleted;
  }

  private symbolMatch(password: string): boolean {
    this.symbolMatchCompleted = !!password.match(REGS.SYMBOL);

    return this.symbolMatchCompleted;
  }

  private lengthMatch(password: string): boolean {
    this.lengthMatchCompleted = !!password.match(REGS.EIGHT_LENGTH);

    return this.lengthMatchCompleted;
  }
}
