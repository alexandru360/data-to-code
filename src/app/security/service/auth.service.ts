import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {LoggedInUser, User, UserRegister} from '../../common/classes/user';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {ConfigService} from '../../common/services/config.service';
import {HelperService} from '../../common/_helper/helper';

@Injectable({providedIn: 'root'})
export class AuthService {
  private currentUserSubject: BehaviorSubject<LoggedInUser> =
    new BehaviorSubject<LoggedInUser>(null);
  public currentUser: Observable<LoggedInUser>;

  public changeCurrentUserSubject(par: LoggedInUser) {
    this.currentUserSubject.next(par);
  }

  public get currentUserValue(): LoggedInUser {
    return this.currentUserSubject.value;
  }

  constructor(
    private cfgSrv: ConfigService,
    private helper: HelperService,
    private router: Router,
    private http: HttpClient) {
    this.currentUserSubject =
      new BehaviorSubject<LoggedInUser>(this.helper.getLocalStorageUser());
    this.currentUser = this.currentUserSubject.asObservable();
  }

  register(user: UserRegister) {
    const payload = JSON.stringify(user);
    return this.http.post<any>(this.cfgSrv.getConfiguration().LoginRoute,
      payload, this.helper.headerOptions);
  }

  login(user: User) {
    return this.http.post<LoggedInUser>(
      this.cfgSrv.getConfiguration().LoginRoute,
      user, this.helper.headerOptions)
      // tslint:disable-next-line:no-shadowed-variable
      .pipe(map(user => user));
  }

  logout() {
    sessionStorage.removeItem('currentUser');
    // localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
