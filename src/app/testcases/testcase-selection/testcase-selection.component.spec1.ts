import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientModule } from "@angular/common/http";
import { ClarityModule } from '@clr/angular';
import { RouterTestingModule } from '@angular/router/testing';

import { TestcaseSelectionComponent } from './testcase-selection.component';
import { NodeComponent } from "../testcase-treeview/node/node.component";

describe('TestcaseSelectionComponent', () => {
  let component: TestcaseSelectionComponent;
  let fixture: ComponentFixture<TestcaseSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestcaseSelectionComponent, NodeComponent ],
      imports: [
        HttpClientModule,
        RouterTestingModule,
        ClarityModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestcaseSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
