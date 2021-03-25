import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { of } from 'rxjs';
import { ViewModeEnum } from 'src/app/shared/enums/enums';
import { CategoryService } from '../../../shared/category.service';
import { TreeData } from '../../../shared/interfaces';
import { AddEditCategoryDialogComponent } from '../add-edit-category-dialog/add-edit-category-dialog.component';

@Component({
  selector: 'app-categories-manager',
  templateUrl: './categories-manager.component.html',
  styleUrls: ['./categories-manager.component.scss']
})
export class CategoriesManagerComponent implements OnInit {

  nestedTreeControl: NestedTreeControl<TreeData>;
  nestedDataSource: MatTreeNestedDataSource<TreeData>;
  flatData: TreeData[];
  isTop: boolean;
  ViewModeEnum = ViewModeEnum;

  constructor(
    private categoryService: CategoryService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.nestedTreeControl = new NestedTreeControl<TreeData>(this._getChildren);
    this.nestedDataSource = new MatTreeNestedDataSource();
    this.refreshTreeData();
  }

  private treeConstruct(treeData) {
    let constructedTree = [];
    for (let i of treeData) {
      let treeObj = i;
      let assigned = false;
      this.constructTree(constructedTree, treeObj, assigned)
    }
    return constructedTree;
  }

  private constructTree(constructedTree, treeObj, assigned): boolean {
    if (treeObj.parentId == null) {
      treeObj.children = [];
      constructedTree.push(treeObj);
      return true;
    } else if (treeObj.parentId == constructedTree.id) {
      treeObj.children = [];
      constructedTree.children.push(treeObj);
      return true;
    }
    else {
      if (constructedTree.children != undefined) {
        for (let index = 0; index < constructedTree.children.length; index++) {
          let constructedObj = constructedTree.children[index];
          if (assigned == false) {
            assigned = this.constructTree(constructedObj, treeObj, assigned);
          }
        }
      } else {
        for (let index = 0; index < constructedTree.length; index++) {
          let constructedObj = constructedTree[index];
          if (assigned == false) {
            assigned = this.constructTree(constructedObj, treeObj, assigned);
          }
        }
      }
      return false;
    }
  }

  private _getChildren = (node: TreeData) => of(node.children);
  hasNestedChild = (_: number, nodeData: TreeData) => nodeData.children.length > 0;

  deleteNode(nodeToBeDeleted: TreeData) {
    this.categoryService.removeCategoryById(nodeToBeDeleted.fbId).subscribe(() => {
      this.refreshTreeData();
    })
  }

  refreshTreeData() {
    this.categoryService.getAllCategories().subscribe(data => {
      if (data) {
        this.flatData = data;
        this.nestedDataSource.data = this.treeConstruct(data);
      }
    });
  }

  openDialog(isTop: boolean, viewMode: ViewModeEnum, node?: TreeData): void {
    let dialogData;
    if (viewMode === ViewModeEnum.CreateMode) {
      dialogData = {
        categoryName: '',
        currentCategory: node,
        nodesQuantity: this.flatData.length,
        isTop: isTop,
        viewMode: viewMode
      }
    } else {
      dialogData = {
        categoryName: node.categoryName,
        currentCategory: node,
        nodesQuantity: this.flatData.length,
        isTop: isTop,
        viewMode: viewMode
      }
    }

    const dialogRef = this.dialog.open(AddEditCategoryDialogComponent, {
      width: '300px',
      data: dialogData,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.refreshTreeData();
      }
    });
  }

}
