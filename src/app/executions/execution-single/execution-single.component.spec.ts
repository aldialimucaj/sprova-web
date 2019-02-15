import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

import { CycleService, TestSetExecutionService, NavigatorService, ExecutionService, AuthenticationService} from '../../_services/index';

import { ExecutionSingleComponent } from './execution-single.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ExecutionSingleComponent', () => {
  let component: ExecutionSingleComponent;
  let fixture: ComponentFixture<ExecutionSingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [RouterTestingModule, HttpClientModule],
      providers: [CycleService, TestSetExecutionService, NavigatorService, ExecutionService, AuthenticationService],
      declarations: [ ExecutionSingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExecutionSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
