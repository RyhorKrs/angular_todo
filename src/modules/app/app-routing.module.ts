import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { TasksComponent } from "./tasks/tasks.component";
import { SignInComponent } from "./sign-in/sign-in.component";
import { SignUpComponent } from "./sign-up/sign-up.component";
import { SignUpRedirectComponent } from "./sign-up-redirect/sign-up-redirect.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'tasks', component: TasksComponent},
  {path: 'sign-in', component: SignInComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'sign-up-redirect', component: SignUpRedirectComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
