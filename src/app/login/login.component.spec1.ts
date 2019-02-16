import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Injectable, ReflectiveInjector, NO_ERRORS_SCHEMA } from '@angular/core';
import { Observable } from "rxjs";
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services/index';
import { ClarityModule } from '@clr/angular';
import { BaseRequestOptions, ConnectionBackend, RequestOptions, Http } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { HttpClientModule } from '@angular/common/http';
@Injectable()
export class MockAuthenticationService extends AuthenticationService {
  login(username: string, password: string) {
    return new Observable<void>(observer => observer.complete());
  }
}


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
   TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [LoginComponent],
      providers: [
        Http,
        { provide: ConnectionBackend, useClass: MockBackend },
        { provide: RequestOptions, useClass: BaseRequestOptions },
        { provide: AuthenticationService, useClass: MockAuthenticationService },
      ],
      imports: [
        HttpClientModule,
        FormsModule,
        RouterTestingModule,
        ClarityModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
