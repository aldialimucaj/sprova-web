import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { saveAs } from 'file-saver';

import { HttpClient, HttpParams } from '@angular/common/http';
import { QueryableImpl } from './queryable-implementation';
import { API, COMPONENTS } from '../../environments/environment';
import { Queryable, InsertResponse, RemoveResponse, Artifact, TestCase } from 'app/_models';

@Injectable()
export class ArtifactService extends QueryableImpl {

  constructor(public http: HttpClient) {
    super(API.ARTIFACTS, http)
  }

  /* ************************************************************************* */
  fetchAll(limit?: number, skip?: number) {
    return super.listModels<Artifact[]>(limit, skip);
  }

  /* ************************************************************************* */
  fetchOne(id: string) {
    return super.getModel<Artifact>(id);
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

  downloadArtifact(id: string) {
    super.getModelWithQuery(id, { download: true }, {responseType: 'blob', observe: 'response'}).subscribe(data => {
      console.log(data);
      this.saveToFileSystem(data);
    });
  }

  private saveToFileSystem(response) {
    const contentDispositionHeader: string = response.headers.get('Content-Disposition');
    const parts: string[] = contentDispositionHeader.split(';');
    const filename = parts[1].split('=')[1];

    saveAs(response.body, filename.replace(/'/g,''));
  }

  /**
   * Upload artefacts to this execution's step
   * 
   * @param id execution id
   * @param stepIdx step id
   * @param fileList list of files to upload
   */
  pushWithAttachment(value: object, file) {
    let formData: FormData = new FormData();
    formData.append('file', file, file.name);
    formData.set('value', JSON.stringify(value));

    return super.insertModel<any>(formData);
  }

}
