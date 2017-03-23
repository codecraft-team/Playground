import { Component, Input, Output, EventEmitter } from "@angular/core";
import { TreeNode } from "./treeNode";

@Component({
  moduleId: module.id,
  selector: "treenode",
  styleUrls: ["treenode.css"],
  templateUrl: "treenode.html"
})
export  class TreeNodeComponent {
  @Input() nodes: TreeNode[];
  @Output() selected = new EventEmitter<TreeNode>();

  select(node) {
    this.selected.next(node);
  }
};