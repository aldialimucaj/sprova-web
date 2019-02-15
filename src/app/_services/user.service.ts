import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient, HttpParams } from "@angular/common/http";
import { Queryable, User, InsertResponse, RemoveResponse } from "app/_models";
import { API } from '../../environments/environment';
import { QueryableImpl } from 'app/_services/queryable-implementation';

@Injectable()
export class UserService extends QueryableImpl {

  constructor(public http: HttpClient) {
    super(API.USERS, http)
  }

  /* ************************************************************************* */
  fetchAll(limit?: number, skip?: number) {
    return super.listModels<User[]>(limit, skip);
  }

  /* ************************************************************************* */
  fetchOne(id: string) {
    return super.getModel<User>(id);
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
