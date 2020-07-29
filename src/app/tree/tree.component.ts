import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Node} from '../interfaces/node';
import {SelectionModel} from '@angular/cdk/collections';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import {SelectedService} from '../services/selected.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeComponent implements OnInit {

  treeControl: NestedTreeControl<Node>

  checklistSelection: SelectionModel<Node>

  dataSource: MatTreeNestedDataSource<Node> = new MatTreeNestedDataSource<Node>()

  constructor(private selectedService: SelectedService) {
    this.treeControl = new NestedTreeControl<Node>((node: Node) => node.children)
    this.checklistSelection = new SelectionModel<Node>(true, [], false)
  }

  @Input()
  set nodes(value: Node[]) {
    this.dataSource.data = value
    this.treeControl.dataNodes = value
  }

  ngOnInit() {
    this.selectedService.getSelected()
      .pipe(first())
      .subscribe((selected: Node[]) => {
        const ids = selected.map((item: Node) => item.id)
        for (let node of this.treeControl.dataNodes) {
          let selected = this.treeControl.getDescendants(node)
            .concat([node])
            .filter((item: Node) => ids.includes(item.id))
          this.checklistSelection.select(...selected)
        }
      })
  }

  hasChild(_: number, node: Node): boolean {
    return !!node.children && node.children.length > 0
  }

  descendantsAllSelected(node: Node): boolean {
    const descendants = this.treeControl.getDescendants(node)
    return descendants.every(child => {
      return this.checklistSelection.isSelected(child)
    })
  }

  descendantsPartiallySelected(node: Node): boolean {
    const descendants = this.treeControl.getDescendants(node)
    const result = descendants.some(child => this.checklistSelection.isSelected(child))
    return result && !this.descendantsAllSelected(node)
  }

  itemSelectionToggle(node: Node): void {
    this.checklistSelection.toggle(node)
    const descendants = this.treeControl.getDescendants(node)
    this.checklistSelection.isSelected(node)
      ? this.checklistSelection.select(...descendants)
      : this.checklistSelection.deselect(...descendants)
    descendants.every(child => this.checklistSelection.isSelected(child))
    this.checkAllParentsSelection(node)
    this.selectedService.changeSelected(this.checklistSelection.selected)
  }

  leafItemSelectionToggle(node: Node): void {
    this.checklistSelection.toggle(node)
    this.checkAllParentsSelection(node)
    this.selectedService.changeSelected(this.checklistSelection.selected)
  }

  checkAllParentsSelection(node: Node): void {
    let parent: Node | null = this.getParentNode(node)
    while (parent) {
      this.checkRootNodeSelection(parent)
      parent = this.getParentNode(parent)
    }
  }

  checkRootNodeSelection(node: Node): void {
    const descendants = this.treeControl.getDescendants(node)
    const descAllSelected = descendants.every(child => this.checklistSelection.isSelected(child))
    !descAllSelected ? this.checklistSelection.deselect(node) : this.checklistSelection.select(node)
  }

  getParentNode(node: Node, branches: Node[] = this.treeControl.dataNodes): Node | null {
    let parent = null, branch = null,
      withChildren = branches.filter((item: Node) => !!item.children && item.children.length > 0)
    while (branch = withChildren.shift()) {
      if (branch.children.some(child => child.id === node.id)) {
        parent = branch
        break
      }
      parent = this.getParentNode(node, branch.children)
      if (parent) break
    }
    return parent
  }
}
