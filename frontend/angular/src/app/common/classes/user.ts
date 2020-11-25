export class User {
  Username: string;
  Password: string;
}

export class UserRegister {
  FirstName: string;
  LastName: string;
  Username: string;
  Email: string;
  Password: string;
}

export class LoggedInUser {
  id: number;
  lastName: string;
  firstName: string;
  username: string;
  token: string;

  clone(par: any) {
    this.id = par.id;
    this.lastName = par.lastName;
    this.firstName = par.firstName;
    this.username = par.username;
    this.token = par.token;
  }
}
