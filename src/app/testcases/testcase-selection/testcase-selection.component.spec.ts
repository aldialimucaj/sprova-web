import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestcaseSelectionComponent } from './testcase-selection.component';
import { NodeComponent } from "../testcase-treeview/node/node.component";

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ProjectService, CycleService, TestSetService, TestCaseService, NavigatorService, ExecutionService, AuthenticationService} from '../../_services/index';
import { ClarityModule } from '@clr/angular';



describe('TestcaseSelectionComponent', () => {
  let component: TestcaseSelectionComponent;
  let fixture: ComponentFixture<TestcaseSelectionComponent>;

  beforeEach(async(() => {
   TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [RouterTestingModule, ClarityModule, HttpClientModule],
      providers: [ProjectService, CycleService, TestSetService, TestCaseService, NavigatorService, ExecutionService, AuthenticationService],
      declarations: [ TestcaseSelectionComponent, NodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestcaseSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
