import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestcaseStepsComponent } from './testcase-steps.component';

describe('TestcaseStepsComponent', () => {
  let component: TestcaseStepsComponent;
  let fixture: ComponentFixture<TestcaseStepsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestcaseStepsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestcaseStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
