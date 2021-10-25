import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from './../../../../src/shared/services/localStorage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public isSignIn: boolean = this.localStorageService.getItem('currentUser') ? true : false;
  public showUserMenu: boolean = false;

  public currentUser: string | null = this.localStorageService.getItem('currentUser');

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  public logoutUser() {
    this.localStorageService.removeItem('currentUser');
    this.router.navigate(['/sign-in']);
  }

  public toggleUserMenu():void {
    this.showUserMenu = !this.showUserMenu;
  }
}
