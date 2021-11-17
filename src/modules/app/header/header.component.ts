import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { TranslateService } from '@ngx-translate/core';

import { FbAuthService } from './../../../../src/shared/services/fbAuth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public isSignIn: boolean = false;
  public language: string = 'en';
  public currentUser: string = '';
  public currentAvatar: string = '';
  public sub: Subscription | any;

  constructor (
    private router: Router,
    public translate: TranslateService,
    public fbService: FbAuthService
  ) {}

  public ngOnInit(): void {
    this.sub = this.fbService.stream$.subscribe((value: boolean) => {
      this.isSignIn = value;

      if(this.isSignIn) {
        this.fbService.getDataFromDb(JSON.parse(localStorage.uid)).subscribe(res => {
          let user = res[Object.keys(res)[0]];
          this.currentUser = user.userEmail;
          this.currentAvatar = user.userFirstName[0] + user.userLastName[0];
        })
      }
    })
  }

  public ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  public logoutUser():void {
    this.fbService.logout();
    this.router.navigate(['/sign-in']);
  }

  public toggleLanguage(): void {
    this.language = this.language === 'en' ? 'ru' : 'en';
    this.translate.use(this.language);
  }
}
