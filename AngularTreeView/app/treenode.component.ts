import { Component, Input } from "@angular/core";
import { TreeNode } from "./treeNode";

@Component({
  moduleId: module.id,
  selector: "treenode",
  styleUrls: ["treenode.css"],
  templateUrl: "treenode.html"
})
export  class TreeNodeComponent {
  @Input() nodes: TreeNode[];
};