import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient, HttpParams } from "@angular/common/http";
import { QueryableImpl } from "./queryable-implementation";
import { API, COMPONENTS } from '../../environments/environment';
import { Queryable, InsertResponse, RemoveResponse, Execution, TestStep, TestStepStatus } from '../_models';
import { forEach } from '@angular/router/src/utils/collection';

@Injectable()
export class ExecutionService extends QueryableImpl {

  constructor(public http: HttpClient) {
    super(API.EXECUTIONS, http)
  }

  /* ************************************************************************* */
  fetchAll(limit?: number, skip?: number) {
    return super.listModels<Execution[]>(limit, skip);
  }

  /* ************************************************************************* */
  fetchOne(id: string) {
    return super.getModel<Execution>(id);
  }

  /* ************************************************************************* */
  push(model: any, returnDocument = true) {
    return super.insertModel<InsertResponse>(model, returnDocument);
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

  /**
   * Update step update time and push to server.
   * @param id execution id
   * @param stepIdx Step index based on the order delievered by the test case
   * @param stepModel step model that should replace the old step
   */
  updateStep(id: string, stepIdx: string, stepModel: TestStep) {
    stepModel.updatedAt = new Date();
    const subPath = `/${id}/${COMPONENTS.STEPS}/${stepIdx}`;
    return super.updateSubModel<InsertResponse>(stepModel, subPath)
  }

  /**
   * Update step status to pass and update time.
   * @param id execution id
   * @param stepIdx Step index based on the order delievered by the test case
   * @param stepModel step model that should replace the old step
   */
  passStep(id: string, stepIdx: string, stepModel: TestStep) {
    stepModel.status = TestStepStatus.Successful;
    return this.updateStep(id, stepIdx, stepModel);
  }

  /**
   * Update step status to fail and update time.
   * @param id execution id
   * @param stepIdx Step index based on the order delievered by the test case
   * @param stepModel step model that should replace the old step
   */
  failStep(id: string, stepIdx: string, stepModel: TestStep) {
    stepModel.status = TestStepStatus.Failed;
    return this.updateStep(id, stepIdx, stepModel);
  }


  /**
   * Upload artefacts to this execution's step
   * 
   * @param id execution id
   * @param stepIdx step id
   * @param fileList list of files to upload
   */
  uploadFiles(id: string, stepIdx: string, fileList) {
    if (fileList.length > 0) {
      let formData: FormData = new FormData();
      for (let file of fileList) {
        formData.append(file.name, file, file.name);
      }
      const subPath = `/${id}/${COMPONENTS.STEPS}/${stepIdx}/artifacts`;
      return super.updateSubModel(formData, subPath);
    }
  }

  reExecute(id: string) {
    const subPath = `/${id}`;
    return super.updateSubModel({}, subPath);
  }
}
