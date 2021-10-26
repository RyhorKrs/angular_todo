import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from './../../../../src/shared/services/localStorage.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public isSignIn: boolean = this.localStorageService.getItem('currentUser') ? true : false;
  public showUserMenu: boolean = false;
  public language: string = 'en';

  public currentUser: string | null = this.localStorageService.getItem('currentUser');

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,
    public translate: TranslateService
  ) {}

  public logoutUser():void {
    this.localStorageService.removeItem('currentUser');
    this.router.navigate(['/sign-in']);
  }

  public toggleUserMenu():void {
    this.showUserMenu = !this.showUserMenu;
  }

  public toggleLanguage(): void {
    this.language = this.language === 'en' ? 'ru' : 'en';
    
    this.translate.use(this.language);
  }
}
