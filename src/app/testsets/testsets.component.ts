import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { mergeMap } from 'rxjs/operators';
import { ProjectService, CycleService, NavigatorService, TestSetService, TestSetExecutionService } from "../_services";
import { TestSet, TestSetExecution } from '../_models';

@Component({
  selector: 'sprova-testsets',
  templateUrl: './testsets.component.html',
  styleUrls: ['./testsets.component.scss']
})
export class TestSetsComponent implements OnInit {
  cycleModel: any;
  testSetModel: any;
  loading = true;
  projectId: string;
  cycleId: string;

  constructor(public route: ActivatedRoute,
    public projectService: ProjectService,
    public cycleService: CycleService,
    public testSetsService: TestSetService,
    public navigatorService: NavigatorService,
    public testSetExecutionService: TestSetExecutionService
    ) { }

  ngOnInit() {
    this.route
      .params
      .subscribe(params => {
        this.projectId = params.projectId;
        this.cycleId = params.cycleId;
        this.cycleService.fetchOne(this.cycleId).pipe(mergeMap(data => {
          this.cycleModel = data;
          return this.testSetsService.listModelsByFilter<TestSet[]>({ cycleId: this.cycleId }, 0, 0);
        })).subscribe(data  => {
          this.testSetModel = data;
          this.loading = false;
        });

      });
  }

}
