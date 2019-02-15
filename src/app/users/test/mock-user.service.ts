import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Queryable } from "app/_models";

@Injectable()
export class MockUserService implements Queryable {

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