import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutionsGridComponent } from './executions-grid.component';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ProjectService, CycleService, TestSetService, TestSetExecutionService, NavigatorService, ExecutionService, AuthenticationService } from '../../_services/index';
import { ClarityModule } from '@clr/angular';
import { MomentModule } from 'ngx-moment';


describe('ExecutionsGridComponent', () => {
  let component: ExecutionsGridComponent;
  let fixture: ComponentFixture<ExecutionsGridComponent>;
  let executionService: ExecutionService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [RouterTestingModule, ClarityModule, HttpClientModule, MomentModule],
      providers: [ProjectService, CycleService, TestSetService, TestSetExecutionService, NavigatorService, ExecutionService, AuthenticationService],
      declarations: [ExecutionsGridComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    executionService = TestBed.get(ExecutionService);
    executionService['_testData'] = { data: {} }
    fixture = TestBed.createComponent(ExecutionsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
