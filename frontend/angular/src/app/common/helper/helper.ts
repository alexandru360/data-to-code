import {HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {LoggedInUser} from '../classes/user';
import {CookieService} from 'ngx-cookie-service';

@Injectable({providedIn: 'root'})
export class HelperService {
  cookieValue: string;

  constructor(private cookieService: CookieService) {
    this.cookieValue = '';
  }

  public headerOptions: any = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  public isEmpty = ((obj: any) => {
    for (const prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        return false;
      }
    }
    return true;
  });

  public getLoggedInUser(): LoggedInUser {
    const cookie = this.cookieService.get('Test');
    return new LoggedInUser();
  }

}
