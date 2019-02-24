import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { QueryableImpl } from './queryable-implementation';
import { API } from '../../environments/environment';
import { InsertResponse, RemoveResponse, TestCase } from '../_models';

@Injectable()
export class TestCaseService extends QueryableImpl {

  constructor(public http: HttpClient) {
    super(API.TESTCASES, http)
  }

  /* ************************************************************************* */
  fetchAll(limit?: number, skip?: number) {
    return super.listModels<TestCase[]>(limit, skip);
  }

  /* ************************************************************************* */
  fetchOne(id: string) {
    return super.getModel<TestCase>(id);
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
  remove(id: any) {
    return super.removeModel<RemoveResponse>(id);
  }

  /* ************************************************************************* */
  /*                    CUSTOM                                                 */
  /* ************************************************************************* */

  fetchWithParent(id: string) {
    return super.getModelWithQuery<TestCase>(id, { withParentFlag: true });
  }
}
