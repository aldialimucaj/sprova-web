import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Queryable } from "../../_models";

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

  /* ************************************************************************* */
  public insertModel(model: any) {
    return this.listModels(0,0);
  }

  /* ************************************************************************* */
  public updateModel(id: string, model: any) {
    return this.listModels(0,0);
  }

  /* ************************************************************************* */
  public getModel(id: string) {
    return this.listModels(0,0);
  }

  /* ************************************************************************* */
  public removeModel(id: string) {
    return this.listModels(0,0);
  }
}