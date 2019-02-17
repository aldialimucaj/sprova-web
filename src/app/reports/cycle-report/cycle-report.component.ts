import { Component, OnInit } from '@angular/core';
import { ReportsService, NavigatorService } from '../../_services';
import { ActivatedRoute } from '@angular/router';
import { Chart } from 'chart.js';

import { map, delay } from 'rxjs/operators';
import { Observable, Scheduler } from 'rxjs';
import { CycleReport, Execution, TestCase, ExecutionStatus, User } from '../../_models';
import { exec } from 'child_process';
import { find } from 'lodash';


@Component({
  selector: 'sprova-cycle-report',
  templateUrl: './cycle-report.component.html',
  styleUrls: ['./cycle-report.component.scss']
})
export class CycleReportComponent implements OnInit {

  model: CycleReport;
  cycleId: string;
  loading = true;
  testCasesStatus: Execution[];

  constructor(
    private route: ActivatedRoute,
    private navigatorService: NavigatorService,
    public reportsService: ReportsService
  ) { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.route.params
      .subscribe(params => {
        this.cycleId = params.cycleId;
        if (this.cycleId) {
          let dataSource = this.reportsService.fetchCycleReport(this.cycleId);
          dataSource.pipe(map(report => {
            this.loading = false;
            this.model = report;
            this.testCasesStatus = this.matchExecutions(this.model.testCases, this.model.executions);
          }), delay(500)).subscribe(() => {
            const ctx = document.getElementById('testcases-chart');
            let data = this.reportsService.testCasesToChartData(this.model.testCases);
            // this.createTestCaseLineChart(ctx, data);
          });
        }
      });
  }

  createTestCaseLineChart(ctx, data) {
    var lineChart = new Chart(ctx, {
      type: 'line',
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Test over time'
            }
          }]
        }
      }
    });

    return lineChart;
  }

  /**
   * Match test cases with executions to create a list of all 
   * testcases with the latest execution status
   * 
   * @param testCases array
   * @param executions array
   */
  matchExecutions(testCases: TestCase[], executions: Execution[]) {
    let result = testCases.map(testCase => {
      let execution = find(executions, { 'testCaseId': testCase._id });
      if (execution) {
        return execution;
      } else {
        let emptyExec = new Execution(testCase._id, this.cycleId, null);
        emptyExec.title = testCase.title;
        emptyExec.status = ExecutionStatus.Pending;
        emptyExec.user = new User();
        return emptyExec;
      }
    });


    return result;
  }
}
