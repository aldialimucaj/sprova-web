import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ClarityModule } from '@clr/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ExecutionService, NavigatorService, AuthenticationService, CycleService, TestCaseService } from '../../_services';

import { MomentModule } from 'ngx-moment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ExecutionManuallyComponent } from './execution-manually.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ExecutionManuallyComponent', () => {
  let component: ExecutionManuallyComponent;
  let fixture: ComponentFixture<ExecutionManuallyComponent>;

  beforeEach(async(() => {
   TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ExecutionManuallyComponent],
      providers: [
        ExecutionService,
        NavigatorService,
        CycleService,
        TestCaseService,
        AuthenticationService
      ],
      imports: [
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        ClarityModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExecutionManuallyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
