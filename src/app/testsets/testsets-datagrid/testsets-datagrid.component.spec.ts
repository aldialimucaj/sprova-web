import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CycleService, TestSetExecutionService, TestSetService, ProjectService, NavigatorService, ExecutionService, AuthenticationService } from '../../_services/index';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { TestsetsDatagridComponent } from './testsets-datagrid.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ClarityModule } from '@clr/angular';

import { GeneralMockService } from "../../_services/general-mock.service";

describe('TestsetsDatagridComponent', () => {
  let component: TestsetsDatagridComponent;
  let fixture: ComponentFixture<TestsetsDatagridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [RouterTestingModule, HttpClientModule, ClarityModule],
      providers: [
        { provide: TestSetService, useClass: GeneralMockService },
        CycleService, TestSetExecutionService, TestSetService, ProjectService, NavigatorService, ExecutionService, AuthenticationService],
      declarations: [TestsetsDatagridComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestsetsDatagridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
