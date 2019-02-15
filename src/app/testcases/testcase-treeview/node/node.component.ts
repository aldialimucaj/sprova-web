import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TreeNode } from 'app/_models';

@Component({
  selector: 'sprova-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.scss']
})
export class NodeComponent implements OnInit {
  @Input() treeElements: TreeNode[];
  @Output() onModelUpdate = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  updateSelection(treeElement: TreeNode) {
    this.onModelUpdate.emit(treeElement);
  }

}
