import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ExecutionDetailsComponent } from './execution-details.component';
import { ClarityModule } from '@clr/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { ExecutionService, NavigatorService, AuthenticationService } from '../../_services';

import { MomentModule } from 'ngx-moment';
import { NO_ERRORS_SCHEMA } from '@angular/core';


describe('ExecutionDetailsComponent', () => {
  let component: ExecutionDetailsComponent;
  let fixture: ComponentFixture<ExecutionDetailsComponent>;

  beforeEach(async(() => {
   TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ExecutionDetailsComponent],
      providers: [
        ExecutionService,
        NavigatorService,
        AuthenticationService
      ],
      imports: [
        HttpClientModule,
        RouterTestingModule,
        MomentModule,
        ClarityModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExecutionDetailsComponent);
    component = fixture.componentInstance;
    component.model = {};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
