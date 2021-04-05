import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpEvent, HttpResponse} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {LoggedInUser, User, UserRegister} from '../common/classes/user';
import {ConfigService} from '../common/services/config.service';
import {HelperService} from '../common/helper/helper';

@Injectable({providedIn: 'root'})
export class AuthService {

  private currentUserSubject: BehaviorSubject<LoggedInUser>;
  public currentUser: Observable<LoggedInUser>;

  constructor(
    private cfgSrv: ConfigService,
    private helper: HelperService,
    private router: Router,
    private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<LoggedInUser>(this.helper.getLoggedInUser());
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public changeCurrentUserSubject(par: LoggedInUser): void {
    this.currentUserSubject?.next(par);
  }

  public get currentUserValue(): LoggedInUser | null {
    return this.currentUserSubject?.value || null;
  }

  register(user: UserRegister): Observable<HttpEvent<LoggedInUser>> {
    const payload = JSON.stringify(user);
    return this.http.post<any>(this.cfgSrv.getConfiguration().RegisterRoute, payload, this.helper.headerOptions);
  }

  login(user: User): Observable<HttpEvent<LoggedInUser>> {
    return this.http.post<LoggedInUser>(this.cfgSrv.getConfiguration().LoginRoute, user, this.helper.headerOptions)
      .pipe(map(user => user));
  }

  logout(): void {
    sessionStorage.removeItem('currentUser');
    this.currentUserSubject?.next(new LoggedInUser());
  }

}
