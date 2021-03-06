import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Injectable, ReflectiveInjector } from '@angular/core';
import { Router } from '@angular/router';
import { NavigatorService } from './navigator.service';
import { AuthenticationService } from './authentication.service';
import { BaseRequestOptions, ConnectionBackend, Http, RequestOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Observable } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { ClarityModule } from '@clr/angular';
import { MockAuthenticationService } from '../_utils';

describe('NavigatorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NavigatorService, AuthenticationService, Http,
        { provide: ConnectionBackend, useClass: MockBackend },
        { provide: RequestOptions, useClass: BaseRequestOptions },
        { provide: AuthenticationService, useClass: MockAuthenticationService }],
      imports: [RouterTestingModule, ClarityModule, HttpClientModule]
    });
  });

  it('should ...', inject([NavigatorService], (service: NavigatorService) => {
    expect(service).toBeTruthy();
  }));
});
