import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';

import { PATHS, COMPONENTS, SUB_PATHS } from '../../environments/environment';

@Injectable()
export class NavigatorService {

  constructor(
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router
  ) { }


  showTestCases(projectId: string) {
    this.router.navigate([PATHS.PROJECTS, projectId, COMPONENTS.TESTCASES]);
  }

  openTestCase(projectId: string, id: string) {
    this.router.navigate([PATHS.PROJECTS, projectId, COMPONENTS.TESTCASES, id]);
  }

  openTestCaseChildren(projectId: string, testCaseId: string) {
    this.router.navigate([PATHS.PROJECTS, projectId, COMPONENTS.TESTCASES, testCaseId, COMPONENTS.CHILDREN]);
  }

  openProject(id: any) {
    this.router.navigate([PATHS.PROJECTS, id]);
  }

  showProjects() {
    this.router.navigate([PATHS.PROJECTS]);
  }

  showCycles(projectId: string) {
    this.router.navigate([PATHS.PROJECTS, projectId, COMPONENTS.CYCLES]);
  }

  showTestSets(projectId: string, cycleId: string) {
    this.router.navigate([PATHS.CYCLES]);
  }

  openCycle(projectId: string, cycleId: string) {
    this.router.navigate([PATHS.PROJECTS, projectId, COMPONENTS.CYCLES, cycleId]);
  }

  openTestSet(projectId: string, cycleId: string, testSetId) {
    this.router.navigate([PATHS.PROJECTS, projectId, COMPONENTS.CYCLES, cycleId, COMPONENTS.TEST_SETS, testSetId]);
  }


  openSuite(id: any) {
    this.router.navigate([PATHS.SUITES, id]);
  }

  showSuites() {
    this.router.navigate([PATHS.SUITES]);
  }

  openExecution(projectId: string, id: any) {
    this.router.navigate([PATHS.PROJECTS, projectId, COMPONENTS.EXECUTIONS, id]);
  }

  executeTestCase(projectId: string, cycleId: string, testCaseId: string) {
    this.router.navigate([PATHS.PROJECTS, projectId, COMPONENTS.CYCLES, cycleId, COMPONENTS.TESTCASES, testCaseId, SUB_PATHS.EXECUTE]);
  }

  reexecutionTestCase(projectId: string, cycleId: string, testCaseId: string, executionId: string) {
    this.router.navigate([PATHS.PROJECTS, projectId, COMPONENTS.CYCLES, cycleId, COMPONENTS.TESTCASES, testCaseId, COMPONENTS.EXECUTIONS, executionId, SUB_PATHS.EXECUTE]);
  }

  executeTestSet(projectId: string, cycleId: string, testSetId: string, testSetExecutionId: string, testCaseId?: string) {
    let value = [PATHS.PROJECTS, projectId, COMPONENTS.CYCLES, cycleId, COMPONENTS.TEST_SETS, testSetId, COMPONENTS.EXECUTION_SETS, testSetExecutionId, SUB_PATHS.EXECUTE];
    
    this.router.navigate(value);
  }

  showExecutions() {
    this.router.navigate([PATHS.EXECUTIONS]);
  }

  showUsers() {
    this.router.navigate([PATHS.USERS]);
  }
}
