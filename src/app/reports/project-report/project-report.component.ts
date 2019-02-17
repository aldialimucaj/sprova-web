import { Component, OnInit } from '@angular/core';
import { ProjectReport } from 'app/_models';
import { ReportsService, NavigatorService } from 'app/_services';
import { ActivatedRoute } from '@angular/router';
import { Chart } from 'chart.js';

import { map, delay } from 'rxjs/operators';
import { Observable, Scheduler } from 'rxjs';

@Component({
  selector: 'sprova-project-report',
  templateUrl: './project-report.component.html',
  styleUrls: ['./project-report.component.scss']
})
export class ProjectReportComponent implements OnInit {
  model: ProjectReport;
  projectId: string;
  loading = true;

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
        this.projectId = params.projectId;
        if (this.projectId) {
          let dataSource = this.reportsService.fetchProjectReport(this.projectId);
          dataSource.pipe(map(report => {
            this.loading = false;
            this.model = report;
          }), delay(500)).subscribe(() => {
            const ctx = document.getElementById("testcases-chart");
            let data = this.reportsService.testCasesToChartData(this.model.testCases);
            this.createTestCaseLineChart(ctx, data);
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

}
