import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutionsGridComponent } from './executions-grid.component';

describe('ExecutionsGridComponent', () => {
  let component: ExecutionsGridComponent;
  let fixture: ComponentFixture<ExecutionsGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExecutionsGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExecutionsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
