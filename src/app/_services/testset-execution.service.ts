import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient, HttpParams } from '@angular/common/http';
import { QueryableImpl } from './queryable-implementation';
import { API, COMPONENTS, SUB_PATHS } from '../../environments/environment';
import { Queryable, InsertResponse, RemoveResponse, TestSetExecution, Execution } from 'app/_models';

@Injectable()
export class TestSetExecutionService extends QueryableImpl {

  constructor(public http: HttpClient) {
    super(API.TEST_SET_EXECUTIONS, http)
  }

  /* ************************************************************************* */
  fetchAll(limit?: number, skip?: number) {
    return super.listModels<TestSetExecution[]>(limit, skip);
  }

  /* ************************************************************************* */
  fetchOne(id: string): Observable<TestSetExecution> {
    return super.getModel<TestSetExecution>(id);
  }

  /* ************************************************************************* */
  push(model: TestSetExecution) {
    return super.insertModel<InsertResponse>(model);
  }

  /* ************************************************************************* */
  update(model: TestSetExecution) {
    return super.updateModel<InsertResponse>(model);
  }

  /* ************************************************************************* */
  remove(id: string) {
    return super.removeModel<RemoveResponse>(id);
  }

  /* ************************************************************************* */
  /*                    CUSTOM                                                 */
  /* ************************************************************************* */

  /**
   * Fetch next test to be executed for this execution set.
   * 
   * @param testSetExecutionId Test Set Execution ID
   */
  public fetchNextPending(testSetExecutionId: string) {
    return this.getSubModel<Execution>(testSetExecutionId, SUB_PATHS.NEXT_PENDING);
  }

  /**
   * Has next test to be executed for this execution set.
   * 
   * @param testSetExecutionId Test Set Execution ID
   */
  public hasNextPending(testSetExecutionId: string) {
    return this.getSubModel<Execution>(testSetExecutionId, SUB_PATHS.HAS_PENDING);
  }
}
