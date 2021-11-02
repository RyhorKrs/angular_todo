import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from './../../../../src/shared/services/localStorage.service';
import { TranslateService } from '@ngx-translate/core';
import { FbAuthService } from 'src/shared/services/fbAuth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public isSignIn: boolean = false;
  public showUserMenu: boolean = false;
  public language: string = 'en';
  public currentUser: string = 'xxx';

  constructor (
    private localStorageService: LocalStorageService,
    private router: Router,
    public translate: TranslateService,
    public fbService: FbAuthService
  ) {}

  public ngOnInit(): void {
    this.fbService.stream$.subscribe((value: boolean) => {
      this.isSignIn = value;
    })

    this.isSignIn = !!this.localStorageService.getItem('uid');
  }

  public logoutUser():void {
    this.fbService.logout();

    this.showUserMenu = false;
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
