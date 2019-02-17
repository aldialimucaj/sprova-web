import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutionPieComponent } from './execution-pie.component';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ProjectService, CycleService, TestSetService, TestSetExecutionService, NavigatorService, ExecutionService, AuthenticationService, TestCaseService} from '../../_services/index';
import { ClarityModule } from '@clr/angular';



describe('ExecutionPieComponent', () => {
  let component: ExecutionPieComponent;
  let fixture: ComponentFixture<ExecutionPieComponent>;

  beforeEach(async(() => {
   TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [RouterTestingModule, ClarityModule, HttpClientModule],
      providers: [ProjectService, CycleService, TestSetService, TestCaseService, TestSetExecutionService, NavigatorService, ExecutionService, AuthenticationService],
      declarations: [ ExecutionPieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExecutionPieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
