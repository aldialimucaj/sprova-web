import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ProjectDetailsComponent } from './project-details.component';
import { ClarityModule } from '@clr/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { ProjectService, NavigatorService, AuthenticationService, CycleService, TestCaseService } from '../../_services';

import { MomentModule } from 'ngx-moment';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MockQueryableService, MockAuthenticationService } from '../../_utils';


describe('ProjectDetailsComponent', () => {
  let component: ProjectDetailsComponent;
  let fixture: ComponentFixture<ProjectDetailsComponent>;

  beforeEach(async(() => {
   TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ProjectDetailsComponent],
      providers: [
        ProjectService,
        NavigatorService,
        CycleService,
        { provide: CycleService, useClass: MockQueryableService },      
        { provide: NavigatorService, useClass: MockQueryableService },      
        { provide: ProjectService, useClass: MockQueryableService },      
        { provide: TestCaseService, useClass: MockQueryableService },      
        { provide: AuthenticationService, useClass: MockAuthenticationService }
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
    fixture = TestBed.createComponent(ProjectDetailsComponent);
    component = fixture.componentInstance;
    component.model = {};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
