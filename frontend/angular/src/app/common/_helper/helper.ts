import {HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {LoggedInUser} from '../classes/user';

@Injectable({providedIn: 'root'})
export class HelperService {
  public headerOptions: any = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  public isEmpty = (obj) => {
    for (const prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        return false;
      }
    }
    return true;
  }

  public getLocalStorageUser(): LoggedInUser {
    const storageUser: string = localStorage.getItem('currentUser');
    let user: LoggedInUser;

    if (storageUser) {
      try {
        user = JSON.parse(storageUser);
      } catch (ex) {
        user = new LoggedInUser();
      }
    } else {
      user = new LoggedInUser();
    }

    return user;
  }
}
