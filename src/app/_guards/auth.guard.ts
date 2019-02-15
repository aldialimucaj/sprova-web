import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

import { environment } from '../../environments/environment';

@Injectable()
export class AuthGuard implements CanActivate {
  environment: any;
  jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private router: Router) {
    this.environment = environment;
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // TODO: also check if jwt token is valid
    let valid = false;
    let token = localStorage.getItem(environment.JWT_TOKEN_NAME);
    if (!token) {
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return valid;
    }

    valid = !this.jwtHelper.isTokenExpired(token);
    let jsonToken = this.jwtHelper.decodeToken(token);
    
    if (!valid) {
      localStorage.removeItem(environment.JWT_TOKEN_NAME);
      localStorage.removeItem(environment.JWT_JSON_TOKEN_NAME);
      // not logged in so redirect to login page with the return url
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    }
    return valid;
  }
}
