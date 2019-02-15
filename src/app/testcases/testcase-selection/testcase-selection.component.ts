import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { TestCase, Cycle, TreeNode } from '../../_models';
import { TestCaseService, TreeUtilsService, CycleService } from '../../_services';
import { ActivatedRoute } from '@angular/router';
import { findIndex, filter, without } from 'lodash';
import { ClrDatagridComparatorInterface, ClrDatagrid } from "@clr/angular";
import { TestCaseFilter } from "./testcase.filter";
import { SelectionType } from '@clr/angular/data/datagrid/providers/selection';


@Component({
  selector: 'sprova-testcase-selection',
  templateUrl: './testcase-selection.component.html',
  styleUrls: ['./testcase-selection.component.scss']
})
export class TestcaseSelectionComponent implements OnInit {
  @Input() model: TestCase[];
  @Input() treeModel: TestCase[];
  @Input() loading = true;
  @Input() viewType: SelectionViewType = SelectionViewType.Grid;
  @Input() selected: TestCase[];
  @Output() selectedChange: EventEmitter<TestCase[]> = new EventEmitter<TestCase[]>();
  @Input() selectedTreeNode: TreeNode;

  @ViewChild('dgrid') datagrid: ClrDatagrid;

  id: string;
  cycleId: string;
  projectId: string;
  treeElements: any[];
  testCases: any[];
  treeLoading = true;
  filter: TestCaseFilter;

  selected_: TestCase[] = [];
  folderJump = false;

  constructor(private route: ActivatedRoute,
    public testCaseService: TestCaseService,
    public treeUtilsService: TreeUtilsService,
    private cycleService: CycleService) {
  }

  ngOnInit() {
    this.route
      .params
      .subscribe(params => {
        this.projectId = params.projectId;
        if (params.cycleId) {
          this.cycleId = params.cycleId;
        }
      });
    if (this.model) {
      if (!this.treeModel) {
        this.treeElements = this.treeUtilsService.flatToTree(this.model, [], undefined);
      } else {
        this.treeElements = this.treeModel;
      }
      this.treeLoading = false;
      this.model = this.model.filter(m => m.executable);
    }
  }
  selectionChanged(event) {
    if (!this.folderJump) {
      this.selected_ = Object.assign([], event);
      this.selectedChange.emit(Object.assign([], event));
    } else {
      this.folderJump = false;
      this.datagrid.selection.current = this.selected_;
    }
  }

  updateModel(treeNode: TreeNode) {
    this.selectedTreeNode = treeNode;
    this.folderJump = true;
    if (!this.filter) {
      this.filter = new TestCaseFilter(this.selectedTreeNode)
      this.datagrid.items['_filters'].add(this.filter);
    } else {
      this.filter.update(this.selectedTreeNode);
    }
  }
  resetModel(testCases: TestCase[]) {
    this.folderJump = true;
    if (this.filter) {
      this.filter.reset();
    }
  }

  selectAllTests() {
    this.datagrid.items.all.forEach(i => this.datagrid.selection.setSelected(i, true));
  }

  selectNoneTests() {
    this.datagrid.items.all.forEach(i => this.datagrid.selection.setSelected(i, false));
  }
}

export enum SelectionViewType {
  Grid = 1,
  TreeView
}
