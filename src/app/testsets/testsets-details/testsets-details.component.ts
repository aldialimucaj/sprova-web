import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TestSet, TestCase, TestSetExecution } from '../../_models';
import { TestCaseService, TestSetService, TestSetExecutionService, CycleService, NavigatorService, ProjectService, ExecutionService } from '../../_services';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'sprova-testsets-details',
  templateUrl: './testsets-details.component.html',
  styleUrls: ['./testsets-details.component.scss']
})
export class TestSetsDetailsComponent implements OnInit {
  public model: TestSet;
  public testCases: TestCase[];
  public testSetExecutions: TestSetExecution[];

  testSetId: string;
  cycleId: string;
  projectId: string;

  loading = true;

  constructor(
    public cycleService: CycleService,
    public testcaseService: TestCaseService,
    public testSetService: TestSetService,
    private route: ActivatedRoute,
    public executionService: ExecutionService,
    public testSetExecutionService: TestSetExecutionService,
    private navigatorService: NavigatorService
  ) { }

  ngOnInit() {
    this.route
      .params
      .subscribe(params => {
        this.projectId = params.projectId;
        this.testSetId = params.testSetId;
        this.cycleId = params.cycleId;
        if (this.testSetId) {
          this.testSetService.fetchOne(this.testSetId)
            .pipe<TestSetExecution[]>(mergeMap(data => {
              this.model = data;
              return this.testSetExecutionService.listModelsByFilter<TestSetExecution[]>({ 'testSetId': this.testSetId }, 0, 0);
            })).pipe<TestCase[]>(mergeMap(executions => {
              this.testSetExecutions = executions;
              return this.testSetService.fetchTestCases<TestCase[]>(this.testSetId);
            })).subscribe(testCaseData => {
              this.testCases = testCaseData;
              this.loading = false;
            })
        } else {
          this.loading = false;
        }
      });
  }

  runManually() {
    if (this.testCases.length > 0) {
      this.testSetExecutionService.push(new TestSetExecution(this.model.title, this.model.description, this.testSetId, this.cycleId))
        .subscribe(testSetExecution => {
          this.navigatorService.executeTestSet(this.projectId, this.cycleId, this.model._id, testSetExecution._id);
        });
    } else {
      console.log('No test cases in this set');
    }
  }

}
