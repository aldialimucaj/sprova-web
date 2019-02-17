import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient, HttpParams } from '@angular/common/http';
import { QueryableImpl } from './queryable-implementation';
import { API, COMPONENTS } from '../../environments/environment';
import { Queryable, InsertResponse, RemoveResponse, TestSet } from 'app/_models';

@Injectable()
export class TestSetService extends QueryableImpl {

  constructor(public http: HttpClient) {
    super(API.TEST_SETS, http)
  }

  /* ************************************************************************* */
  fetchAll(limit?: number, skip?: number) {
    return super.listModels<TestSet[]>(limit, skip);
  }

  /* ************************************************************************* */
  fetchOne(id: string) : Observable<TestSet> {
    return super.getModel<TestSet>(id);
  }

  /* ************************************************************************* */
  push(model: any) {
    return super.insertModel<InsertResponse>(model);
  }

  /* ************************************************************************* */
  update(model: any) {
    return super.updateModel<InsertResponse>(model);
  }

  /* ************************************************************************* */
  remove(id: string) {
    return super.removeModel<RemoveResponse>(id);
  }

  /* ************************************************************************* */
  /*                    CUSTOM                                                 */
  /* ************************************************************************* */

  fetchTestCases<T>(id: string) {
    return super.getSubModel<T>(id, COMPONENTS.TESTCASES);
  }
}
