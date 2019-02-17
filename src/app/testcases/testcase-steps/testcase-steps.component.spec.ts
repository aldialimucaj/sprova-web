import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestcaseStepsComponent } from './testcase-steps.component';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ProjectService, CycleService, TestSetService, NavigatorService, ExecutionService, AuthenticationService, TestCaseService} from '../../_services/index';
import { ClarityModule } from '@clr/angular';



describe('TestcaseStepsComponent', () => {
  let component: TestcaseStepsComponent;
  let fixture: ComponentFixture<TestcaseStepsComponent>;

  beforeEach(async(() => {
   TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [RouterTestingModule, ClarityModule, HttpClientModule],
      providers: [ProjectService, CycleService, TestSetService, TestCaseService, NavigatorService, ExecutionService, AuthenticationService],
      declarations: [ TestcaseStepsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestcaseStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
