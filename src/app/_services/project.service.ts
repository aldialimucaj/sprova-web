import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { QueryableImpl } from './queryable-implementation';
import { API } from '../../environments/environment';
import { InsertResponse, RemoveResponse, Project } from '../_models';

@Injectable()
export class ProjectService extends QueryableImpl {

  constructor(public http: HttpClient) {
    super(API.PROJECTS, http)
  }

  /* ************************************************************************* */
  fetchAll(limit?: number, skip?: number) {
    return super.listModels<Project[]>(limit, skip);
  }

  /* ************************************************************************* */
  fetchOne(id: string) {
    return super.getModel<Project>(id);
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
}
