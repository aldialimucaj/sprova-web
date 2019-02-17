import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestSetsDetailsComponent } from './testsets-details.component';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ProjectService, CycleService, TestSetService, TestSetExecutionService, NavigatorService, ExecutionService, TestCaseService, AuthenticationService} from '../../_services/index';
import { ClarityModule } from '@clr/angular';
import { MomentModule } from 'ngx-moment';



describe('TestSetsDetailsComponent', () => {
  let component: TestSetsDetailsComponent;
  let fixture: ComponentFixture<TestSetsDetailsComponent>;

  beforeEach(async(() => {
   TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [RouterTestingModule, ClarityModule, HttpClientModule, MomentModule],
      providers: [ProjectService, CycleService, TestSetService, TestSetExecutionService, NavigatorService, ExecutionService, TestCaseService, AuthenticationService],
      declarations: [ TestSetsDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestSetsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
