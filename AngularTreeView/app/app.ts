import { Component, OnInit } from "@angular/core";
import { TreeNode } from "./treeNode";

@Component({
  moduleId: module.id,
  selector: "my-app",
  template: `
  <div>Selected node: {{selectedNode?.name}}</div>
  <br/>
  <treenode [nodes]="nodes" (selected)="select($event)"></treenode>`
})
export  class  AppComponent implements OnInit {
  nodes: TreeNode[];
  selectedNode: TreeNode;

  ngOnInit(): void {
    let node1 = new TreeNode("1");
    node1.nodes.push(new TreeNode("1.1"));
    node1.nodes.push(new TreeNode("1.2"));
    node1.nodes.push(new TreeNode("1.3"));

    let node21 = new TreeNode("2.1");
    node21.nodes.push(new TreeNode("2.1.1"));

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
};