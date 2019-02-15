import { ClrDatagridFilterInterface } from "@clr/angular";
import { Subject } from 'rxjs';
import { TreeNode, TestCase } from "../../_models";

export class TestCaseFilter implements ClrDatagridFilterInterface<TestCase> {

  active = true;

  constructor(public treeNode: TreeNode) {

  }
  /**
   * update
   */
  public update(treeNode: TreeNode) {
    this.active = true;
    this.treeNode = treeNode;
    this.changes.next(true);
  }

  /**
   * reset
   */
  public reset() {
    this.active = false;
    this.treeNode = null;
    this.changes.next(true);
  }

  changes = new Subject<any>();
  isActive(): boolean {
    return this.active;
  }
  accepts(testCase: TestCase) {
    return testCase.parentId == this.treeNode._id;
  }
}