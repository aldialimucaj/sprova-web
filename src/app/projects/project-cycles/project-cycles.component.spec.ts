import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCyclesComponent } from './project-cycles.component';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ProjectService, CycleService, TestSetService, TestSetExecutionService, NavigatorService, ExecutionService, AuthenticationService } from '../../_services/index';
import { ClarityModule } from '@clr/angular';
import { MockQueryableService } from '../../_utils';


describe('ProjectCyclesComponent', () => {
  let component: ProjectCyclesComponent;
  let fixture: ComponentFixture<ProjectCyclesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [RouterTestingModule, ClarityModule, HttpClientModule],
      providers: [
        { provide: CycleService, useClass: MockQueryableService },

        ProjectService, CycleService, TestSetService, TestSetExecutionService, NavigatorService, ExecutionService, AuthenticationService],
      declarations: [ProjectCyclesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectCyclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
