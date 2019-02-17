import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { TestCaseDetailsComponent } from './testcase-details.component';
import { ClarityModule } from '@clr/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { TestCaseService, ArtifactService, ExecutionService, NavigatorService, AuthenticationService } from '../../_services';

import { MomentModule } from 'ngx-moment';
import { NO_ERRORS_SCHEMA } from '@angular/core';


describe('TestCaseDetailsComponent', () => {
  let component: TestCaseDetailsComponent;
  let fixture: ComponentFixture<TestCaseDetailsComponent>;

  beforeEach(async(() => {
   TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [TestCaseDetailsComponent],
      providers: [
        TestCaseService,
        ArtifactService,
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
    fixture = TestBed.createComponent(TestCaseDetailsComponent);
    component = fixture.componentInstance;
    component.model = {};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
