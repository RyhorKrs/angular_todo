import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { TasksComponent } from './tasks/tasks.component';
import { ProfileComponent } from './profile/profile.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { TasksGuard } from './../../../src/shared/guards/tasks.guard';
import { SignInOutGuard } from './../../../src/shared/guards/signinout.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'tasks', component: TasksComponent, canActivate: [TasksGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [TasksGuard] },
  { path: 'sign-in', component: SignInComponent, canActivate: [SignInOutGuard] },
  { path: 'sign-up', component: SignUpComponent, canActivate: [SignInOutGuard] }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
