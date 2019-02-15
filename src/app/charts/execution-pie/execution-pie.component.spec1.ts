import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutionPieComponent } from './execution-pie.component';

describe('ExecutionPieComponent', () => {
  let component: ExecutionPieComponent;
  let fixture: ComponentFixture<ExecutionPieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExecutionPieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExecutionPieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
