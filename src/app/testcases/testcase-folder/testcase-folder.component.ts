import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService, CycleService, NavigatorService, TestCaseService, FolderService } from '../../_services';
import { TestCase } from '../../_models';

@Component({
  selector: 'sprova-testcase-folder',
  templateUrl: './testcase-folder.component.html',
  styleUrls: ['./testcase-folder.component.scss']
})
export class TestcaseFolderComponent implements OnInit {
  model: TestCase[];
  folders: TestCase[];
  items: TestCase[];
  selected: TestCase[];
  folder: TestCase;
  loading = true;
  projectId: string;
  testCaseId: string;

  constructor(public route: ActivatedRoute,
    public projectService: ProjectService,
    public cycleService: CycleService,
    public testCaseService: TestCaseService,
    public navigatorService: NavigatorService,
    public folderService: FolderService
  ) { }

  ngOnInit() {
    this.items = [];
    this.selected = null;
    this.route
      .params
      .subscribe(params => {
        this.projectId = params.projectId;
        this.testCaseId = params.testCaseId;

        if (this.projectId) {
          this.updateModel();
        }

        if (this.testCaseId) {
          this.testCaseService.getModel<TestCase>(this.testCaseId).subscribe(data => this.folder = data);
        }
      });
  }

  updateModel() {
    let filter = { projectId: this.projectId, parentId: this.testCaseId ? this.testCaseId : null, withParentFlag: true };

    this.testCaseService.listModelsByFilter<TestCase[]>(filter, 0, 0).subscribe(data => {
      this.model = data;
      this.folders = data.filter(test => test.isParent);
      this.loading = false;
      this.items = this.items.concat(this.folders);
      this.items = this.items.concat(this.model);
    });
  }

  selectionChanged(newSelection) {
    console.log(newSelection);
    this.folderService.updateSelection(newSelection);
  }

  paste() {
    let destination = this.folder ? this.folder._id : null;
    this.folderService.paste(destination).subscribe(data => {
      this.updateModel();
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
