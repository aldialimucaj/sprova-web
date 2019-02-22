import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

import { CycleService, TestSetExecutionService, NavigatorService, ExecutionService, AuthenticationService } from '../../_services/index';

import { ExecutionSingleComponent } from './execution-single.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MockQueryableService } from '../../_utils';

describe('ExecutionSingleComponent', () => {
  let component: ExecutionSingleComponent;
  let fixture: ComponentFixture<ExecutionSingleComponent>;
  let executionService: ExecutionService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [RouterTestingModule, HttpClientModule],
      providers: [
        { provide: ExecutionService, useClass: MockQueryableService },
        { provide: CycleService, useClass: MockQueryableService },
        { provide: TestSetExecutionService, useClass: MockQueryableService },
        NavigatorService, AuthenticationService],
      declarations: [ExecutionSingleComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    executionService = TestBed.get(ExecutionService);
    executionService['_testData'] = { data: {} }
    fixture = TestBed.createComponent(ExecutionSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    executionService['_testData'] = { data: {} }
    expect(component).toBeTruthy();
  });
});
