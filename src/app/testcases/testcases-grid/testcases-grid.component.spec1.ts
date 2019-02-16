import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectService, NavigatorService, AuthenticationService, CycleService, TestCaseService } from "../../_services";
import { TestcasesGridComponent } from './testcases-grid.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ClarityModule } from '@clr/angular';
import { MockQueryableService } from "../../_utils";
import { NO_ERRORS_SCHEMA } from '@angular/core';
describe('TestcasesGridComponent', () => {
  let component: TestcasesGridComponent;
  let fixture: ComponentFixture<TestcasesGridComponent>;
  let testCaseService: TestCaseService;
  const defaultData = [];

  beforeEach(async(() => {
   TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ TestcasesGridComponent ],
       providers: [
        { provide: CycleService, useClass: MockQueryableService },
        { provide: NavigatorService, useClass: MockQueryableService },
        { provide: TestCaseService, useClass: MockQueryableService }
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
    fixture = TestBed.createComponent(TestcasesGridComponent);
    component = fixture.componentInstance;
    testCaseService = TestBed.get(TestCaseService);
    
  });

  it('should create', () => {
    testCaseService._testData = defaultData;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
