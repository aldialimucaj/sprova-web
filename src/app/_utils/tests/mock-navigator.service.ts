import { Injectable } from '@angular/core';

@Injectable()
export class MockNavigatorService {

  showTestCases(projectId: string) {
    
  }

  openTestCase(projectId: string, id: string) {
    
  }

  openTestCaseChildren(projectId: string, testCaseId: string) {
   
  }

  openProject(id: any) {
   
  }

  showProjects() {
   
  }

  showCycles(projectId: string) {
   
  }

  showTestSets(projectId: string, cycleId: string) {
    
  }

  openCycle(projectId: string, cycleId: string) {
    
  }

  openTestSet(projectId: string, cycleId: string, testSetId) {
    
  }


  openSuite(id: any) {
    
  }

  showSuites() {
    
  }

  openExecution(projectId: string, id: any) {
    
  }

  executionTestCase(projectId: string, testCaseId: string, cycleId: string) {
    
  }

  reexecutionTestCase(projectId: string, cycleId: string, testCaseId: string, executionId: string) {
    
  }

  executionTestCaseWithSet(projectId: string, cycleId: string, testSetId: string, testSetExecutionId: string, testCaseId?: string) {
    
  }

  showExecutions() {
    
  }

  showUsers() {
    
  }
}
