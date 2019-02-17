import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

import { mergeMap, map } from 'rxjs/operators';
import { CycleService, TestSetExecutionService, NavigatorService, ExecutionService, AuthenticationService} from '../../_services/index';
import { Cycle, Execution } from '../../_models';



import { ExecutionSetComponent } from './execution-set.component';

describe('ExecutionSetComponent', () => {
  let component: ExecutionSetComponent;
  let fixture: ComponentFixture<ExecutionSetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [RouterTestingModule, HttpClientModule],
      providers: [CycleService, TestSetExecutionService, NavigatorService, ExecutionService, AuthenticationService],
      declarations: [ExecutionSetComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExecutionSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
