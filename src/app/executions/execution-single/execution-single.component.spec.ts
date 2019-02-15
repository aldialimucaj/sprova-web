import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutionSingleComponent } from './execution-single.component';

describe('ExecutionSingleComponent', () => {
  let component: ExecutionSingleComponent;
  let fixture: ComponentFixture<ExecutionSingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExecutionSingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExecutionSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
