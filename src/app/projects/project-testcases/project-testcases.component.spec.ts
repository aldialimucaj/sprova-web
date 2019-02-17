import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTestcasesComponent } from './project-testcases.component';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ProjectService, CycleService, TestSetService, TestCaseService, NavigatorService, ExecutionService, AuthenticationService } from '../../_services/index';
import { ClarityModule } from '@clr/angular';
import { PackageFilterPipe } from './package-filter.pipe';


describe('ProjectTestcasesComponent', () => {
  let component: ProjectTestcasesComponent;
  let fixture: ComponentFixture<ProjectTestcasesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [RouterTestingModule, ClarityModule, HttpClientModule],
      providers: [ProjectService, CycleService, TestSetService, TestCaseService, NavigatorService, ExecutionService, AuthenticationService],
      declarations: [ProjectTestcasesComponent, PackageFilterPipe]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectTestcasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
