import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestSetsEditComponent } from './testsets-edit.component';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ProjectService, CycleService, TestSetService, TestSetExecutionService, NavigatorService, ExecutionService, AuthenticationService} from '../../_services/index';
import { ClarityModule } from '@clr/angular';



describe('TestSetsEditComponent', () => {
  let component: TestSetsEditComponent;
  let fixture: ComponentFixture<TestSetsEditComponent>;

  beforeEach(async(() => {
   TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [RouterTestingModule, ClarityModule, HttpClientModule],
      providers: [ProjectService, CycleService, TestSetService, TestSetExecutionService, NavigatorService, ExecutionService, AuthenticationService],
      declarations: [ TestSetsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestSetsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
