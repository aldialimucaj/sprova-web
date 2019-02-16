import { Injectable } from '@angular/core';
import { Observable, empty } from 'rxjs';

import { Queryable } from "../_models";

@Injectable()
export class GeneralMockService implements Queryable {

  public _testData: any;


  public listModelsByFilter<T>(values: any, limit: number, skip: number) {
    return empty();
  }

  /* ************************************************************************* */
  public listModels(limit: number, skip: number) {
    return new Observable(observer => {
      observer.next(this._testData);
      observer.complete();
    });
  }

  public fetchAll(limit: number, skip: number) {
    return this.listModels(limit, skip);
  }

  /* ************************************************************************* */
  public insertModel(model: any) {
    throw new Error("Method not implemented.");
  }

  /* ************************************************************************* */
  public updateModel(id: string, model: any) {
    throw new Error("Method not implemented.");
  }

  /* ************************************************************************* */
  public getModel(id: string) {
    throw new Error("Method not implemented.");
  }

  /* ************************************************************************* */
  public removeModel(id: string) {
    throw new Error("Method not implemented.");
  }
}