import { Injectable, Injector } from '@angular/core';
import {
    HttpClient,
    HttpRequest,
    HttpResponse,
    HttpErrorResponse,
    HttpHandler,
    HttpEvent,
    HttpHeaders,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

import { map, tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationService {
    headers = new HttpHeaders({
        'Content-Type': 'application/json'
    });
    jwtHelper: JwtHelperService = new JwtHelperService();
    constructor(private http: HttpClient) {
    }

    getToken() {
        return localStorage.getItem(environment.JWT_TOKEN_NAME);
    }

    login(username: string, password: string) {
        return this.http.post(
            environment.API_URL + '/authenticate',
            JSON.stringify({ username: username, password: password }),
            { headers: this.headers }
        ).pipe(
            map((authResponse: Response) => {
                // login successful if there's a jwt token in the response
                let token = authResponse['token'];
                if (authResponse && token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem(environment.JWT_TOKEN_NAME, token);
                    localStorage.setItem(environment.JWT_JSON_TOKEN_NAME, JSON.stringify(this.jwtHelper.decodeToken(token)));
                }
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem(environment.JWT_TOKEN_NAME);
        localStorage.removeItem(environment.JWT_JSON_TOKEN_NAME);
    }

    isLoggedIn() {
        let result = false;
        let token = localStorage.getItem(environment.JWT_TOKEN_NAME);
        // check token exists
        if (token) {
            // TODO check token is still valid
            result = true;
        }
        return result;
    }
}


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private injector: Injector) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Get the auth header from the service.
        const auth = this.injector.get(AuthenticationService);
        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${auth.getToken()}`
            }
        });
        return next.handle(request);
    }
}

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private router: Router) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(request).pipe(tap(
            (event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    // do stuff with response if you want
                }
            }, (err: any) => {
                if (err instanceof HttpErrorResponse) {
                    if (err.status === 401) {
                        localStorage.removeItem(environment.JWT_TOKEN_NAME);
                        localStorage.removeItem(environment.JWT_JSON_TOKEN_NAME);
                        // not logged in so redirect to login page with the return url
                        this.router.navigate(['/login']);
                    }
                }
            }));
    }
}
