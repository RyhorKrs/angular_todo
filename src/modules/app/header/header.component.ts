import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { TranslateService } from '@ngx-translate/core';

import { FbAuthService } from './../../../../src/shared/services/fbAuth.service';
import { LocalStorageService } from './../../../../src/shared/services/localStorage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public isSignIn: boolean = false;
  public showUserMenu: boolean = false;
  public language: string = 'en';
  public currentUser: string = 'xxx';
  public sub: Subscription | any;

  constructor (
    private localStorageService: LocalStorageService,
    private router: Router,
    public translate: TranslateService,
    public fbService: FbAuthService
  ) {}

  public ngOnInit(): void {
    this.sub = this.fbService.stream$.subscribe((value: boolean) => {
      this.isSignIn = value;
    })

    this.isSignIn = !!this.localStorageService.getItem('uid');
  }

  public ngOnDestroy(): void {
    this.sub.unsubscribe();
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
