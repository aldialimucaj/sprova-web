import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { ProjectReport, CycleReport } from '../_models';
import { API, COMPONENTS } from '../../environments/environment';
import { sortBy } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(public http: HttpClient) {
  }

  public fetchProjectReport(projectId: string) {
    const projectApi = `${API.REPORTS}/${COMPONENTS.PROJECTS}/${projectId}`;
    return this.http.get<ProjectReport>(projectApi);
  }

  public fetchCycleReport(cycleId: string) {
    const cycleApi = `${API.REPORTS}/${COMPONENTS.CYCLES}/${cycleId}`;
    return this.http.get<CycleReport>(cycleApi);
  }

  public fetchTestSetReport(testSetId: string) {
    const testSetApi = `${API.REPORTS}/${COMPONENTS.TEST_SETS}/${testSetId}`;
    return this.http.get<ProjectReport>(testSetApi);
  }

  // 
  /* ************************************************************************* */
  /*                        Chart.js data converter                            */
  /* ************************************************************************* */
  /**
   * Convert test cases to chart.js data object
   */
  public testCasesToChartData(testCases) {
    let frequencies = this.getFrequencies(testCases);
    let cummulated = this.cumulateFrequencies(frequencies);
    let labels = Object.keys(cummulated);
    let values = Object.values(cummulated);
    let result = {
      labels,
      datasets: [{
        label: 'Test cases',
        backgroundColor: '#0079b8',
        borderColor: '#0079b8',
        data: values,
        fill: false
      }]
    };

    return result;
  }

  /**
   * Gets array of test cases and returns object of frequencies
   * sorted by createdAt field.
   * 
   * @param testCases test cases array
   */
  private getFrequencies(testCases) {
    let dateFrenquencies = {};

    let sortedTestCases = sortBy(testCases,['createdAt']);
    for (let testCase of sortedTestCases) {
      let date = new Date(testCase.createdAt);
      let label = `${date.getFullYear()} ${date.toLocaleString(window.navigator.language, {month: 'long'})}`;

      if (!dateFrenquencies[label]) {
        dateFrenquencies[label] = 1;
      } else {
        dateFrenquencies[label]++;
      }
    }

    return dateFrenquencies;
  }

  /**
   * Cumulate frequencies over time to build stacked line chart
   * 
   * @param frequencies object with labels and frequencies
   */
  private cumulateFrequencies(frequencies) {
    var _frequencies = Object.assign({}, frequencies);
    let labels = Object.keys(_frequencies);
    let currentSum = 0;
    for (const key of labels) {
      _frequencies[key] +=  currentSum;
      currentSum = _frequencies[key];
    }

    return _frequencies;
  }

}
