import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestsetsDatagridComponent } from './testsets-datagrid.component';

describe('TestsetsDatagridComponent', () => {
  let component: TestsetsDatagridComponent;
  let fixture: ComponentFixture<TestsetsDatagridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestsetsDatagridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestsetsDatagridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
