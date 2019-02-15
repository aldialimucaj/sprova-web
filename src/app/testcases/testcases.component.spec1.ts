import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from "@angular/common/http";
import { ClarityModule } from '@clr/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { TestCasesComponent } from './testcases.component';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { TestCaseService, NavigatorService } from "../_services";
import { MockQueryableService, MockNavigatorService } from "../_utils";

describe('TestCasesComponent', () => {
  let component: TestCasesComponent;
  let fixture: ComponentFixture<TestCasesComponent>;
  let testCaseService: TestCaseService;
  const defaultData = [];
  const twoTestCasesData = [{_id:"1", title:"foo"},{_id:"2", title:"bar"}];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestCasesComponent],
      providers: [
        { provide: TestCaseService, useClass: MockQueryableService },
        { provide: NavigatorService, useClass: MockNavigatorService }
      ],
      imports: [
        HttpClientModule,
        RouterTestingModule,
        ClarityModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestCasesComponent);
    component = fixture.componentInstance;
    testCaseService = TestBed.get(TestCaseService);
  });

  it('should create', () => {
    testCaseService._testData = defaultData;
    fixture.detectChanges();    
    expect(component).toBeTruthy();
  });

  it('should list 2 test cases', () => {
    testCaseService._testData = twoTestCasesData;
    fixture.detectChanges();    
    let el = fixture.debugElement.query(By.css('.testcases-datagrid')).nativeElement;
    expect(el.textContent).toContain('foo', 'bar');
  });
});
