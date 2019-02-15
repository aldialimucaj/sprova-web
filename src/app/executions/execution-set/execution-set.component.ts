import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { mergeMap, map } from 'rxjs/operators';
import { CycleService, TestSetExecutionService, NavigatorService, ExecutionService, TestSetService, ArtifactService } from '../../_services/index';
import { Cycle, Execution } from '../../_models';
import { combineLatest } from 'rxjs';


@Component({
  selector: 'app-execution-set',
  templateUrl: './execution-set.component.html',
  styleUrls: ['./execution-set.component.scss']
})
export class ExecutionSetComponent implements OnInit {
  model: Execution;
  cycle: Cycle;

  projectId: string;
  cycleId: string;
  testSetId: string;
  testCaseId: string;
  testSetExecutionId: string;
  executionId: string;

  hasNextTest: boolean;

  loading = true;

  constructor(
    private route: ActivatedRoute,
    private cycleService: CycleService,
    private executionService: ExecutionService,
    private executionSetService: TestSetExecutionService,
    private navigatorService: NavigatorService
  ) { }

  ngOnInit() {
    combineLatest(this.route.params, this.route.queryParams)
      .pipe(map(results => ({ params: results[0], query: results[1] })))
      .subscribe(route => {
        this.projectId = route.params.projectId;
        this.cycleId = route.params.cycleId;
        this.testCaseId = route.params.testCaseId;
        this.testSetId = route.params.testSetId;
        this.testSetExecutionId = route.params.testSetExecutionId;
        this.executionId = route.query.executionId;

        this.goToNextTest();
      });
  }

  /**
   * Execution can start from an existing object or we create a new one
   * 
   * @param id Execution ID
   */
  getExecution(id) {
    if (id) {
      return this.executionService.fetchOne(id);
    } else {
      return this.executionService.push({
        testCaseId: this.testCaseId,
        cycleId: this.cycleId,
        executionId: this.executionId
      }).pipe(map(data => data.data));
    }
  }

  goToTestSet() {
    this.navigatorService.openTestSet(this.projectId, this.cycleId, this.testSetId);
  }

  goToNextTest() {
    this.executionSetService.fetchNextPending(this.testSetExecutionId).subscribe(data => {
      this.model = data;
      this.checkNextTest();
    });
  }

  checkNextTest() {
    this.executionSetService.hasNextPending(this.testSetExecutionId).subscribe(data => {
      this.hasNextTest = !!data._id;
    });
  }

}
