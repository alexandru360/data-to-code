import {Injectable, isDevMode} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {LoggedInUser} from '../classes/user';
import {Observable, throwError as observableThrowError} from 'rxjs';
import {ConfigService} from './config.service';
import 'rxjs-compat/add/operator/map';

@Injectable({providedIn: 'root'})
export class CommonService {

  httpHeaders: object = {headers: ''};
  user: LoggedInUser;

  constructor(
    private cfg: ConfigService,
    private http: HttpClient) {
    // const data = JSON.parse(sessionStorage.getItem('currentUser'));
    const data = {};
    this.user = new LoggedInUser();
    this.user.clone(data);

    let header;
    if (isDevMode()) {
      header = new HttpHeaders()
        .append('Content-Type', 'application/json')
        .append('Authorization', `Bearer ${this.user.token}`);
    } else {
      header = new HttpHeaders()
        .append('Content-Type', 'application/json')
        .append('Authorization', this.user.token);
    }

    this.httpHeaders = {headers: header};
  }


  private handleError(res: HttpErrorResponse | any): Observable<any> | '' {
    console.error(res.error || res.body.error);
    return observableThrowError(res.error || 'Server error');
  }
}
