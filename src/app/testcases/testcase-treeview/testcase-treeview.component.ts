import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { TestCase, Cycle, TreeNode } from '../../_models';
import { TestCaseService, TreeUtilsService } from '../../_services';
import { ActivatedRoute } from '@angular/router';
@Component({
    selector: 'sprova-testcase-treeview',
    templateUrl: './testcase-treeview.component.html',
    styleUrls: ['./testcase-treeview.component.scss']
})
export class TestcaseTreeviewComponent implements OnInit {
    @Input() treeElements: TreeNode[];
    @Input() selectionList: TestCase[];
    selected: boolean = false;

    constructor(private route: ActivatedRoute,
        public testCaseService: TestCaseService,
        public treeUtilsService: TreeUtilsService
    ) { }

    ngOnInit() {
    }

}
