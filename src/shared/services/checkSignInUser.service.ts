import { NewUser } from "../interfaces/NEWUSER"

export class CheckSignInUser {
  private registeredUsers: NewUser[] = [ 
    {
      newUserFirstName: 'Ben',
      newUserLastName: 'Smith',
      newUserEmail: 'test1@mail.ru',
      newUserPassword: 'Qwerty123*'
    },
    {
      newUserFirstName: 'John',
      newUserLastName: 'Smith',
      newUserEmail: 'test2@gmail.com',
      newUserPassword: 'Asdfgh123*'
    },
    {
      newUserFirstName: 'Alex',
      newUserLastName: 'Smith',
      newUserEmail: 'test3@yandex.ru',
      newUserPassword: 'Zxcvbn123*'
    }
  ]

  public checkUser(email:string, password: string): boolean {
    const result: boolean = !!this.registeredUsers.find(user => (
      user.newUserEmail === email && user.newUserPassword === password
    ))

    return result;
  }
}