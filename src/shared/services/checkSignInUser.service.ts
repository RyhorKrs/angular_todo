import { registeredUsers } from "../constants/registeredUsers";

export class CheckSignInUser {
  public checkUser(email:string, password: string): boolean {
    const result: boolean = !!registeredUsers.find(user => (
      user.newUserEmail === email && user.newUserPassword === password
    ))

    return result;
  }
}
