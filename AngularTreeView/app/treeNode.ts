export class TreeNode {
  name: string;
  nodes: TreeNode[];
  expanded: boolean;

  constructor(name: string) {
    this.name = name;
    this.nodes = [];
    this.expanded = false;
  }

  expand() {
    this.expanded = !this.expanded;
  }
}