import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { mergeMap } from 'rxjs/operators';
import { CycleService, NavigatorService, ProjectService, TestSetService } from '../../_services';
import { TestCaseService } from 'app/_services/testcase.service';
import { TestCase, Project, CycleExtraField, TestSet } from 'app/_models';
import { ViewType } from '../../testcases/testcases-grid/testcases-grid.component';

@Component({
  selector: 'sprova-cycle-details',
  templateUrl: './cycle-details.component.html',
  styleUrls: ['./cycle-details.component.scss']
})
export class CycleDetailsComponent implements OnInit {
  model: any;
  projectModel: Project;
  extraFields: CycleExtraField[];
  cycleId: string;
  projectId: string;
  type: string;
  loading = true;
  testCasesLoading = true;
  testCases: TestCase[];
  testSetModel: TestSet[];
  viewType: ViewType = ViewType.Execute;

  constructor(public cycleService: CycleService,
    private route: ActivatedRoute,
    private navigatorService: NavigatorService,
    public testCaseService: TestCaseService,
    public testSetsService: TestSetService,
    public projectService: ProjectService
  ) { }

  ngOnInit() {
    this.route
      .params
      .subscribe(params => {
        this.cycleId = params.cycleId;
        this.projectId = params.projectId;
        this.type = params.type;
        this.cycleService.fetchOne(this.cycleId).pipe(mergeMap(data => {
          this.model = data;
          this.cycleService.getTestCasesWithStats(this.model._id, 0, 0).subscribe(testCaseData => {
            this.testCases = testCaseData;
            this.testCasesLoading = false;
          });
          return this.testSetsService.listModelsByFilter<TestSet[]>({ cycleId: this.cycleId }, 0, 0);
        }),mergeMap((data) => {
          this.testSetModel = data;
          return this.projectService.getModel(this.model.projectId);
        }

        )).subscribe((data: Project) => {
          this.projectModel = data;
          this.extraFields = this.projectModel.cycleFields;
          this.loading = false;
        });
      });
  }

  clone(id: string) {
    let clone = Object.assign({}, this.model);
    clone.title = `${clone.title}.CLONE`
    this.cycleService.insertModel(clone).subscribe(
      data => {
        let newModelId = data['_id'];
        for(let testSet of this.testSetModel) {
          let cloneTestSet = Object.assign({}, testSet);
          cloneTestSet.cycleId = newModelId;
          this.testSetsService.insertModel(cloneTestSet).subscribe();
        }
        this.cycleService.getModel(newModelId).subscribe(data => {
          this.model = data;
          this.navigatorService.openCycle(this.projectId, this.model._id);
        },
        error => {
          console.log(error);
        })
      },
      error => {
        console.log(error);
      })
  }

  delete(id) {
    if (confirm('Are you sure you want to delete ' + this.model.title)) {
      this.cycleService.remove(id).subscribe(
        data => {
          this.model = data;
          this.navigatorService.showCycles(this.projectId);
        },
        error => {
          console.log(error);
        }
      );
    }
  }

}
