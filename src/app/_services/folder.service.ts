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
    this.toCopy = Object.assign([], this._selected);
  }

  /**
   * Paste items from clipboard to destination 
   * @param testCaseId destination id
   */
  public paste(testCaseId: string) {
    const copyValues = this.toCopy.map(c => {
      c.parentId = testCaseId;
      return c;
    })
    return this.testCaseService.push(copyValues);
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
