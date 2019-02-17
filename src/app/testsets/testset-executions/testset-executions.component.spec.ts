import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestSetExecutionsComponent } from './testset-executions.component';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ProjectService, CycleService, TestSetService, TestSetExecutionService, NavigatorService, ExecutionService, AuthenticationService} from '../../_services/index';
import { ClarityModule } from '@clr/angular';
import { MomentModule } from 'ngx-moment';


describe('TestSetExecutionsComponent', () => {
  let component: TestSetExecutionsComponent;
  let fixture: ComponentFixture<TestSetExecutionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [RouterTestingModule, MomentModule, ClarityModule, HttpClientModule],
      providers: [ProjectService, CycleService, TestSetService, TestSetExecutionService, NavigatorService, ExecutionService, AuthenticationService],
      declarations: [ TestSetExecutionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestSetExecutionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
