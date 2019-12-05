
/**
 * MC4
 * Santa Cruz - Bolivia
 * project:
 * package:
 * date:    30-01-19
 * author:  fmontero
 **/
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthenticationService} from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthenticationService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const isLogged = this.authService.isLoggedIn();
    if (isLogged) {
      return true;
    } else {
      this.router.navigate(['/authentication/login']);
      return false;
    }
  }
}
