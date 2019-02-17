import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService, CycleService, NavigatorService, TestSetService, TestSetExecutionService } from '../../_services';
import { TestSet, TestSetExecution } from '../../_models';

@Component({
  selector: 'sprova-testsets-datagrid',
  templateUrl: './testsets-datagrid.component.html',
  styleUrls: ['./testsets-datagrid.component.css']
})
export class TestsetsDatagridComponent implements OnInit {
  @Input() model: TestSet[];
  @Input() cycleId: string;
  @Input() projectId: string;

  testSets;
  loading = true;

  constructor(public route: ActivatedRoute,
    public projectService: ProjectService,
    public cycleService: CycleService,
    public testSetsService: TestSetService,
    public navigatorService: NavigatorService,
    public testSetExecutionService: TestSetExecutionService) { }

  ngOnInit() {
    if (!this.model && this.cycleId) {
      this.testSets = this.testSetsService.listModelsByFilter<TestSet[]>({ cycleId: this.cycleId }, 0, 0);
    } else {
      this.testSets = this.model;
    }
    this.loading = false;
  }


  newTestSetExecution(testSet: TestSet) {
    if (testSet.testCases.length > 0) {
      this.testSetExecutionService.push(new TestSetExecution(testSet.title, testSet.description, testSet._id, this.cycleId))
        .subscribe(testSetExecution => {
          this.navigatorService.executeTestSet(this.projectId, this.cycleId, testSet._id, testSetExecution._id);
        });
    } else {
      console.log('No test cases in this set');
    }
  }
}
