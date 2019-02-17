import { Injectable } from '@angular/core';

import { AuthenticationService } from '../../_services';

import { Observable } from 'rxjs';

@Injectable()
export class MockAuthenticationService extends AuthenticationService {
  login(username: string, password: string) {
    return new Observable<void>(observer => observer.complete());
  }
}
