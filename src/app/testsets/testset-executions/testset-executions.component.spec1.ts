import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestSetExecutionsComponent } from './testset-executions.component';

describe('TestSetExecutionsComponent', () => {
  let component: TestSetExecutionsComponent;
  let fixture: ComponentFixture<TestSetExecutionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestSetExecutionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestSetExecutionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
