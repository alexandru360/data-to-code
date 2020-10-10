import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from '../service/auth.service';
import {HelperService} from '../../common/_helper/helper';
import {AppConfigService} from '../../app.config.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private cfgSrv: AppConfigService,
    private helper: HelperService,
    private authService: AuthService,
    private router: Router
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // If we use security than login and all the bells/withsles
    const security = this.cfgSrv.getConfiguration().securityConfig.useSecurity;
    // const defaultRoute = this.cfgSrv.getConfiguration().securityConfig.defaultAuthenticatedRoute;
    if (security) {
      const currentUser = this.authService.currentUserValue;
      const checkUser = this.helper.isEmpty(currentUser);
      if (currentUser && !checkUser) {
        return true; // logged in so return true
      }

      // not logged in so redirect to login page with the return url
      this.router.navigate(['/login']).then().catch(ex => console.log(ex));
      // this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
      return false;
    } else {
      // this.router.navigate([defaultRoute]).then().catch(ex => console.log(ex));
      return true;
    }
  }
}
