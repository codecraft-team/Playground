import { Component, OnInit } from "@angular/core";
import { TreeNode } from "./treeNode";

@Component({
  moduleId: module.id,
  selector: "my-app",
  template: `
  <div>Selected node: {{selectedNode?.name}}</div>
  <br/>
  <button (click)='scroll("1.19")'>scroll to 1.19</button>
  <div style="overflow-y: scroll; height: 300px;">
    <treenode [nodes]="nodes" (selected)="select($event)"></treenode>
  </div>
  `
})
export class AppComponent implements OnInit {
  nodes: TreeNode[];
  selectedNode: TreeNode;

  ngOnInit(): void {
    let node1 = new TreeNode("1");
    for (var index = 0; index < 20; index++) {
      node1.nodes.push(new TreeNode(`1.${index}`));
    }

    let node21 = new TreeNode("2.1");
    for (var index = 0; index < 20; index++) {
      node21.nodes.push(new TreeNode(`2.1.${index}`));
    }

    let node2 = new TreeNode("2");
    node2.nodes.push(node21);
    node2.nodes.push(new TreeNode("2.2"));
    node2.nodes.push(new TreeNode("2.3"));

    this.nodes = [];
    this.nodes.push(node1);
    this.nodes.push(node2);
    this.nodes.push(new TreeNode("3"));
  }

  select(node: TreeNode) {
    this.selectedNode = node;
  }

  scroll(id: string) {
    let treenode = document.getElementById(id);
    if (treenode != undefined) {
      treenode.scrollIntoView(true);
    }
  }
};