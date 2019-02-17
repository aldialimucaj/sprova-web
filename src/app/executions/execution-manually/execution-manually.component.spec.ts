import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ClarityModule } from '@clr/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ExecutionService, ArtifactService, NavigatorService, AuthenticationService, CycleService, TestCaseService } from '../../_services';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ExecutionManuallyComponent } from './execution-manually.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MockAuthenticationService, MockQueryableService } from '../../_utils';

describe('ExecutionManuallyComponent', () => {
  let component: ExecutionManuallyComponent;
  let fixture: ComponentFixture<ExecutionManuallyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ExecutionManuallyComponent],
      providers: [
        { provide: ExecutionService, useClass: MockQueryableService },
        { provide: ArtifactService, useClass: MockQueryableService },
        { provide: NavigatorService, useClass: MockQueryableService },
        { provide: CycleService, useClass: MockQueryableService },
        { provide: TestCaseService, useClass: MockQueryableService },
        { provide: AuthenticationService, useClass: MockAuthenticationService }
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        ClarityModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExecutionManuallyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
