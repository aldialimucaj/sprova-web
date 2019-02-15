import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestSetsComponent } from './testsets.component';

describe('TestSetsComponent', () => {
  let component: TestSetsComponent;
  let fixture: ComponentFixture<TestSetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestSetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestSetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
