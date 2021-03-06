import { Injectable } from '@angular/core';
import { Observable, empty, of } from 'rxjs';

import { Queryable } from '../../_models';

@Injectable()
export class MockQueryableService implements Queryable {

  public _testData: any;


  /* ************************************************************************* */
  public listModels(limit: number, skip: number) {
    return new Observable(observer => {
      observer.next(this._testData);
      observer.complete();
    });
  }

  public listModelsByFilter<T>(values: any, limit: number, skip: number) {
    return this.listModels(limit, skip);
  }
  
  public fetchAll(limit: number, skip: number) {
    return this.listModels(limit, skip);
  }

  /* ************************************************************************* */
  public insertModel(model: any) {
    return of(this._testData);
  }

  public push(model: any) {
    return this.insertModel(model);
  }

  /* ************************************************************************* */
  public updateModel(id: string, model: any) {
    return this.listModels(0,0);
  }

  /* ************************************************************************* */
  public getModel(id: string) {
    return this.listModels(0,0);
  }

  public fetchOne(id: string) {
    return empty();
  }

  /* ************************************************************************* */
  public removeModel(id: string) {
    return this.listModels(0,0);
  }
}