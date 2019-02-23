import { Injectable } from '@angular/core';
import { TestCase } from '../_models';
import { TestCaseService } from './testcase.service';

@Injectable({
  providedIn: 'root'
})
export class FolderService {
  private _selected: TestCase[];
  private toCopy: TestCase[];
  private toCut: TestCase[];

  constructor(
    private testCaseService: TestCaseService
  ) { }

  /**
   * Copy currently selected items to clipboard
   */
  public copy() {
    // cannot paste cut and copy at the same time
    delete this.toCut;
    this.toCopy = Object.assign([], this._selected);
  }

  /**
   * Cut currently selected items to clipboard
   */
  public cut() {
    // cannot paste cut and copy at the same time
    delete this.toCopy;
    this.toCut = Object.assign([], this._selected);
  }

  /**
   * Paste items from clipboard to destination 
   * @param testCaseId destination id
   */

  public paste(testCaseId: string) {
    if (this.toCopy && this.toCopy.length > 0) {
      return this.pasteCopy(testCaseId);
    } else if (this.toCut && this.toCut.length > 0) {
      return this.pasteCut(testCaseId);
    } else {
      throw new Error('Nothing to paste');
    }
  }

  private pasteCut(testCaseId: string) {
    const cutValues = this.toCut.map(c => {
      c.parentId = testCaseId;
      return Object.assign({ _id: c._id, parentId: testCaseId }, c);
    });
    delete this.toCut;
    return this.testCaseService.updateModel(cutValues);
  }

  private pasteCopy(testCaseId: string) {
    const copyValues = this.toCopy.map(c => {
      c.parentId = testCaseId;
      return Object.assign({}, c);
    });
    delete this.toCopy;
    return this.testCaseService.push(copyValues);
  }

  /**
   * Delete elements in selection
   */
  public delete() {
    // this.testCaseService.remove(this._selected);
  }

  get canCopy() {
    return this._selected && this._selected.length > 0;
  }

  get canCut() {
    return this.canCopy;
  }

  get canPaste() {
    let hasCopy = this.toCopy && this.toCopy.length > 0;
    let hasCut = this.toCut && this.toCut.length > 0;

    return hasCopy || hasCut;
  }

  get catDelete() {
    return this.canCopy;
  }

  public updateSelection(testCases: TestCase[]) {
    this._selected = testCases;
  }
}
