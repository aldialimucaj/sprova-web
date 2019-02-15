import { Injectable } from '@angular/core';
import { filter, cloneDeep, includes } from "lodash";

import { TestCase, TreeNode } from 'app/_models';
@Injectable({
  providedIn: 'root'
})
export class TreeUtilsService {

  constructor() { }

  treeToFlat(tree: TreeNode[], selected: boolean) {
    let result = [];

    for (let item of tree) {
      if (item.selected === selected && item.executable) {
        result = result.concat(item)
      }

      if (Array.isArray(item.children)) {
        result = result.concat(this.treeToFlat(item.children, selected))
      }
    }

    return result;
  }

  /**
   * Build a Tree of test case representations as defined by parent child
   * relationships.
   * 
   * @param flatElementsArray array of test cases as comes in from the backend
   * @param parentId parent ID to map children for
   */
  flatToTree(flatElementsArray: any[], selectedItems: string[], parentId) {
    let result = [];
    let flat = cloneDeep(flatElementsArray);

    // get all my kids and map to node element
    result = filter(flat, (e) => {
      // if element has not parentId -> it's a root element
      if (!parentId) {
        return !e.parentId; // root if no parent
      } else {
        return e.parentId === parentId;
      }
    }).map(element => this.testCaseToTreeNode(element, includes(selectedItems, element._id)));
    // do the same for all potential child nodes
    for (let element of result) {
      element.children = this.flatToTree(flat, selectedItems, element._id);
    }

    return result;
  }

  /**
   * Transform to TreeView node type
   * @param testCase element
   */
  testCaseToTreeNode(testCase: TestCase, selected) {
    return {
      _id: testCase._id,
      title: testCase.title,
      description: testCase.description,
      expanded: false,
      selected: selected,
      executable: testCase.executable,
      children: null
    }
  }

  getDirectChildNodes(testCases: TestCase[], parentId) {
    return filter(testCases, { parentId: parentId });
  }
}
