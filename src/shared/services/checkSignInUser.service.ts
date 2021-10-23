import { Injectable } from "@angular/core";
import { registeredUsers } from "../constants/registeredUsers";

@Injectable()
export class CheckSignInUser {
  public checkUser(email:string, password: string): boolean {
    const result: boolean = !!registeredUsers.find(user => (
      user.userEmail === email && user.userPassword === password
    ))

    return result;
  }
}
