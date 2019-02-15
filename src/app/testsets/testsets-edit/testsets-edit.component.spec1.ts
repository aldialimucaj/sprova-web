import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestSetsEditComponent } from './testsets-edit.component';

describe('TestSetsEditComponent', () => {
  let component: TestSetsEditComponent;
  let fixture: ComponentFixture<TestSetsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestSetsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestSetsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
