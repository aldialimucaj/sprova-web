import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TestCaseService } from '../../_services';
import { TestCase } from '../../_models';

@Component({
  selector: 'sprova-testcase-steps',
  templateUrl: './testcase-steps.component.html',
  styleUrls: ['./testcase-steps.component.scss']
})
export class TestcaseStepsComponent implements OnInit {

  @Input() steps;
  @Input() testCaseId;
  constructor(
    private route: ActivatedRoute,
    public testCaseService: TestCaseService) {


  }

  ngOnInit() {
    if (!this.steps && this.testCaseId) {
      this.testCaseService.fetchWithParent(this.testCaseId).subscribe(testCaseData => {
        this.steps = [];
        let currentTest = testCaseData.parent;
        while (currentTest) {
          this.steps = currentTest.testSteps.concat(this.steps);
          currentTest = currentTest.parent;
        }
      })
    }
  }

}
