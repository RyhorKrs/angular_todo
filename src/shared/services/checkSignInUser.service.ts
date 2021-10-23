import { registeredUsers } from "../constants/registeredUsers";

export class CheckSignInUser {
  public checkUser(email:string, password: string): boolean {
    const result: boolean = !!registeredUsers.find(user => (
      user.userEmail === email && user.userPassword === password
    ))

    return result;
  }
}
