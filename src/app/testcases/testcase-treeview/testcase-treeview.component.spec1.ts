import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestcaseTreeviewComponent } from './testcase-treeview.component';

describe('TestcaseTreeviewComponent', () => {
  let component: TestcaseTreeviewComponent;
  let fixture: ComponentFixture<TestcaseTreeviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestcaseTreeviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestcaseTreeviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
