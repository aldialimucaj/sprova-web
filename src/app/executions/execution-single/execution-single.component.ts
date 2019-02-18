import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { mergeMap, map } from 'rxjs/operators';
import { CycleService, TestSetExecutionService, NavigatorService, ExecutionService, TestSetService, ArtifactService } from '../../_services/index';
import { Cycle, Execution } from '../../_models';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'sprova-execution-single',
  templateUrl: './execution-single.component.html',
  styleUrls: ['./execution-single.component.scss']
})
export class ExecutionSingleComponent implements OnInit {
  model: Execution;
  cycle: Cycle;

  projectId: string;
  cycleId: string;
  testCaseId: string;
  executionId: string;

  loading = true;

  constructor(
    private route: ActivatedRoute,
    private cycleService: CycleService,
    private executionService: ExecutionService,
    private navigatorService: NavigatorService
  ) { }

  ngOnInit() {
    combineLatest(this.route.params, this.route.queryParams)
      .pipe(map(results => ({ params: results[0], query: results[1] })))
      .subscribe(route => {
        this.projectId = route.params.projectId;
        this.cycleId = route.params.cycleId;
        this.testCaseId = route.params.testCaseId;
        this.executionId = route.query.executionId;

        this.getExecution(this.executionId).pipe(mergeMap(data => {
          this.executionId = data._id;
          this.model = data;
          this.loading = false;
          return this.cycleService.fetchOne(this.cycleId);
        })).subscribe(data => {
          this.cycle = data;
        });
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

  goToCycle() {
    this.navigatorService.openCycle(this.projectId, this.cycleId);
  }

  goToNextTest() {
    const currentIndex = this.testCaseIndex(this.testCaseId);
    if (currentIndex < this.testCaseLength - 1) {
      const nextTextCaseId = this.cycle.testCases[currentIndex + 1];
      this.navigatorService.executeTestCase(this.projectId, this.cycleId, nextTextCaseId);
    }
  }

  goToPreviousTest() {
    const currentIndex = this.testCaseIndex(this.testCaseId);
    if (currentIndex > 0) {
      const previousTextCaseId = this.cycle.testCases[currentIndex - 1];
      this.navigatorService.executeTestCase(this.projectId, this.cycleId, previousTextCaseId);
    }
  }

  hasNextTest() {
    return this.testCaseIndex(this.testCaseId) < this.testCaseLength - 1;
  }

  hasPreviousTest() {
    return this.testCaseIndex(this.testCaseId) > 0;
  }

  testCaseIndex(id: string) {
    return this.cycle.testCases.indexOf(id);
  }

  get testCaseLength() {
    return this.cycle.testCases.length;
  }
}
