import { Component, OnInit } from '@angular/core';
import { TestCaseService, NavigatorService } from "../_services";
import { TestCase } from '../_models';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'sprova-testcases',
  templateUrl: './testcases.component.html',
  styleUrls: ['./testcases.component.scss']
})
export class TestCasesComponent implements OnInit {
  model: TestCase[];
  folders: TestCase[];
  loading = true;
  id: string;

  constructor(
    public testcaseService: TestCaseService,
    public navigatorService: NavigatorService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route
      .params
      .subscribe(params => {
        if (params.testCaseId) {
          this.id = params.testCaseId;
          this.testcaseService.listModelsByFilter<TestCase[]>({ parentId: this.id }, 0, 0).subscribe(data => {
            this.model = data;
            this.loading = false;
          });
        } else {
          this.testcaseService.listModelsByFilter<TestCase[]>({ parentId: null }, 0, 0).subscribe(data => {
            this.model = data;
            this.loading = false;
          });
        }
      });
  }
}
