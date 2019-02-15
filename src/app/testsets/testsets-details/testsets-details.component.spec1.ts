import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestSetsDetailsComponent } from './testsets-details.component';

describe('TestSetsDetailsComponent', () => {
  let component: TestSetsDetailsComponent;
  let fixture: ComponentFixture<TestSetsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestSetsDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestSetsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
