import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AngularFireModule } from '@angular/fire/compat';

import { AppComponent } from './app.component';
import { HeaderModule } from './header/header.module';
import { HomeModule } from './home/home.module';
import { TasksModule } from './tasks/tasks.module';
import { SignInModule } from './sign-in/sign-in.module';
import { SignUpModule } from './sign-up/sign-up.module';
import { SignUpRedirectModule } from './sign-up-redirect/sign-up-redirect.module';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    HeaderModule,
    HomeModule,
    TasksModule,
    SignInModule,
    SignUpModule,
    SignUpRedirectModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      defaultLanguage: 'en'
    }),
    AngularFireModule.initializeApp(
      {
        apiKey: "AIzaSyARyqCmj0-Lu7lbH9_HEVpKk1c3fO-QI7E",
        authDomain: "angular-todo-7e025.firebaseapp.com",
        projectId: "angular-todo-7e025",
        storageBucket: "angular-todo-7e025.appspot.com",
        messagingSenderId: "1036902995944",
        appId: "1:1036902995944:web:ab058c177b055d6bf2365d"
      }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
