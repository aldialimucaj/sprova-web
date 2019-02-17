import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TestCaseService, NavigatorService, ExecutionService, ArtifactService } from '../../_services';

@Component({
  selector: 'sprova-testcase-details',
  templateUrl: './testcase-details.component.html',
  styleUrls: ['./testcase-details.component.scss']
})
export class TestCaseDetailsComponent implements OnInit {
  model: any;
  executionsModel: any;
  testCaseId: string;
  cycleId: string;
  projectId: string;
  type: string;
  loading = true;
  executionsLoading = true;

  constructor(
    public testcaseService: TestCaseService,
    public executionService: ExecutionService,
    public artifactService: ArtifactService,
    private route: ActivatedRoute,
    private navigatorService: NavigatorService,
  ) { }

  ngOnInit() {
    this.route
      .params
      .subscribe(params => {
        this.projectId = params.projectId;
        this.testCaseId = params.testCaseId;
        this.cycleId = params.cycleId;
        this.type = params.type;
        if (this.testCaseId) {
          this.testcaseService.fetchOne(this.testCaseId).subscribe(data => {
            this.model = data;
            this.loading = false;
          });
        }
        // fetch execution history for cycle
        if (this.cycleId) {
          this.executionService.listModelsByFilter({ testCaseId: this.testCaseId, cycleId: this.cycleId }, 0, 0).subscribe(data => {
            this.executionsModel = data;
            this.executionsLoading = false;
          });
        }
      });
  }

  dowload(artifact) {
    this.artifactService.downloadArtifact(artifact._id);
  }

  delete(id) {
    if (confirm('Are you sure you want to delete ' + this.model.name)) {
      this.testcaseService.remove(id).subscribe(
        data => {
          this.model = data;
          // this.navigatorService.showTestCases();
        },
        error => {
          console.log(error);
        }
      );
    }
  }

}
