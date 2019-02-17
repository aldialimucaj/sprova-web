import { Component, OnInit } from '@angular/core';
import { CycleService, TestSetExecutionService, NavigatorService, ExecutionService, TestSetService } from '../../_services/index';
import { Execution, TestCase, Project, ExecutionType, ExecutionStatus } from '../../_models';
import { ViewType } from '../../testcases/testcases-grid/testcases-grid.component';
import { ActivatedRoute } from '@angular/router';
import { mergeMap } from 'rxjs/operators';
import { find } from 'lodash';

@Component({
  selector: 'sprova-testset-executions',
  templateUrl: './testset-executions.component.html',
  styleUrls: ['./testset-executions.component.scss']
})
export class TestSetExecutionsComponent implements OnInit {

  // models
  model: any;
  executions: Execution[];

  // IDs
  cycleId: string;
  projectId: string;
  testSetId: string;
  testSetExecutionId: string;

  // aux
  type: string;
  loading = true;
  testCasesLoading = true;
  viewType: ViewType = ViewType.Execute;

  constructor(
    private cycleService: CycleService,
    private route: ActivatedRoute,
    private navigatorService: NavigatorService,
    private testSetExecutionService: TestSetExecutionService,
    private testSetService: TestSetService,
    private executionService: ExecutionService
  ) { }

  ngOnInit() {
    this.route
      .params
      .subscribe(params => {
        this.cycleId = params.cycleId;
        this.projectId = params.projectId;
        this.testSetId = null; // not known at this point
        this.testSetExecutionId = params.testSetExecutionId;

        this.type = params.type;

        if (this.testSetExecutionId) {
          this.testSetExecutionService.fetchOne(this.testSetExecutionId).pipe(mergeMap(data => {
            this.model = data;
            this.testSetId = this.model.testSetId;
            return this.executionService.listModelsByFilter<Execution[]>({ testSetExecutionId: this.testSetExecutionId });
          })).subscribe(data => {
            this.executions = data;
            this.loading = false;
          });
        } else {
          this.loading = false;
        }
      });
  }

  delete(id) {
    if (confirm('Are you sure you want to delete execution set for ' + this.model.title)) {
      this.testSetExecutionService.remove(id).subscribe(
        data => {
          this.navigatorService.openTestSet(this.projectId, this.cycleId, this.testSetId);
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  continueExecution() {
    this.navigatorService.executeTestSet(this.projectId, this.cycleId, this.testSetId, this.testSetExecutionId);
  }

  get nextPending() {
    return find(this.executions, { status: ExecutionStatus.Pending })
  }
}
