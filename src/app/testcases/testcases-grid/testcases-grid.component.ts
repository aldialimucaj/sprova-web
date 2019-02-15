import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { TestCase } from 'app/_models';
import { TestCaseService } from 'app/_services';
import { ActivatedRoute } from '@angular/router';
import { findIndex } from 'lodash';

@Component({
  selector: 'sprova-testcases-grid',
  templateUrl: './testcases-grid.component.html',
  styleUrls: ['./testcases-grid.component.scss']
})
export class TestcasesGridComponent implements OnInit {
  @Input() model: TestCase[];
  @Input() existingModel: TestCase[];
  @Input() loading = true;
  @Input() viewType: ViewType = ViewType.Preview;
  @Output() onTestCaseAdded = new EventEmitter<any>();
  @Output() onTestCaseRemoved = new EventEmitter<any>();
  vType = ViewType;

  id: string;
  cycleId: string;
  projectId: string;

  constructor(private route: ActivatedRoute,
    public testCaseService: TestCaseService) { }

  ngOnInit() {
    this.route
      .params
      .subscribe(params => {
        this.projectId = params.projectId;
        if (params.cycleId) {
          this.cycleId = params.cycleId;
        }
      });
  }

  addTestCase(testcase) {
    this.onTestCaseAdded.emit(testcase);
  }

  removeTestCase(testcase) {
    this.onTestCaseRemoved.emit(testcase);
  }

  canAdd(testCaseId) {
    return findIndex(this.existingModel, mId => mId === testCaseId) === -1;
  }

  canRemove(testCaseId) {
    return findIndex(this.existingModel, mId => mId === testCaseId) !== -1;
  }
}

export enum ViewType {
  Preview = 1,
  Execute,
  EditCycle,
  EditSuite
}
