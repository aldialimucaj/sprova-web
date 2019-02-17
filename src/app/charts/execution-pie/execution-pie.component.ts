import { Component, OnInit, Input, AfterViewInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { ExecutionService, TestCaseService } from '../../_services';

@Component({
  selector: 'sprova-execution-pie',
  templateUrl: './execution-pie.component.html',
  styleUrls: ['./execution-pie.component.scss']
})
export class ExecutionPieComponent implements OnInit, AfterViewInit {
  @ViewChild('pieChart') private chartRef;

  @Input() testCaseId: string;
  @Input() cycleId: string;
  @Input() loading: boolean;
  @Input() executions: any;

  _executions: any;

  public chart: Chart;
  constructor(
    private executionService: ExecutionService,
    public testCaseService: TestCaseService
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    const ctx = this.chartRef.nativeElement;
    if (!this.executions && this.testCaseId && this.cycleId) {
      this.executionService.listModelsByFilter({ testCaseId: this.testCaseId, cycleId: this.cycleId }, 0, 0).subscribe(data => {
        this._executions = data;
        this.loading = false;
        this.createChart(ctx, this._executions);
      });
    } else if (this.executions) {
      this.loading = false;
      this.createChart(ctx, this.executions);
    }
  }

  createChart(ctx, data) {
    if (data && data.length != 0) {

      let dataSets = data
        .map(f => {
          let result = { 'SUCCESSFUL': 0, 'PENDING': 0, 'FAILED': 0 }
          result[f.status] = 1;

          return result
        })
        .reduce((r, l) => {
          let result = {
            'SUCCESSFUL': r.SUCCESSFUL + l.SUCCESSFUL,
            'PENDING': r.PENDING + l.PENDING,
            'FAILED': r.FAILED + l.FAILED
          };
          return result;
        });

      this.chart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Success', 'Pending', 'Failed'],
          datasets: [{
            label: 'share of execution results',
            data: [dataSets.SUCCESSFUL, dataSets.PENDING, dataSets.FAILED],
            backgroundColor: [
              'rgba(49, 135, 0, 1)',
              'rgba(255, 220, 11, 1)',
              'rgba(230, 39, 0, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: false
        }
      });
    }
  }

}
