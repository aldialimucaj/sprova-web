import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService, CycleService, NavigatorService, TestCaseService } from "../../_services";
import { TestCase } from '../../_models';

@Component({
  selector: 'sprova-project-testcases',
  templateUrl: './project-testcases.component.html',
  styleUrls: ['./project-testcases.component.scss']
})
export class ProjectTestcasesComponent implements OnInit {
  model: TestCase[];
  folders: TestCase[];
  items: TestCase[];
  folder: TestCase;
  loading = true;
  projectId: string;
  testCaseId: string;

  constructor(private route: ActivatedRoute,
    public projectService: ProjectService,
    public cycleService: CycleService,
    public testCaseService: TestCaseService,
    private navigatorService: NavigatorService) { }

  ngOnInit() {
    this.items = [];
    this.route
      .params
      .subscribe(params => {
        this.projectId = params.projectId;
        this.testCaseId = params.testCaseId;
        let filter = { projectId: this.projectId, parentId: params.testCaseId ? params.testCaseId : null, withParentFlag: true };

        if (this.projectId) {
          this.testCaseService.listModelsByFilter<TestCase[]>(filter, 0, 0).subscribe(data => {
            this.model = data;
            this.folders = data.filter(test => test.isParent);
            this.loading = false;
            this.items = this.items.concat(this.folders);
            this.items = this.items.concat(this.model);

          });
        }

        if (this.testCaseId) {
          this.testCaseService.getModel<TestCase>(this.testCaseId).subscribe(data => this.folder = data);
        }
      });
  }

  toParent() {
    if (this.folder && this.folder.parentId) {
      this.navigatorService.openTestCaseChildren(this.projectId, this.folder.parentId);
    } else {
      this.navigatorService.showTestCases(this.projectId);
    }
  }

  open(testCase) {
    if (testCase.isParent) {
      this.navigatorService.openTestCaseChildren(this.projectId, testCase._id);
    } else {
      this.navigatorService.openTestCase(this.projectId, testCase._id);
    }
  }
}
