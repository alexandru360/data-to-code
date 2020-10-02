import {Injectable, isDevMode} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {LoggedInUser} from '../classes/user';
import {Observable, throwError as observableThrowError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {ConfigService} from './config.service';
import {UserTrip} from '../classes/user-trip';
import 'rxjs-compat/add/operator/map';

@Injectable({providedIn: 'root'})
export class CommonService {

  httpHeaders: object = {headers: ''};
  user: LoggedInUser;

  constructor(
    private cfg: ConfigService,
    private http: HttpClient) {
    const data = JSON.parse(sessionStorage.getItem('currentUser'));
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

  saveTripName(body: UserTrip): Observable<UserTrip> {
    body.UserId = this.user.id;
    const url = this.cfg.getConfiguration().AddTrip;
    return this.http.post<UserTrip>(url, body, this.httpHeaders)
      .map((response) => response, catchError(this.handleError));
  }

  getTripsByUserId(): Observable<Array<any>> {
    const url = `${this.cfg.getConfiguration().GetUserTrips}${this.user.id}`;
    return this.http.get<Array<any>>(url, this.httpHeaders)
      .map((response) => response, catchError(this.handleError));
  }

  private handleError(res: HttpErrorResponse | any) {
    console.error(res.error || res.body.error);
    return observableThrowError(res.error || 'Server error');
  }
}
