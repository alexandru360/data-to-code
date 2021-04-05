export class User {
  Username = '';
  Password = '';
}

export class UserRegister {
  FirstName = '';
  LastName = '';
  Username = '';
  Email = '';
  Password = '';
}

export class LoggedInUser {
  id = -1;
  lastName = '';
  firstName = '';
  username = '';
  token = '';

  clone(par: any) {
    this.id = par.id;
    this.lastName = par.lastName;
    this.firstName = par.firstName;
    this.username = par.username;
    this.token = par.token;
  }
}
