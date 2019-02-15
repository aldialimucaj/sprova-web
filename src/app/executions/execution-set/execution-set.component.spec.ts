import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutionSetComponent } from './execution-set.component';

describe('ExecutionSetComponent', () => {
  let component: ExecutionSetComponent;
  let fixture: ComponentFixture<ExecutionSetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExecutionSetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExecutionSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
