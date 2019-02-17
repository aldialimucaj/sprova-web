import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient, HttpParams } from '@angular/common/http';
import { QueryableImpl } from './queryable-implementation';
import { API, COMPONENTS } from '../../environments/environment';
import { Queryable, InsertResponse, RemoveResponse, Cycle, TestCase } from 'app/_models';

@Injectable()
export class CycleService extends QueryableImpl {

  constructor(public http: HttpClient) {
    super(API.CYCLES, http)
  }

  /* ************************************************************************* */
  fetchAll(limit?: number, skip?: number) {
    return super.listModels<Cycle[]>(limit, skip);
  }

  /* ************************************************************************* */
  fetchOne(id: string) {
    return super.getModel<Cycle>(id);
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

  getTestCasesWithStats(cycleId: string, limit?: number, skip?: number, sort?: any) {

    return super.getSubModel<TestCase[]>(cycleId, COMPONENTS.TESTCASESSTATS, limit, skip, sort);
  }

  getTestCases(cycleId: string, limit?: number, skip?: number, sort?: any) {

    return super.getSubModel<TestCase[]>(cycleId, COMPONENTS.TESTCASES, limit, skip, sort);
  }

}
